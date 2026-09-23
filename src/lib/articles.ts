import checklist from "@/content/articles/los-angeles-house-cleaning-checklist.md?raw";
import deepVsRegular from "@/content/articles/deep-cleaning-vs-regular-cleaning-los-angeles.md?raw";
import moveOut from "@/content/articles/los-angeles-move-out-cleaning-checklist.md?raw";
import cost from "@/content/articles/house-cleaning-cost-los-angeles-2026.md?raw";
import dusty from "@/content/articles/why-is-my-los-angeles-home-so-dusty.md?raw";
import petCarpet from "@/content/articles/pet-stain-odor-carpet-cleaning-los-angeles.md?raw";
import hardWater from "@/content/articles/hard-water-stains-window-cleaning-los-angeles.md?raw";
import office from "@/content/articles/los-angeles-office-cleaning-checklist.md?raw";
import postCon from "@/content/articles/post-construction-cleaning-los-angeles-guide.md?raw";
import schedule from "@/content/articles/complete-home-cleaning-schedule.md?raw";
import { articleMeta, type ArticleMeta } from "@/lib/article-meta";

export type Article = ArticleMeta & { body: string };

const bodies: Record<string, string> = {
  "los-angeles-house-cleaning-checklist": checklist,
  "deep-cleaning-vs-regular-cleaning-los-angeles": deepVsRegular,
  "los-angeles-move-out-cleaning-checklist": moveOut,
  "house-cleaning-cost-los-angeles": cost,
  "why-is-my-house-so-dusty-los-angeles": dusty,
  "pet-stain-odor-carpet-cleaning-los-angeles": petCarpet,
  "hard-water-stains-windows-los-angeles": hardWater,
  "los-angeles-office-cleaning-checklist": office,
  "post-construction-cleaning-los-angeles-guide": postCon,
  "how-often-should-you-clean-your-house": schedule,
};

export const articles: Article[] = articleMeta.map((m) => ({
  ...m,
  body: bodies[m.slug] ?? "",
}));

export function getArticle(slug: string) {
  return articles.find((a) => a.slug === slug);
}

export {
  latestArticles,
  formatArticleDate,
  articleMeta,
} from "@/lib/article-meta";

export function readMinutes(body: string) {
  const words = body.trim().split(/\s+/).length;
  return Math.max(4, Math.round(words / 220));
}

export function extractFaqs(body: string) {
  const heading = /^## (?:Frequently Asked Questions|FAQ)[^\n]*\n+/m;
  const startMatch = body.match(heading);
  if (!startMatch || startMatch.index == null) return [];
  const start = startMatch.index + startMatch[0].length;
  const after = body.slice(start);
  const nextH2 = after.search(/^## /m);
  const block = (nextH2 >= 0 ? after.slice(0, nextH2) : after).trim();
  const items: { q: string; a: string }[] = [];
  const parts = block.split(/^### /m).filter(Boolean);
  for (const part of parts) {
    const nl = part.indexOf("\n");
    if (nl < 0) continue;
    const q = part.slice(0, nl).trim();
    const a = part
      .slice(nl)
      .trim()
      .replace(/\n+/g, " ");
    if (q && a) items.push({ q, a });
  }
  return items;
}

export function stripFaqSection(body: string) {
  const heading = /^## (?:Frequently Asked Questions|FAQ)[^\n]*\n+/m;
  const startMatch = body.match(heading);
  if (!startMatch || startMatch.index == null) return body;
  const start = startMatch.index;
  const after = body.slice(start + startMatch[0].length);
  const nextH2 = after.search(/^## /m);
  const end = nextH2 >= 0 ? start + startMatch[0].length + nextH2 : body.length;
  return (body.slice(0, start) + body.slice(end)).replace(/\n{3,}/g, "\n\n");
}

export function slugifyHeading(text: string) {
  return text
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function extractHeadings(body: string) {
  const source = stripFaqSection(body)
    .replace(/^<!--[\s\S]*?-->\s*/, "")
    .trim();
  const headings: { id: string; text: string }[] = [];
  for (const line of source.split("\n")) {
    if (!line.startsWith("## ") || line.startsWith("### ")) continue;
    const text = line.slice(3).trim();
    if (!text || text === "References") continue;
    headings.push({ id: slugifyHeading(text), text });
  }
  return headings;
}

export function extractImages(body: string) {
  const out: { src: string; alt: string }[] = [];
  const re = /!\[([^\]]*)\]\(([^)]+)\)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(body))) {
    out.push({ alt: m[1], src: m[2] });
  }
  return out;
}
