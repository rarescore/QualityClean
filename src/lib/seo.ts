import { company } from "@/lib/company";

export function absUrl(path = "/") {
  if (path.startsWith("http")) return path;
  const p = path === "" ? "/" : path;
  return `${company.siteUrl}${p}`;
}

export function seoHead({
  title,
  description,
  path,
  image = "/og.jpg",
  type = "website",
  published,
  modified,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  published?: string;
  modified?: string;
}) {
  const url = absUrl(path);
  const img = absUrl(image);
  const meta: { title?: string; name?: string; property?: string; content?: string }[] = [
    { title },
    { name: "description", content: description },
    { name: "robots", content: "index, follow" },
    { name: "author", content: company.short },
    { property: "og:type", content: type },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:url", content: url },
    { property: "og:image", content: img },
    { property: "og:image:alt", content: title },
    { property: "og:site_name", content: company.short },
    { property: "og:locale", content: "en_US" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: img },
    { name: "twitter:image:alt", content: title },
  ];
  if (published) meta.push({ property: "article:published_time", content: published });
  if (modified) meta.push({ property: "article:modified_time", content: modified });
  return {
    meta,
    links: [{ rel: "canonical", href: url }],
  };
}
