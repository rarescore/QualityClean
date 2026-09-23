import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArticleBody } from "@/components/site/article-body";
import { Eyebrow } from "@/components/site/marks";
import { FaqList } from "@/components/site/faq-list";
import { Magnetic } from "@/components/site/magnetic";
import { SmartImg } from "@/components/site/smart-img";
import {
  articles,
  extractFaqs,
  extractHeadings,
  extractImages,
  formatArticleDate,
  getArticle,
  readMinutes,
  stripFaqSection,
} from "@/lib/articles";
import { company } from "@/lib/company";
import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/articles/$slug")({
  loader: ({ params }) => {
    const article = getArticle(params.slug);
    if (!article) throw notFound();
    return { article };
  },
  head: ({ loaderData }) => {
    const a = loaderData?.article;
    if (!a) return {};
    return seoHead({
      title: `${a.seoTitle} | Extreme Quality Clean`,
      description: a.description,
      path: `/articles/${a.slug}`,
      image: a.image,
      type: "article",
      published: a.date,
      modified: a.date,
    });
  },
  component: ArticlePage,
});

function ArticlePage() {
  const { article } = Route.useLoaderData();
  const faqs = extractFaqs(article.body);
  const headings = extractHeadings(article.body);
  const inlineImages = extractImages(article.body);
  const related = article.related
    .map((slug) => articles.find((a) => a.slug === slug))
    .filter(Boolean);
  const url = `${company.siteUrl}/articles/${article.slug}`;
  const image = `${company.siteUrl}${article.image}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    image: [image, ...inlineImages.map((img) => `${company.siteUrl}${img.src.replace(/\.jpg$/, ".webp")}`)],
    datePublished: article.date,
    dateModified: article.date,
    author: {
      "@type": "Organization",
      name: company.legal,
      url: company.siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: company.legal,
      logo: {
        "@type": "ImageObject",
        url: `${company.siteUrl}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    keywords: article.keyword,
    articleSection: article.category,
    inLanguage: "en-US",
    isAccessibleForFree: true,
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: company.siteUrl },
      {
        "@type": "ListItem",
        position: 2,
        name: "Articles",
        item: `${company.siteUrl}/articles`,
      },
      { "@type": "ListItem", position: 3, name: article.title, item: url },
    ],
  };

  const faqSchema = faqs.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }
    : null;

  return (
    <main className="pb-16 md:pb-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      {faqSchema ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      ) : null}

      <article>
        <header className="border-b border-line bg-cream">
          <div className="mx-auto max-w-3xl px-5 py-12 sm:px-8 md:py-16">
            <p className="text-[0.6875rem] uppercase tracking-[0.2em] text-red">
              <Link to="/" className="hover:underline">
                Home
              </Link>
              {" · "}
              <Link to="/articles" className="hover:underline">
                Articles
              </Link>
              {" · "}
              {article.category}
            </p>
            <h1 className="mt-4 font-display text-4xl leading-[1.05] md:text-6xl">
              {article.title}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
              {article.description}
            </p>
            <p className="mt-5 text-sm text-muted">
              {formatArticleDate(article.date)} · {readMinutes(article.body)} min
              read · Written by {company.short}, {company.address.city}
            </p>
          </div>
          <figure className="relative">
            <SmartImg
              src={article.image}
              alt={article.alt}
              className="aspect-[16/8] w-full"
              width={1920}
              height={960}
              sizes="100vw"
              priority
            />
            <figcaption className="mx-auto max-w-3xl px-5 py-3 text-xs text-muted sm:px-8">
              {article.alt}
            </figcaption>
          </figure>
        </header>

        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-12 sm:px-8 md:py-16 xl:grid-cols-[220px_minmax(0,42rem)] xl:justify-center">
          {headings.length > 2 ? (
            <nav
              aria-label="On this page"
              className="xl:sticky xl:top-28 xl:self-start"
            >
              <p className="text-[0.6875rem] uppercase tracking-[0.2em] text-muted">
                In this guide
              </p>
              <ol className="mt-4 hidden space-y-2.5 border-l border-line pl-4 text-sm xl:block">
                {headings.map((h) => (
                  <li key={h.id}>
                    <a
                      href={`#${h.id}`}
                      className="text-muted transition-colors hover:text-red"
                    >
                      {h.text}
                    </a>
                  </li>
                ))}
              </ol>
              <details className="mt-3 xl:hidden">
                <summary className="cursor-pointer text-sm text-red">
                  Jump to a section
                </summary>
                <ol className="mt-3 space-y-2 border-l border-line pl-4 text-sm">
                  {headings.map((h) => (
                    <li key={h.id}>
                      <a href={`#${h.id}`} className="text-muted hover:text-red">
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </details>
            </nav>
          ) : (
            <div className="hidden xl:block" />
          )}

          <div>
            <ArticleBody markdown={stripFaqSection(article.body)} />

            {faqs.length > 0 ? (
              <div className="mt-16">
                <Eyebrow>Questions</Eyebrow>
                <h2 className="mt-4 font-display text-3xl md:text-4xl">
                  Frequently asked.
                </h2>
                <div className="mt-8">
                  <FaqList items={faqs} />
                </div>
              </div>
            ) : null}

            <p className="mt-12 text-sm text-muted">
              Need the work, not another list?{" "}
              <a href={article.serviceTo} className="text-red underline underline-offset-2">
                {article.serviceLabel}
              </a>{" "}
              from Extreme Quality Clean in Sherman Oaks.
            </p>
          </div>
        </div>
      </article>

      <section className="border-y border-line bg-navy py-16 text-cream md:py-20">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <h2 className="font-display text-4xl md:text-5xl">
            Need the work done, not another checklist?
          </h2>
          <p className="mt-4 max-w-lg text-cream/85">
            Extreme Quality Clean — Sherman Oaks, 24/7. Quoted in writing
            before a crew is booked.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Magnetic>
              <Button asChild size="lg">
                <Link to="/quote">
                  Request a quote
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </Magnetic>
            <Button asChild size="lg" variant="cream">
              <a href={`tel:${company.phoneTel}`}>{company.phoneDisplay}</a>
            </Button>
            <Button asChild size="lg" variant="invert">
              <a href={article.serviceTo}>{article.serviceLabel}</a>
            </Button>
          </div>
        </div>
      </section>

      {related.length > 0 ? (
        <section className="bg-paper py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <Eyebrow>Keep reading</Eyebrow>
            <h2 className="display-section mb-10">Next.</h2>
            <div className="grid gap-8 md:grid-cols-3">
              {related.map((a) =>
                a ? (
                  <Link
                    key={a.slug}
                    to="/articles/$slug"
                    params={{ slug: a.slug }}
                    className="group block"
                  >
                    <div className="overflow-hidden rounded-xl">
                      <SmartImg
                        src={a.image}
                        alt={a.alt}
                        className="aspect-[16/10] w-full transition-transform duration-700 group-hover:scale-[1.03]"
                        width={800}
                        height={500}
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <p className="mt-4 text-[0.6875rem] uppercase tracking-[0.18em] text-red">
                      {a.category}
                    </p>
                    <h3 className="mt-1 font-display text-xl leading-snug md:text-2xl">
                      {a.title}
                    </h3>
                  </Link>
                ) : null,
              )}
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}
