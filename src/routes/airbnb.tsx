import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ClockLockup, Eyebrow, Sparkle } from "@/components/site/marks";
import { CinematicVideo } from "@/components/site/cinematic-video";
import { QuoteForm } from "@/components/site/quote-form";
import { Magnetic } from "@/components/site/magnetic";
import { SmartImg } from "@/components/site/smart-img";
import {
  company,
  hostAddons,
  hostChecklist,
  hostTimeline,
  turnoverProduct,
} from "@/lib/company";
import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/airbnb")({
  component: AirbnbPage,
  head: () => {
    const base = seoHead({
      title: "Airbnb Turnover Cleaning Los Angeles | Extreme Quality Clean",
      description:
        "Same-day Airbnb and short-term rental turnovers in Los Angeles. Hotel-made beds, restock checks, 11am to 3pm. 24/7 crews from Sherman Oaks.",
      path: "/airbnb",
      image: "/images/posters/airbnb-bed.webp",
    });
    return {
      meta: base.meta,
      links: [
        ...base.links,
        {
          rel: "preload",
          href: "/images/posters/airbnb-bed-800.webp",
          as: "image",
          type: "image/webp",
          media: "(max-width: 768px)",
        },
        {
          rel: "preload",
          href: "/images/posters/airbnb-bed.webp",
          as: "image",
          type: "image/webp",
          media: "(min-width: 769px)",
        },
      ],
    };
  },
});

function AirbnbPage() {
  return (
    <main className="pb-16 md:pb-0">
      <section className="relative min-h-svh overflow-hidden bg-navy">
        <CinematicVideo
          src="/videos/airbnb-bed.mp4"
          poster="/images/posters/airbnb-bed.webp"
          alt="Guest-ready Los Angeles Airbnb bedroom, hotel-made"
          priority
          className="absolute inset-0 size-full"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/75 to-navy/35" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-navy/70 to-transparent" />
        <div className="relative mx-auto flex min-h-svh max-w-7xl flex-col justify-end px-5 py-16 sm:px-8 md:pb-24 md:pt-40">
          <Eyebrow tone="cream">The product · Host program</Eyebrow>
          <h1 className="display-hero max-w-4xl text-cream">
            Five-star listings are a cleaning problem.
          </h1>
          <p className="mt-6 max-w-lg text-base text-cream/85 md:text-lg">
            {turnoverProduct.pitch} The number before we start.
          </p>
          <div className="mt-8">
            <ClockLockup tone="cream" />
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Magnetic>
              <Button asChild size="xl">
                <Link to="/quote" search={{ service: "airbnb" }}>
                  Book a turnover
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </Magnetic>
            <Button asChild size="xl" variant="cream">
              <a href={`tel:${company.phoneTel}`}>{company.phoneDisplay}</a>
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-paper py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Eyebrow>The window</Eyebrow>
          <h2 className="display-section max-w-3xl">Four hours. One crew. No mystery.</h2>
          <div className="mt-14 grid gap-px bg-line md:grid-cols-4">
            {hostTimeline.map((step) => (
              <article key={step.time} className="bg-paper p-6 md:p-8">
                <p className="font-sans text-3xl font-light tabular-nums tracking-tight text-red md:text-4xl">{step.time}</p>
                <h3 className="mt-4 font-display text-2xl">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream py-24 md:py-32">
        <div className="mx-auto grid max-w-7xl items-start gap-12 px-5 sm:px-8 lg:grid-cols-2">
          <div>
            <Eyebrow>What you are buying</Eyebrow>
            <h2 className="display-section">Guest-ready. Not “we cleaned.”</h2>
            <p className="mt-5 text-muted">
              You can send your own list. This is the floor we will not go under.
            </p>
            <ul className="mt-8 space-y-3">
              {hostChecklist.map((item) => (
                <li key={item} className="flex gap-3 text-sm md:text-base">
                  <Check className="mt-0.5 size-4 shrink-0 text-red" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-8 font-display text-3xl text-navy">
              Quoted before we start.
            </p>
            <p className="mt-1 text-sm text-muted">
              The number, in writing, before a crew is booked.
            </p>
          </div>
          <div className="grid gap-4">
            <SmartImg
              src="/images/linen.webp"
              alt="Hotel-tight linen after an Airbnb turnover"
              className="img-reveal aspect-square w-full rounded-xl"
              width={900}
              height={900}
            />
            <SmartImg
              src="/images/bathroom.webp"
              alt="Spa-level bathroom after an Airbnb turnover"
              className="img-reveal aspect-[16/10] w-full rounded-xl"
              width={960}
              height={600}
            />
          </div>
        </div>
      </section>

      <section className="bg-navy py-24 text-cream md:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Eyebrow tone="cream">Add-ons hosts actually buy</Eyebrow>
          <h2 className="display-section max-w-2xl">Cleaning is the base. Hospitality is the rest.</h2>
          <div className="mt-14 grid gap-4 sm:grid-cols-2">
            {hostAddons.map((item) => (
              <article
                key={item.title}
                className="rounded-xl border border-cream/15 p-7"
              >
                <Sparkle className="size-4 text-red" />
                <h3 className="mt-4 font-display text-2xl">{item.title}</h3>
                <p className="mt-2 text-sm text-cream/85">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper py-24 md:py-32">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2">
          <div className="relative min-h-72 overflow-hidden rounded-xl lg:min-h-[22rem]">
            <CinematicVideo
              src="/videos/kitchen.mp4"
              poster="/images/posters/kitchen.webp"
              alt="Kitchen reset after an Airbnb stay"
              className="absolute inset-0 size-full"
            />
          </div>
          <div>
            <Eyebrow>Recurring calendars</Eyebrow>
            <h2 className="display-section">One listing or a small portfolio.</h2>
            <p className="mt-5 leading-relaxed text-muted">
              Send the iCal, the Hostaway, or a text the night before. We hold a
              standing window for hosts who turn weekly. Same crew when we can —
              because they already know where the extra linens live.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-ink">
              <li className="flex gap-2">
                <Check className="size-4 text-red" aria-hidden />
                Smart lock, lockbox, or manager meet
              </li>
              <li className="flex gap-2">
                <Check className="size-4 text-red" aria-hidden />
                Same-day and 24/7 for late checkouts
              </li>
              <li className="flex gap-2">
                <Check className="size-4 text-red" aria-hidden />
                Pet-friendly chemistry and odor work
              </li>
            </ul>
            <p className="mt-6 text-sm text-muted">
              Hosts in Sherman Oaks, Studio City, Encino, and across the Valley
              use the same window.{" "}
              <Link to="/articles" className="text-red underline underline-offset-2">
                Cleaning guides
              </Link>{" "}
              if you want the rooms in writing first.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-cream py-24 md:py-32" id="book">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Eyebrow>Hold a window</Eyebrow>
          <h2 className="display-section mb-10">Tell us the listing. We’ll quote before we start.</h2>
          <div className="rounded-xl border border-line bg-paper p-5 sm:p-10">
            <QuoteForm defaultService="airbnb" />
          </div>
        </div>
      </section>
    </main>
  );
}
