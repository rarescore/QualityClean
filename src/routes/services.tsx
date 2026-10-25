import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ClockLockup, Eyebrow } from "@/components/site/marks";
import { CinematicVideo } from "@/components/site/cinematic-video";
import { SmartImg } from "@/components/site/smart-img";
import { company, services } from "@/lib/company";
import { servicePages } from "@/lib/service-pages";
import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/services")({
  component: ServicesPage,
  head: () => {
    const base = seoHead({
      title: "Cleaning Services Los Angeles | Extreme Quality Clean",
      description:
        "Airbnb turnovers, house cleaning, commercial, carpet, floor, and window cleaning in greater Los Angeles. 24/7. Licensed, insured, bonded.",
      path: "/services",
      image: "/images/kitchen.webp",
    });
    return {
      meta: base.meta,
      links: [
        ...base.links,
        {
          rel: "preload",
          href: "/images/airbnb-bedroom-800.webp",
          as: "image",
          type: "image/webp",
        },
      ],
    };
  },
});

const longform = servicePages;

function ServicesPage() {
  return (
    <main className="pb-16 md:pb-0">
      <section className="border-b border-line bg-navy py-20 text-cream md:py-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Eyebrow as="h1" tone="cream">
            Cleaning Services in Sherman Oaks, the San Fernando Valley &amp; Los Angeles
          </Eyebrow>
          <p className="max-w-3xl font-display text-5xl leading-tight md:text-7xl">
            Everything that has to be clean in Los Angeles.
          </p>
          <p className="mt-5 max-w-xl text-cream/85">
            Airbnb turnovers, homes, offices, carpet, glass. Same company,
            same 24/7 phone, same rule: the price before we start.
          </p>
        </div>
      </section>

      <section className="bg-paper py-16">
        <div className="mx-auto grid max-w-6xl gap-4 px-5 sm:px-8 md:grid-cols-3">
          {services.map((svc, i) => (
            <a
              key={svc.slug}
              href={svc.href}
              className="group overflow-hidden rounded-xl border border-line bg-cream"
            >
              <SmartImg
                src={svc.image}
                alt={svc.title}
                className="aspect-[16/10] w-full transition-transform duration-500 group-hover:scale-105"
                width={800}
                height={500}
                sizes="(max-width: 768px) 100vw, 33vw"
                priority={i === 0}
              />
              <div className="p-5">
                <p className="text-[0.6875rem] uppercase tracking-[0.18em] text-red">
                  {svc.kicker}
                </p>
                <h2 className="mt-1 font-display text-2xl">{svc.title}</h2>
                <p className="mt-2 text-sm text-muted">{svc.summary}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="bg-cream py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-2">
          <div>
            <Eyebrow>Lead service</Eyebrow>
            <h2 className="font-display text-4xl md:text-5xl">
              Airbnb turnovers, on a hotel clock.
            </h2>
            <p className="mt-4 text-muted">
              Check-out at 11. Guest-ready at 3. Restock checks, hotel-made
              beds, optional photo report. This is the work we built the new
              site around — because it is the work Los Angeles hosts cannot
              gamble on.
            </p>
            <div className="mt-6">
              <ClockLockup />
            </div>
            <Button asChild className="mt-8" size="lg">
              <Link to="/airbnb">
                Host program
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
          <div className="relative min-h-72 overflow-hidden rounded-xl">
            <CinematicVideo
              src="/videos/airbnb-bed.mp4"
              poster="/images/posters/airbnb-bed.webp"
              alt="Guest-ready bedroom after an Airbnb turnover"
              className="absolute inset-0 size-full min-h-72"
            />
          </div>
        </div>
      </section>

      {longform.map((block, i) => (
        <section
          id={block.id}
          key={block.id}
          className={i % 2 === 0 ? "bg-paper py-16 md:py-24" : "bg-cream py-16 md:py-24"}
        >
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-2">
            <SmartImg
              src={block.image}
              alt={block.alt}
              className={`aspect-[4/3] w-full rounded-xl ${i % 2 ? "lg:order-2" : ""}`}
              width={900}
              height={675}
            />
            <div>
              <h2 className="font-display text-4xl md:text-5xl">
                <Link to={block.path} className="hover:text-red">
                  {block.title}
                </Link>
              </h2>
              <p className="mt-4 font-medium text-ink">{block.lead}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted md:text-base">
                {block.body}
              </p>
              <ul className="mt-6 space-y-2">
                {block.items.map((item) => (
                  <li key={item} className="flex gap-2 text-sm">
                    <Check className="mt-0.5 size-4 shrink-0 text-red" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm">
                <Link to={block.path} className="text-red underline underline-offset-2">
                  {block.h1}: full details
                </Link>
              </p>
              {block.guides.length > 0 ? (
                <p className="mt-6 text-sm text-muted">
                  Related:{" "}
                  {block.guides.map((g, gi) => (
                    <span key={g.slug}>
                      <Link
                        to="/articles/$slug"
                        params={{ slug: g.slug }}
                        className="text-red underline underline-offset-2"
                      >
                        {g.label}
                      </Link>
                      {gi < block.guides.length - 1 ? " · " : ""}
                    </span>
                  ))}
                </p>
              ) : null}
            </div>
          </div>
        </section>
      ))}

      <section className="bg-navy py-16 text-cream md:py-24">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-5 sm:px-8 md:flex-row md:items-center">
          <div>
            <h2 className="font-display text-4xl">Need a number today?</h2>
            <p className="mt-2 text-cream/85">
              Call {company.phoneDisplay} or send the quote form. We price
              before we begin.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="primary" size="lg">
              <a href={`tel:${company.phoneTel}`}>Call now</a>
            </Button>
            <Button asChild variant="cream" size="lg">
              <Link to="/quote">Get a quote</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
