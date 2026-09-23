import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { slugifyHeading } from "@/lib/articles";
import { webpSrcSet } from "@/lib/img";

function inline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const re = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) nodes.push(text.slice(last, m.index));
    const token = m[0];
    if (token.startsWith("**")) {
      nodes.push(
        <strong key={i++} className="font-semibold text-ink">
          {token.slice(2, -2)}
        </strong>,
      );
    } else {
      const hm = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (hm) {
        const href = hm[2];
        const label = hm[1];
        if (href.startsWith("/") && !href.startsWith("//")) {
          if (href.startsWith("/articles/") && href !== "/articles/") {
            const rest = href.slice("/articles/".length).replace(/\/$/, "");
            const [slug, hash] = rest.split("#");
            nodes.push(
              <Link
                key={i++}
                to="/articles/$slug"
                params={{ slug }}
                hash={hash}
                className="text-red underline underline-offset-4"
              >
                {label}
              </Link>,
            );
          } else {
            nodes.push(
              <a
                key={i++}
                href={href}
                className="text-red underline underline-offset-4"
              >
                {label}
              </a>,
            );
          }
        } else {
          nodes.push(
            <a
              key={i++}
              href={href}
              className="text-red underline underline-offset-4"
              {...(href.startsWith("http") || href.startsWith("tel:")
                ? href.startsWith("http")
                  ? { target: "_blank", rel: "noreferrer" }
                  : {}
                : {})}
            >
              {label}
            </a>,
          );
        }
      }
    }
    last = m.index + token.length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

function prettyUrl(url: string) {
  try {
    const u = new URL(url);
    return u.hostname.replace(/^www\./, "") + u.pathname.replace(/\/$/, "");
  } catch {
    return url;
  }
}

function isListish(block: string) {
  const t = block.trim();
  if (!t || t.includes("\n")) return false;
  if (
    t.startsWith("#") ||
    t.startsWith("- ") ||
    t.startsWith("![") ||
    t.startsWith("<!--") ||
    t.startsWith(">")
  ) {
    return false;
  }
  if (/^\d+\.\s/.test(t)) return false;
  if (t.startsWith("“") || t.startsWith('"') || t.startsWith("‘")) return false;
  if (t.length > 72) return false;
  if (t.split(/\s+/).length > 8) return false;
  if (
    /\b(is|are|was|were|can|could|should|would|will|may|might|also|because|however|therefore|although|that|this|your|you|we|they)\b/i.test(
      t,
    )
  ) {
    return false;
  }
  return true;
}

function listifyMarkdown(md: string) {
  const blocks = md.split(/\n\n/);
  const out: string[] = [];
  for (let i = 0; i < blocks.length; i++) {
    const raw = blocks[i];
    const t = raw.trim();
    if (
      t.endsWith(":") &&
      !t.startsWith("#") &&
      !t.startsWith("-") &&
      !t.startsWith("[")
    ) {
      const items: string[] = [];
      let j = i + 1;
      while (j < blocks.length && isListish(blocks[j])) {
        items.push(blocks[j].trim().replace(/\.$/, ""));
        j += 1;
      }
      if (items.length >= 3) {
        out.push(raw);
        out.push(items.map((x) => `- ${x}`).join("\n"));
        i = j - 1;
        continue;
      }
    }
    out.push(raw);
  }
  return out.join("\n\n");
}

const IMAGE_RE = /^!\[([^\]]*)\]\(([^)]+)\)$/;

export function ArticleBody({ markdown }: { markdown: string }) {
  const source = listifyMarkdown(
    markdown.replace(/^<!--[\s\S]*?-->\s*/, "").trim(),
  );
  const lines = source.split("\n");
  const blocks: ReactNode[] = [];
  let i = 0;
  let k = 0;

  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) {
      i += 1;
      continue;
    }
    const image = line.trim().match(IMAGE_RE);
    if (image) {
      const alt = image[1];
      const src = image[2];
      blocks.push(
        <figure key={k++} className="my-10 overflow-hidden rounded-xl">
          <img
            src={src.replace(/\.jpg$/, ".webp").replace(/\.webp$/, "-800.webp")}
            srcSet={webpSrcSet(src.replace(/\.jpg$/, ".webp"))}
            sizes="(max-width: 768px) 100vw, 42rem"
            alt={alt}
            className="aspect-[16/9] w-full bg-sand object-cover"
            loading="lazy"
            decoding="async"
            width={1600}
            height={900}
          />
          {alt ? (
            <figcaption className="mt-3 text-xs leading-relaxed text-muted">
              {alt}
            </figcaption>
          ) : null}
        </figure>,
      );
      i += 1;
      continue;
    }
    if (line.startsWith("## ")) {
      const title = line.slice(3).trim();
      if (title === "References") {
        const refs: string[] = [];
        i += 1;
        while (i < lines.length && lines[i].trim().startsWith("- ")) {
          refs.push(lines[i].replace(/^- /, "").trim());
          i += 1;
        }
        blocks.push(
          <aside key={k++} className="mt-16 border-t border-line pt-8">
            <p className="text-[0.6875rem] uppercase tracking-[0.2em] text-muted">
              Sources
            </p>
            <ul className="mt-3 space-y-1.5 text-sm">
              {refs.map((href) => (
                <li key={href}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-muted underline underline-offset-2 hover:text-red"
                  >
                    {prettyUrl(href)}
                  </a>
                </li>
              ))}
            </ul>
          </aside>,
        );
        continue;
      }
      blocks.push(
        <h2
          key={k++}
          id={slugifyHeading(title)}
          className="mt-16 scroll-mt-28 font-display text-3xl leading-tight md:text-4xl"
        >
          {title}
        </h2>,
      );
      i += 1;
      continue;
    }
    if (line.startsWith("### ")) {
      const title = line.slice(4).trim();
      blocks.push(
        <h3
          key={k++}
          id={slugifyHeading(title)}
          className="mt-10 scroll-mt-28 font-display text-2xl leading-snug"
        >
          {title}
        </h3>,
      );
      i += 1;
      continue;
    }
    if (/^\d+\.\s/.test(line) || line.startsWith("- ")) {
      const ordered = /^\d+\.\s/.test(line);
      const items: string[] = [];
      while (
        i < lines.length &&
        (ordered ? /^\d+\.\s/.test(lines[i]) : lines[i].startsWith("- "))
      ) {
        items.push(lines[i].replace(ordered ? /^\d+\.\s/ : /^- /, "").trim());
        i += 1;
      }
      const List = ordered ? "ol" : "ul";
      blocks.push(
        <List
          key={k++}
          className={
            ordered
              ? "mt-5 list-decimal space-y-2 pl-6 text-base leading-relaxed text-ink marker:font-medium marker:text-red"
              : "mt-5 list-disc space-y-2 pl-6 text-base leading-relaxed text-ink marker:text-red"
          }
        >
          {items.map((item, idx) => (
            <li key={idx}>{inline(item)}</li>
          ))}
        </List>,
      );
      continue;
    }
    const para: string[] = [line];
    i += 1;
    while (
      i < lines.length &&
      lines[i].trim() &&
      !lines[i].startsWith("#") &&
      !lines[i].startsWith("- ") &&
      !lines[i].startsWith("![") &&
      !/^\d+\.\s/.test(lines[i])
    ) {
      para.push(lines[i]);
      i += 1;
    }
    const text = para.join(" ");
    blocks.push(
      <p
        key={k++}
        className={
          text.length < 80
            ? "mt-2 text-base leading-[1.8] text-ink md:text-[1.0625rem]"
            : "mt-5 text-base leading-[1.8] text-ink md:text-[1.0625rem]"
        }
      >
        {inline(text)}
      </p>,
    );
  }

  return <div className="article-body">{blocks}</div>;
}
