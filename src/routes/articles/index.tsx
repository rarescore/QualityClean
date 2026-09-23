import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Eyebrow } from "@/components/site/marks";
import { SmartImg } from "@/components/site/smart-img";
import { articleMeta, formatArticleDate, latestArticles } from "@/lib/article-meta";
import { company } from "@/lib/company";
import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/articles/")({
  component: ArticlesIndex,
  head: () => {
    const featured = latestArticles()[0];
    const base = seoHead({
      title: "Cleaning Guides for Los Angeles Homes | Extreme Quality Clean",
      description:
        "House cleaning checklists, deep vs regular, move-out, pet carpet, hard-water windows, and office cleaning — written for Los Angeles homes.",
      path: "/articles",
      image: featured?.image ?? "/images/articles/house-cleaning-checklist.webp",
    });
    return {
      meta: base.meta,
      links: [
        ...base.links,
        ...(featured
          ? [
              {
                rel: "preload",
                href: featured.image.replace(/\.webp$/, "-800.webp"),
                as: "image",
                type: "image/webp",
              },
            ]
          : []),
      ],
    };
  },
});

function ArticlesIndex() {
  const ordered = latestArticles();
  const [featured, ...rest] = ordered;

  const collection = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Cleaning Guides for Los Angeles Homes",
    url: `${company.siteUrl}/articles`,
    isPartOf: { "@id": `${company.siteUrl}#website` },
    inLanguage: "en-US",
    hasPart: articleMeta.map((a) => ({
      "@type": "Article",
      headline: a.title,
      url: `${company.siteUrl}/articles/${a.slug}`,
      datePublished: a.date,
      image: `${company.siteUrl}${a.image}`,
    })),
  };

  return (
    <main className="pb-16 md:pb-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collection) }}
      />
      <section className="border-b border-line bg-cream py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Eyebrow>Guides</Eyebrow>
          <h1 className="display-section max-w-3xl">
            How Los Angeles homes actually get clean.
          </h1>
          <p className="mt-5 max-w-xl text-muted">
            Checklists, schedules, and the problems that keep coming back —
            dust, hard water, pet odor, move-out deposits. Written from 25
            years on the job, not a content farm.
          </p>
        </div>
      </section>

      <section className="bg-paper py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          {featured ? (
            <article className="group mb-16 grid gap-8 md:grid-cols-2 md:items-center">
              <Link
                to="/articles/$slug"
                params={{ slug: featured.slug }}
                className="block overflow-hidden rounded-xl"
              >
                <SmartImg
                  src={featured.image}
                  alt={featured.alt}
                  className="aspect-[16/10] w-full transition-transform duration-700 group-hover:scale-[1.03]"
                  width={1200}
                  height={750}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </Link>
              <div>
                <p className="text-[0.6875rem] uppercase tracking-[0.18em] text-red">
                  {featured.category} · {featured.minutes} min
                </p>
                <h2 className="mt-3 font-display text-3xl leading-snug md:text-5xl">
                  <Link
                    to="/articles/$slug"
                    params={{ slug: featured.slug }}
                    className="hover:text-red"
                  >
                    {featured.title}
                  </Link>
                </h2>
                <p className="mt-4 max-w-lg text-base leading-relaxed text-muted">
                  {featured.description}
                </p>
                <Link
                  to="/articles/$slug"
                  params={{ slug: featured.slug }}
                  className="mt-5 inline-flex items-center gap-2 text-sm text-red"
                >
                  Read the guide
                  <ArrowRight className="size-4" />
                </Link>
                <p className="mt-2 text-xs text-muted">
                  {formatArticleDate(featured.date)}
                </p>
              </div>
            </article>
          ) : null}

          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((a) => (
              <article key={a.slug} className="group">
                <Link to="/articles/$slug" params={{ slug: a.slug }} className="block">
                  <div className="overflow-hidden rounded-xl">
                    <SmartImg
                      src={a.image}
                      alt={a.alt}
                      className="aspect-[16/9] w-full transition-transform duration-700 group-hover:scale-[1.03]"
                      width={800}
                      height={450}
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <p className="mt-5 text-[0.6875rem] uppercase tracking-[0.18em] text-red">
                    {a.category} · {a.minutes} min
                  </p>
                  <h2 className="mt-2 font-display text-2xl leading-snug md:text-[1.65rem]">
                    {a.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{a.description}</p>
                  <p className="mt-3 inline-flex items-center gap-2 text-sm text-red">
                    Read the guide
                    <ArrowRight className="size-4" />
                  </p>
                  <p className="mt-1 text-xs text-muted">{formatArticleDate(a.date)}</p>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
