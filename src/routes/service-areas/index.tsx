import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/site/marks";
import { FaqList } from "@/components/site/faq-list";
import { areas, company, faqs, services } from "@/lib/company";
import { locations, regions } from "@/lib/locations";
import { seoHead } from "@/lib/seo";

const PATH = "/service-areas";
const serviceAreaFaq = faqs.filter((faq) => faq.q === "Where do you work?");

export const Route = createFileRoute("/service-areas/")({
  component: ServiceAreasHub,
  head: () =>
    seoHead({
      title: "Service Areas Across the Valley and LA | Extreme Quality Clean",
      description:
        "Where we clean, from a Sherman Oaks base: Van Nuys, Encino, Studio City, North Hollywood, Burbank, Glendale, the West Valley, and Beverly Hills. 24/7.",
      path: PATH,
      image: "/images/windows.webp",
    }),
});

function ServiceAreasHub() {
  const url = `${company.siteUrl}${PATH}`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${url}#page`,
        name: "Service areas",
        url,
        isPartOf: { "@id": `${company.siteUrl}#website` },
        about: { "@id": `${company.siteUrl}#business` },
        inLanguage: "en-US",
        mainEntity: {
          "@type": "ItemList",
          itemListElement: locations.map((location, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: location.h1,
            url: `${company.siteUrl}${location.path}`,
          })),
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${company.siteUrl}/` },
          { "@type": "ListItem", position: 2, name: "Service areas", item: url },
        ],
      },
    ],
  };

  return (
    <main className="pb-16 md:pb-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <section className="bg-cream">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-24">
          <nav aria-label="Breadcrumb" className="mb-6 text-xs text-muted">
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <li>
                <Link to="/" className="hover:text-red">
                  Home
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="text-ink">
                Service areas
              </li>
            </ol>
          </nav>
          <Eyebrow>Service areas</Eyebrow>
          <h1 className="display-section max-w-4xl">
            Cleaning across the Valley and greater Los Angeles, from one Sherman Oaks office.
          </h1>
          <p className="mt-5 max-w-2xl text-muted">
            The office is at {company.address.line1} in Sherman Oaks. From there we cover
            greater Los Angeles County: house cleaning, Airbnb turnovers, offices, carpet,
            and glass. Each neighborhood below has its own housing, its own drive, and its
            own page. Statewide work is quoted case by case.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to="/quote">
                Request a quote
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={`tel:${company.phoneTel}`}>Call {company.phoneDisplay}</a>
            </Button>
          </div>
          <p className="mt-6 text-sm text-muted">
            {company.hours}. {company.licensed}.
          </p>
        </div>
      </section>

      {regions.map((region, regionIndex) => {
        const pages = locations.filter((location) => location.region === region.id);
        if (!pages.length) return null;
        return (
          <section
            key={region.id}
            className={regionIndex % 2 === 0 ? "bg-paper py-16 md:py-24" : "bg-cream py-16 md:py-24"}
          >
            <div className="mx-auto max-w-7xl px-5 sm:px-8">
              <Eyebrow>{region.title}</Eyebrow>
              <p className="max-w-xl text-muted">{region.text}</p>
              <ul className="mt-10 grid gap-10 md:grid-cols-2">
                {pages.map((location) => (
                  <li key={location.path}>
                    <Link to={location.path} className="group block">
                      <h2 className="font-display text-3xl group-hover:text-red">
                        {location.h1}
                      </h2>
                      <span className="mt-2 block max-w-md text-sm leading-relaxed text-muted">
                        {location.lede}
                      </span>
                      <span className="mt-3 inline-flex items-center gap-1 text-sm text-red">
                        {location.city} page
                        <ArrowRight className="size-3.5" aria-hidden />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        );
      })}

      <section className="bg-navy py-16 text-cream md:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Eyebrow tone="cream">Also on the route</Eyebrow>
          <h2 className="display-section max-w-3xl">
            The neighborhoods we drive every week.
          </h2>
          <p className="mt-4 max-w-xl text-sm text-cream/80">
            Not every neighborhood has its own page yet. If yours is on this list, or
            anywhere in greater Los Angeles, call or send the rooms and we will quote it.
          </p>
          <ul className="mt-10 flex flex-wrap gap-2">
            {areas.map((area) => {
              const page = locations.find((location) => location.city === area);
              return (
                <li key={area}>
                  {page ? (
                    <Link
                      to={page.path}
                      className="inline-block rounded-full border border-cream/30 px-3 py-1.5 text-sm underline decoration-transparent underline-offset-2 hover:decoration-cream"
                    >
                      {area}
                    </Link>
                  ) : (
                    <span className="inline-block rounded-full border border-cream/15 px-3 py-1.5 text-sm text-cream/85">
                      {area}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="bg-paper py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-2">
          <div>
            <Eyebrow>What we clean</Eyebrow>
            <h2 className="font-display text-4xl md:text-5xl">Same services in every neighborhood.</h2>
            <ul className="mt-8 space-y-4">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    to={service.href.split("#")[0]}
                    hash={service.href.split("#")[1]}
                    className="group block"
                  >
                    <span className="font-display text-2xl group-hover:text-red">
                      {service.title}
                    </span>
                    <span className="mt-1 block text-sm text-muted">{service.summary}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              to="/services"
              className="mt-6 inline-flex text-sm text-red underline underline-offset-2"
            >
              All cleaning services
            </Link>
          </div>
          <div>
            <Eyebrow>Question</Eyebrow>
            <h2 className="font-display text-4xl md:text-5xl">The short answer.</h2>
            <div className="mt-8">
              <FaqList items={serviceAreaFaq} />
            </div>
            <p className="mt-8 text-sm text-muted">
              The price is given in writing before a crew is booked.{" "}
              <Link to="/contact" className="text-red underline underline-offset-2">
                Contact the office
              </Link>{" "}
              or{" "}
              <Link to="/quote" className="text-red underline underline-offset-2">
                request a quote
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
