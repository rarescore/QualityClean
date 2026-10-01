import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/site/marks";
import { FaqList } from "@/components/site/faq-list";
import { SmartImg } from "@/components/site/smart-img";
import { company, reviews } from "@/lib/company";
import { locations, type LocationPage as LocationCopy } from "@/lib/locations";

export function LocationPage({ page }: { page: LocationCopy }) {
  const quotes = page.reviewNames
    .map((name) => reviews.find((review) => review.name === name))
    .filter((review) => review != null);
  const others = page.neighbors
    .map((path) => locations.find((location) => location.path === path))
    .filter((location) => location != null);
  const url = `${company.siteUrl}${page.path}`;
  const crumbs = [
    { name: "Home", url: `${company.siteUrl}/` },
    { name: "Service areas", url: `${company.siteUrl}/service-areas` },
    { name: page.city, url },
  ];
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: page.h1,
        serviceType: page.h1,
        url,
        description: page.description,
        provider: { "@id": `${company.siteUrl}#business` },
        areaServed: {
          "@type": "City",
          name: page.city,
          containedInPlace: { "@type": "State", name: "California" },
        },
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
      ...(page.faqs?.length
        ? [
            {
              "@type": "FAQPage",
              "@id": `${url}#faq`,
              mainEntity: page.faqs.map((faq) => ({
                "@type": "Question",
                name: faq.q,
                acceptedAnswer: { "@type": "Answer", text: faq.a },
              })),
            },
          ]
        : []),
    ],
  };

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
                  <Link to="/service-areas" className="hover:text-red">
                    Service areas
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li aria-current="page" className="text-ink">
                  {page.city}
                </li>
              </ol>
            </nav>
            <Eyebrow>{page.eyebrow}</Eyebrow>
            <h1 className="display-section">{page.h1}</h1>
            <p className="mt-5 max-w-xl text-muted">{page.lede}</p>
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
              {company.address.zip}. {company.hours}.
            </p>
          </div>
          <SmartImg
            src={page.image}
            alt={page.imageAlt}
            priority
            className="aspect-[4/3] w-full rounded-xl"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </section>

      <section className="bg-paper py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl items-start gap-12 px-5 sm:px-8 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Eyebrow>{page.city}</Eyebrow>
            <h2 className="display-section">{page.housingTitle}</h2>
            <p className="mt-5 text-muted">{page.housing}</p>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <SmartImg
              src={page.secondaryImage}
              alt={page.secondaryAlt}
              className="aspect-[4/5] w-full rounded-xl"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
            <p className="mt-5 text-sm leading-relaxed text-muted">{page.housingAside}</p>
          </div>
        </div>
      </section>

      <section className="bg-cream py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Eyebrow>On the schedule</Eyebrow>
          <h2 className="display-section max-w-3xl">{page.jobsTitle}</h2>
          <div className="mt-12 grid gap-px bg-line md:grid-cols-3">
            {page.jobs.map((job) => (
              <article key={job.title} className="bg-cream p-6 md:p-8">
                <h3 className="font-display text-2xl">{job.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{job.text}</p>
              </article>
            ))}
          </div>
          <p className="mt-8 max-w-2xl text-sm text-muted">
            These are the kinds of visits we take in {page.city}. They are not a
            list of invented clients. The price is given in writing before a
            crew is booked.
          </p>
        </div>
      </section>

      <section className="bg-navy py-20 text-cream md:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Eyebrow tone="cream">Google reviews</Eyebrow>
          <h2 className="display-section max-w-3xl">
            From the company’s Google reviews. Not written for {page.city}.
          </h2>
          <p className="mt-4 max-w-2xl text-sm text-cream/80">
            {company.ratings.google.value.toFixed(1)} from {company.ratings.google.count}{" "}
            Google reviews. We do not invent neighborhood testimonials. These two
            match the kind of work booked here.
          </p>
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {quotes.map((review) => (
              <blockquote
                key={review.name}
                className="rounded-xl border border-cream/15 p-7"
              >
                <p className="font-sans text-sm tracking-[0.28em]" aria-label="5 out of 5 stars">
                  ★★★★★
                </p>
                <p className="mt-5 font-display text-2xl leading-snug">“{review.text}”</p>
                <footer className="mt-8 text-[0.6875rem] uppercase tracking-[0.18em] text-cream/80">
                  {review.name} · Google
                </footer>
              </blockquote>
            ))}
          </div>
          <a
            href={company.social.google}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex text-sm text-cream underline decoration-cream/40 underline-offset-4 hover:decoration-cream"
          >
            Read all {company.ratings.google.count} on Google
          </a>
        </div>
      </section>

      {page.faqs?.length ? (
        <section className="bg-cream py-20 md:py-28">
          <div className="mx-auto max-w-4xl px-5 sm:px-8">
            <Eyebrow>Questions</Eyebrow>
            <h2 className="display-section">Before you book in {page.city}.</h2>
            <div className="mt-10">
              <FaqList items={page.faqs} />
            </div>
          </div>
        </section>
      ) : null}

      <section className="bg-paper py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-2">
          <div>
            <Eyebrow>Office</Eyebrow>
            <h2 className="font-display text-4xl md:text-5xl">
              {company.address.line1}
            </h2>
            <p className="mt-3 text-muted">
              {company.address.city}, {company.address.state} {company.address.zip}
            </p>
            <p className="mt-2 text-muted">{company.hours}</p>
            <p className="mt-4">
              <a href={`tel:${company.phoneTel}`} className="text-red underline underline-offset-2">
                {company.phoneDisplay}
              </a>
            </p>
            {page.addressNote ? (
              <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted">{page.addressNote}</p>
            ) : (
              <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted">
                One office, on Ventura Blvd in Sherman Oaks. {page.city} is a
                neighborhood we drive, not a second storefront.
              </p>
            )}
            <div className="mt-8">
              <Button asChild variant="outline">
                <a href={company.address.maps} target="_blank" rel="noopener noreferrer">
                  Open the office in Google Maps
                </a>
              </Button>
            </div>
          </div>
          <div>
            <Eyebrow>Also nearby</Eyebrow>
            <ul className="mt-6 space-y-4">
              {others.map((location) => (
                <li key={location.path}>
                  <Link to={location.path} className="group block">
                    <span className="font-display text-2xl group-hover:text-red">{location.h1}</span>
                    <span className="mt-1 block text-sm text-muted">{location.lede}</span>
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/service-areas" className="text-sm text-red underline underline-offset-2">
                  Every neighborhood we serve
                </Link>
              </li>
              <li>
                <Link to="/airbnb" className="text-sm text-red underline underline-offset-2">
                  Airbnb turnovers across the Valley
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-sm text-red underline underline-offset-2">
                  All cleaning services
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
