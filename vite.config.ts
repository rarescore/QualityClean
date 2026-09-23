import { gzipSync } from "node:zlib";
import { readdirSync } from "node:fs";
import { join } from "node:path";
import type { Plugin } from "vite";
import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { nitro } from "nitro/vite";
// @ts-expect-error JS plugin alongside the TS vite config
import { grokPwaPlugin } from "./scripts/grok-pwa-plugin.mjs";
// @ts-expect-error JS plugin alongside the TS vite config
import { appEnvPlugin } from "./scripts/app-env-plugin.mjs";
import { isMigrationFile } from "./scripts/migration-plan.mjs";

/** The files `src/lib/db.ts` globs — same directory, same non-recursive scope. */
function hasGlobbedMigrations(root: string): boolean {
  try {
    return readdirSync(join(root, "migrations")).some(isMigrationFile);
  } catch {
    return false;
  }
}

/**
 * Finish PGLite bootstrap during dev-server setup (before traffic). Vite awaits
 * async `configureServer` hooks. Production: `src/lib/db` kicks `ensureDbReady`
 * on import.
 *
 * Vite awaiting the hook puts this on time-to-first-render, so an app with no
 * migrations — no schema to apply — skips it entirely rather than paying for a
 * PGLite instance it never queries.
 */
function pgliteBootstrapPlugin(): Plugin {
  return {
    name: "app-builder:pglite-bootstrap",
    apply: "serve",
    async configureServer(server) {
      if (!hasGlobbedMigrations(server.config.root)) return;
      try {
        const mod = (await server.ssrLoadModule("/src/lib/db.ts")) as {
          ensureDbReady?: () => Promise<void>;
        };
        if (typeof mod.ensureDbReady === "function") {
          await mod.ensureDbReady();
        }
      } catch (err) {
        console.error("[app-builder] DB bootstrap failed:", err);
        throw err;
      }
    },
  };
}

/**
 * Live-preview OAuth popup — handled HERE so the agent never has to create a
 * `/auth/popup` route (and cannot break it by scaffolding a React page that
 * paints the full app shell in the popup).
 *
 * `signIn` (client.ts) opens `/auth/popup?providerId=…` in a top-level window.
 * This middleware runs before TanStack Start, calls `handleAuthPopupRequest`,
 * and returns the 302 / completion HTML. Deployed apps do not use the popup
 * (full-page OAuth redirect), so `apply: "serve"` is enough.
 */
function authPopupPlugin(): Plugin {
  return {
    name: "app-builder:auth-popup",
    apply: "serve",
    configureServer(server) {
      // Register immediately (not in a returned post-hook) so we run BEFORE
      // TanStack Start / the SPA HTML fallback. A model-authored
      // `src/routes/auth/popup.tsx` React page must never win this path.
      server.middlewares.use(async (req, res, next) => {
        try {
          const rawUrl = req.url ?? "";
          const pathOnly = rawUrl.split("?", 1)[0] ?? "";
          if (pathOnly !== "/auth/popup") {
            next();
            return;
          }
          if ((req.method ?? "GET").toUpperCase() !== "GET") {
            res.statusCode = 405;
            res.setHeader("content-type", "text/plain; charset=utf-8");
            res.end("Method Not Allowed");
            return;
          }

          const host = String(
            req.headers["x-forwarded-host"] ?? req.headers.host ?? "localhost:8080",
          );
          const proto = String(
            req.headers["x-forwarded-proto"] ??
              ((req.socket as { encrypted?: boolean } | undefined)?.encrypted ? "https" : "http"),
          );
          const requestHeaders = new Headers();
          for (const [key, value] of Object.entries(req.headers)) {
            if (value === undefined) continue;
            if (Array.isArray(value)) {
              for (const v of value) requestHeaders.append(key, v);
            } else {
              requestHeaders.set(key, value);
            }
          }
          // Ensure Host is the public preview host so Better Auth's dynamic
          // baseURL / redirect_uri match the popup origin.
          if (!requestHeaders.has("host")) requestHeaders.set("host", host);

          const request = new Request(`${proto}://${host}${rawUrl}`, {
            method: "GET",
            headers: requestHeaders,
          });

          const mod = (await server.ssrLoadModule("/src/lib/auth/popup.server.ts")) as {
            handleAuthPopupRequest: (req: Request) => Promise<Response>;
          };
          const response = await mod.handleAuthPopupRequest(request);

          res.statusCode = response.status;
          // Preserve multiple Set-Cookie headers (OAuth state + session).
          const setCookies =
            typeof response.headers.getSetCookie === "function"
              ? response.headers.getSetCookie()
              : [];
          response.headers.forEach((value, key) => {
            if (key.toLowerCase() === "set-cookie") return;
            res.setHeader(key, value);
          });
          for (const cookie of setCookies) {
            res.appendHeader("set-cookie", cookie);
          }
          const body = Buffer.from(await response.arrayBuffer());
          res.end(body);
        } catch (err) {
          console.error("[app-builder] /auth/popup handler failed:", err);
          if (!res.headersSent) {
            res.statusCode = 500;
            res.setHeader("content-type", "text/plain; charset=utf-8");
            res.end("auth popup failed");
          }
        }
      });
    },
  };
}


function previewOptimizePlugin(): Plugin {
  return {
    name: "app-builder:preview-optimize",
    configurePreviewServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = (req.url ?? "").split("?", 1)[0] ?? "";
        if (
          url.startsWith("/assets/") ||
          url.startsWith("/fonts/") ||
          url.startsWith("/images/") ||
          url.startsWith("/videos/") ||
          url.startsWith("/logo") ||
          url === "/favicon.svg" ||
          url === "/og.webp" ||
          url === "/og.jpg"
        ) {
          res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
        }

        if (/\.(mp4|webm|webp|png|jpe?g|gif|woff2|ico|avif)$/i.test(url)) {
          next();
          return;
        }

        // Only compress static text assets. HTML is streamed by Nitro; wrapping
        // write/end deadlocks those responses. Vercel gzips HTML at the edge.
        if (!/\.(js|mjs|css|xml|txt|svg|json|webmanifest|map)$/i.test(url)) {
          next();
          return;
        }

        const accept = String(req.headers["accept-encoding"] ?? "");
        if (!/\bgzip\b/i.test(accept)) {
          next();
          return;
        }

        const chunks: Buffer[] = [];
        const originalWrite = res.write.bind(res);
        const originalEnd = res.end.bind(res);

        res.write = ((chunk: unknown, encoding?: unknown, cb?: unknown) => {
          if (chunk) {
            const enc = typeof encoding === "string" ? encoding : undefined;
            chunks.push(Buffer.from(chunk as string | Buffer, enc as BufferEncoding | undefined));
          }
          if (typeof encoding === "function") encoding();
          else if (typeof cb === "function") cb();
          return true;
        }) as typeof res.write;

        res.end = ((chunk?: unknown, encoding?: unknown, cb?: unknown) => {
          if (typeof chunk === "function") {
            cb = chunk;
            chunk = undefined;
            encoding = undefined;
          } else if (typeof encoding === "function") {
            cb = encoding;
            encoding = undefined;
          }
          if (chunk) {
            const enc = typeof encoding === "string" ? encoding : undefined;
            chunks.push(Buffer.from(chunk as string | Buffer, enc as BufferEncoding | undefined));
          }
          const body = chunks.length ? Buffer.concat(chunks) : Buffer.alloc(0);
          const callback = typeof cb === "function" ? cb : undefined;
          if (res.headersSent) {
            if (body.length) originalWrite(body);
            return originalEnd(callback);
          }
          const type = String(res.getHeader("content-type") || "");
          const already = res.getHeader("content-encoding");
          const compressible =
            !already &&
            body.length > 400 &&
            /html|json|javascript|ecmascript|css|xml|svg|text\/plain|manifest/i.test(type);
          if (compressible) {
            try {
              const gz = gzipSync(body, { level: 6 });
              res.setHeader("Content-Encoding", "gzip");
              res.setHeader("Content-Length", String(gz.length));
              const vary = res.getHeader("Vary");
              res.setHeader("Vary", vary ? `${vary}, Accept-Encoding` : "Accept-Encoding");
              return originalEnd(gz, callback);
            } catch {
              res.setHeader("Content-Length", String(body.length));
              return originalEnd(body, callback);
            }
          }
          if (body.length) res.setHeader("Content-Length", String(body.length));
          return originalEnd(body, callback);
        }) as typeof res.end;

        next();
      });
    },
  };
}

// `0.0.0.0:8080` is the live-preview contract — don't change host/port.
// The dev server starts once `src/router.tsx` and `src/routes/` exist — see
// AGENTS.md § "First scaffold".
export default defineConfig(({ command, isPreview }) => ({
  server: {
    host: "0.0.0.0",
    port: 8080,
    strictPort: true,
  },
  preview: {
    host: "127.0.0.1",
    port: 8081,
    strictPort: true,
  },
  resolve: { tsconfigPaths: true },
  build: {
    sourcemap: true,
    target: "es2022",
    cssMinify: "lightningcss",
    modulePreload: { polyfill: false },
  },
  esbuild: {
    legalComments: "none",
  },
  plugins: [
    pgliteBootstrapPlugin(),
    // Before tanstackStart so /auth/popup never falls through to the SPA.
    authPopupPlugin(),
    // Dev-only /__app-env, read by scripts/check-auth-invariant.mjs.
    appEnvPlugin(),
    // PWA head + ?install=1 tutorial page; runs before Start/Nitro.
    previewOptimizePlugin(),
    grokPwaPlugin(),
    tailwindcss(),
    tanstackStart(),
    ...(command === "build" || isPreview
      ? [
          nitro({
            preset: "vercel",
            // Auto-registers server/middleware/* (the PWA install page +
            // manifest + head-tag middleware). Nitro v3 defaults serverDir to
            // false, so removing this silently unwires /?install=1 on deploys.
            serverDir: "./server",
          }),
        ]
      : []),
    viteReact(),
  ],
}));
