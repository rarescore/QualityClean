import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
  useRouterState,
} from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { MobileDock } from "@/components/site/mobile-dock";
import { JsonLd } from "@/components/site/json-ld";
import { SiteExperience } from "@/components/site/experience";
import appCss from "../styles.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Extreme Quality Clean" },
      { name: "theme-color", content: "#171834" },
      { name: "format-detection", content: "telephone=yes" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "sitemap", type: "application/xml", title: "Sitemap", href: "/sitemap.xml" },
      { rel: "icon", type: "image/png", href: "/logo.png", sizes: "48x48" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
    ],
  }),
  component: RootDocument,
});

function HeaderSpacer() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  if (path === "/" || path === "/airbnb") return null;
  return <div className="h-[4.25rem] md:h-[6.5rem]" />;
}

function RootDocument() {
  return (
    <html lang="en" suppressHydrationWarning className="antialiased">
      <head>
        <HeadContent />
      </head>
      <body className="bg-paper font-sans text-ink">
        <a href="#content" className="skip-link">
          Skip to content
        </a>
        <PreviewHostBridge />
        <AuthProvider>
          <JsonLd />
          <SiteExperience />
          <SiteHeader />
          <HeaderSpacer />
          <div id="content">
            <Outlet />
          </div>
          <SiteFooter />
          <MobileDock />
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  );
}
