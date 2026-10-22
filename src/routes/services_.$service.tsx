import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/site/marks";
import { SmartImg } from "@/components/site/smart-img";
import { areas, company } from "@/lib/company";
import { locations } from "@/lib/locations";
import { servicePageBySlug, servicePages } from "@/lib/service-pages";
import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/services_/$service")({
  loader: ({ params }) => {
    const page = servicePageBySlug(params.service);
    if (!page) throw notFound();
    return { slug: page.slug };
  },
  head: ({ loaderData }) => {
    const page = loaderData ? servicePageBySlug(loaderData.slug) : undefined;
    if (!page) return {};
    return seoHead({
      title: page.seoTitle,
      description: page.description,
      path: page.path,
      image: page.image,
    });
  },
  component: ServiceDetailPage,
});

function ServiceDetailPage() {
  const { slug } = Route.useLoaderData();
  const page = servicePageBySlug(slug);
  if (!page) return null;

  const url = `${company.siteUrl}${page.path}`;
  const crumbs = [
    { name: "Home", url: `${company.siteUrl}/` },
    { name: "Services", url: `${company.siteUrl}/services` },
    { name: page.title, url },
  ];
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: page.h1,
        serviceType: page.title,
        url,
        description: page.description,
        provider: { "@id": `${company.siteUrl}#business` },
        areaServed: areas.map((name) => ({ "@type": "City", name })),
        telephone: company.phoneTel,
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: crumbs.map((crumb, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: crumb.name,
          item: crumb.url,
        })),
      },
    ],
  };
  const others = servicePages.filter((other) => other.slug !== page.slug);
  const pagedCities = new Set(locations.map((location) => location.city));
  const routeOnly = areas.filter((area) => !pagedCities.has(area));

  return (
    <main className="pb-16 md:pb-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <section className="bg-cream">
        <div className="mx-auto grid max-w-7xl items-end gap-10 px-5 py-16 sm:px-8 md:py-24 lg:grid-cols-2">
          <div>
            <nav aria-label="Breadcrumb" className="mb-6 text-xs text-muted">
              <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <li>
                  <Link to="/" className="hover:text-red">
                    Home
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li>
                  <Link to="/services" className="hover:text-red">
                    Services
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li aria-current="page" className="text-ink">
                  {page.title}
                </li>
              </ol>
            </nav>
            <Eyebrow>{page.title}</Eyebrow>
            <h1 className="display-section">{page.h1}</h1>
            <p className="mt-5 max-w-xl font-medium text-ink">{page.lead}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/quote" search={{ service: page.quoteService }}>
                  Request a quote
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href={`tel:${company.phoneTel}`}>Call {company.phoneDisplay}</a>
              </Button>
            </div>
            <p className="mt-6 text-sm text-muted">
              {company.address.line1}, {company.address.city}, {company.address.state}{" "}
              {company.address.zip}. {company.hours}. {company.licensed}.
            </p>
          </div>
          <SmartImg
            src={page.image}
            alt={page.alt}
            priority
            className="aspect-[4/3] w-full rounded-xl"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </section>

      <section className="bg-paper py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl items-start gap-12 px-5 sm:px-8 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Eyebrow>What is included</Eyebrow>
            <h2 className="display-section">{page.title}</h2>
            <p className="mt-5 leading-relaxed text-muted">{page.body}</p>
            <p className="mt-5 text-sm text-muted">
              The price is given in writing before a crew is booked.
            </p>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <ul className="space-y-3">
              {page.items.map((item) => (
                <li key={item} className="flex gap-2 text-sm">
                  <Check className="mt-0.5 size-4 shrink-0 text-red" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
            {page.guides.length > 0 ? (
              <div className="mt-10">
                <p className="text-[0.6875rem] uppercase tracking-[0.2em] text-muted">
                  Guides
                </p>
                <ul className="mt-3 space-y-2 text-sm">
                  {page.guides.map((guide) => (
                    <li key={guide.slug}>
                      <Link
                        to="/articles/$slug"
                        params={{ slug: guide.slug }}
                        className="text-red underline underline-offset-2"
                      >
                        {guide.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <section className="bg-cream py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Eyebrow>Where we work</Eyebrow>
          <h2 className="display-section max-w-3xl">
            {page.title} across the Valley and greater Los Angeles.
          </h2>
          <p className="mt-4 max-w-2xl text-sm text-muted">
            One office, on Ventura Blvd in Sherman Oaks. Same services in every
            neighborhood.
          </p>
          <ul className="mt-10 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
            {locations.map((location) => (
              <li key={location.path}>
                <Link to={location.path} className="text-red underline underline-offset-2">
                  {location.h1}
                </Link>
              </li>
            ))}
          </ul>
          {routeOnly.length > 0 ? (
            <p className="mt-8 max-w-3xl text-sm text-muted">
              Also on the route: {routeOnly.join(", ")}.{" "}
              <Link to="/service-areas" className="text-red underline underline-offset-2">
                All service areas
              </Link>
            </p>
          ) : null}
        </div>
      </section>

      <section className="bg-paper py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Eyebrow>Other services</Eyebrow>
          <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
            <li>
              <Link to="/airbnb" className="text-red underline underline-offset-2">
                Airbnb turnover cleaning
              </Link>
            </li>
            {others.map((other) => (
              <li key={other.slug}>
                <Link to={other.path} className="text-red underline underline-offset-2">
                  {other.h1}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/services" className="text-red underline underline-offset-2">
                All cleaning services
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <section className="bg-navy py-16 text-cream md:py-24">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-5 sm:px-8 md:flex-row md:items-center">
          <div>
            <h2 className="font-display text-4xl">Need a number today?</h2>
            <p className="mt-2 text-cream/85">
              Call {company.phoneDisplay} or send the quote form. We price before we
              begin.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="primary" size="lg">
              <a href={`tel:${company.phoneTel}`}>Call now</a>
            </Button>
            <Button asChild variant="cream" size="lg">
              <Link to="/quote" search={{ service: page.quoteService }}>
                Get a quote
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
