import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ClockLockup, Eyebrow, Sparkle } from "@/components/site/marks";
import { CinematicVideo } from "@/components/site/cinematic-video";
import { TheWindow } from "@/components/site/the-window";
import { ReviewsBand } from "@/components/site/reviews";
import { FaqList } from "@/components/site/faq-list";
import { QuoteForm } from "@/components/site/quote-form";
import { Magnetic } from "@/components/site/magnetic";
import { CountUp } from "@/components/site/count-up";
import { latestArticles } from "@/lib/article-meta";
import { seoHead } from "@/lib/seo";
import { webpSrcSet } from "@/lib/img";
import {
  company,
  services,
  proofs,
  team,
  hostChecklist,
  sellable,
  versus,
} from "@/lib/company";
import { coreLocations } from "@/lib/locations";
import { marqueeItems } from "@/lib/strip-locations";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => {
    const base = seoHead({
      title: "Extreme Quality Clean | Airbnb & Home Cleaning Los Angeles",
      description:
        "Los Angeles Airbnb turnovers, residential and commercial cleaning. Check-out at 11. Guest-ready at 3. 25 years. 24/7. Sherman Oaks.",
      path: "/",
      image: "/images/posters/hero-clean.webp",
    });
    return {
      meta: base.meta,
      links: [
        ...base.links,
        {
          rel: "preload",
          href: "/images/posters/hero-clean.webp",
          as: "image",
          type: "image/webp",
        },
        {
          rel: "preload",
          href: "/fonts/outfit.woff2",
          as: "font",
          type: "font/woff2",
          crossOrigin: "anonymous",
        },
      ],
    };
  },
});

function Home() {
  return (
    <main className="pb-16 md:pb-0">
      <section className="relative h-[100dvh] min-h-[100dvh] w-full overflow-hidden bg-navy font-sans text-cream max-md:-mt-[env(safe-area-inset-top)] max-md:h-[calc(100dvh+env(safe-area-inset-top))] max-md:min-h-[calc(100dvh+env(safe-area-inset-top))]">
        <CinematicVideo
          src="/videos/hero-clean.mp4"
          mobileSrc="/videos/hero-clean-phone.mp4"
          poster="/images/posters/hero-clean.webp"
          mobilePoster="/images/posters/hero-clean-phone.webp"
          alt="Soap, a sink, then a guest-ready living room"
          priority
          className="absolute inset-0 size-full"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-navy/35 via-transparent to-navy/75" />
        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col px-5 pb-24 pt-[max(4.5rem,env(safe-area-inset-top))] sm:px-8 md:justify-end md:pb-20 md:pt-36">
          <div>
            <Eyebrow tone="cream" className="rise-in">
              Los Angeles · Airbnb turnovers
            </Eyebrow>
            <h1 className="display-hero max-w-5xl font-sans text-cream max-md:!text-[2.7rem] max-md:!leading-[0.98]">
              Check-out at <span className="display-num">11</span>.
              <br />
              Guest-ready at <span className="display-num">3</span>.
            </h1>
            <p className="rise-in-3 mt-3 max-w-xl text-sm leading-snug text-cream/85 sm:text-lg md:mt-6 md:leading-relaxed">
              You are not buying hours. You are buying the next review.
              Hotel-standard turnovers for LA hosts — quoted in writing before we
              start.
            </p>
          </div>
          <div className="mt-auto md:mt-8">
            <div className="rise-in-4 flex flex-col gap-5 md:flex-row md:items-end md:justify-between md:gap-8">
              <div className="flex items-center gap-2">
                <Magnetic>
                  <Button asChild size="xl" className="max-md:h-12 max-md:flex-1 max-md:px-3">
                    <Link to="/quote">
                      Book a turnover
                      <ArrowRight className="size-4" />
                    </Link>
                  </Button>
                </Magnetic>
                <Button asChild size="xl" variant="invert" className="max-md:h-12 max-md:flex-1 max-md:px-3">
                  <Link to="/services">What we do</Link>
                </Button>
              </div>
              <div className="hidden md:block">
                <ClockLockup tone="cream" />
              </div>
            </div>
            <dl className="mt-4 grid grid-cols-3 gap-4 border-t border-cream/15 pt-3 max-w-xl md:mt-12 md:gap-6 md:pt-6">
            {[
              { k: <><CountUp to={25} /> yrs</>, v: "in Los Angeles" },
              { k: "24/7", v: "we pick up" },
              { k: "Bonded", v: "quoted first" },
            ].map((s, i) => (
              <div key={i}>
                <dt className="font-display text-2xl text-cream sm:text-3xl">{s.k}</dt>
                <dd className="mt-1 text-xs text-cream/80">{s.v}</dd>
              </div>
            ))}
          </dl>
          </div>
        </div>
      </section>

      <div className="overflow-hidden border-b border-line bg-cream py-3">
        <div className="marquee-track flex w-max gap-10 pr-10 text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-navy/70">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={`${item.label}-${i}`} className="flex items-center gap-10">
              {item.kind === "city" ? (
                <Link to="/locations/$city" params={{ city: item.slug }}>
                  {item.label}
                </Link>
              ) : (
                item.label
              )}
              <span className="spark-dot" aria-hidden />
            </span>
          ))}
        </div>
      </div>

      <TheWindow />

      <section className="border-b border-line bg-paper py-16 md:py-24" id="quote">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <Eyebrow>Quote</Eyebrow>
          <h2 className="display-section">We’ll quote first.</h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted md:text-base">
            No published rates. The number we stand behind is the one we give
            before a crew is booked. Call if it is same-day — we pick up at
            night.
          </p>
          <div className="mt-8 rounded-xl border border-line bg-cream p-4 shadow-card sm:p-8">
            <QuoteForm variant="book" quickMobile />
          </div>
        </div>
      </section>

      <section className="bg-paper py-16 md:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="reveal max-w-3xl">
            <Eyebrow>The visit</Eyebrow>
            <h2 className="display-section">What the crew leaves behind.</h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
              Hotel corners, restock, a walkthrough, the door locked before the
              new code is issued.
            </p>
          </div>

          <div className="mt-14 grid gap-4 lg:grid-cols-12">
            <article className="reveal relative overflow-hidden rounded-xl bg-navy p-8 text-cream lg:col-span-7 lg:p-12">
              <p className="text-[0.6875rem] uppercase tracking-[0.2em] text-cream/80">
                Lead offer · Airbnb hosts
              </p>
              <p className="mt-4 max-w-md font-sans text-4xl font-light leading-tight tracking-tight md:text-5xl">
                The checklist is the product.
              </p>
              <p className="mt-3 max-w-md text-sm text-cream/85">
                The number, in writing, before a crew is booked. Senior and
                military discount on request. Same-day when the calendar allows.
              </p>
              <ul className="mt-8 grid gap-2 sm:grid-cols-2">
                {hostChecklist.slice(0, 8).map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-cream/80">
                    <Check className="mt-0.5 size-4 shrink-0 text-red" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-10 flex flex-wrap gap-3">
                <Magnetic>
                  <Button asChild size="lg">
                    <Link to="/quote" search={{ service: "airbnb" }}>
                      Hold this window
                      <ArrowRight className="size-4" />
                    </Link>
                  </Button>
                </Magnetic>
                <Button asChild size="lg" variant="invert">
                  <Link to="/airbnb">Full host program</Link>
                </Button>
              </div>
            </article>
            <div className="grid gap-4 lg:col-span-5">
              {sellable.slice(1).map((p) => (
                <article
                  key={p.id}
                  className="reveal flex flex-col justify-between rounded-xl border border-line bg-cream p-7"
                >
                  <div>
                    <p className="text-[0.6875rem] uppercase tracking-[0.18em] text-red">
                      {p.kicker}
                    </p>
                    <h3 className="mt-2 font-display text-3xl">{p.name}</h3>
                    <p className="mt-2 text-sm text-muted">{p.pitch}</p>
                  </div>
                  <Link
                    to="/quote"
                    search={{ service: p.service }}
                    className="mt-6 inline-flex items-center gap-2 text-sm text-red hover:underline"
                  >
                    {p.cta}
                    <ArrowRight className="size-4" />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-paper py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="reveal max-w-3xl">
            <Eyebrow>Not an app</Eyebrow>
            <h2 className="display-section">A Sherman Oaks company. Not a marketplace.</h2>
          </div>
          <div className="mt-14 overflow-hidden rounded-xl border border-line">
            <div className="grid grid-cols-2 bg-cream text-[0.6875rem] uppercase tracking-[0.18em] text-muted">
              <p className="border-r border-line px-5 py-3 sm:px-8">The usual</p>
              <p className="px-5 py-3 text-red sm:px-8">Extreme</p>
            </div>
            {versus.map((row) => (
              <div
                key={row.us}
                className="grid grid-cols-2 border-t border-line"
              >
                <p className="border-r border-line px-5 py-5 text-sm text-muted sm:px-8 md:text-base">
                  {row.them}
                </p>
                <p className="px-5 py-5 text-sm text-ink sm:px-8 md:text-base">{row.us}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
            {proofs.map((p) => (
              <div key={p.label} className="bg-paper p-6">
                <p className="font-display text-3xl text-navy">{p.label}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-cream py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="reveal max-w-xl">
              <Eyebrow>Also the work</Eyebrow>
              <h2 className="display-section">Homes, offices, carpet, glass.</h2>
            </div>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-sm text-red hover:underline"
            >
              All services
              <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-6">
            {services.map((svc, i) => (
              <Link
                key={svc.slug}
                to={svc.slug === "airbnb" ? "/airbnb" : "/services"}
                className={
                  i === 0
                    ? "group relative min-h-80 overflow-hidden rounded-xl md:col-span-4 md:min-h-[28rem]"
                    : "group relative min-h-56 overflow-hidden rounded-xl md:col-span-2"
                }
              >
                <img
                  src={svc.image.replace(/\.webp$/, "-800.webp")}
                  srcSet={webpSrcSet(svc.image)}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  alt={svc.title}
                  width={1200}
                  height={800}
                  className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                  <p className="text-[0.6875rem] uppercase tracking-[0.2em] text-cream/85">
                    {svc.kicker}
                  </p>
                  <h3 className="mt-1 font-display text-2xl text-cream md:text-3xl">
                    {svc.title}
                  </h3>
                  <p className="mt-2 max-w-md text-sm text-cream/85">{svc.summary}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="reveal">
            <Eyebrow>The crew</Eyebrow>
            <h2 className="display-section max-w-2xl">Named people, not a rotating roster.</h2>
          </div>
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((m) => (
              <article
                key={m.name}
                className="reveal rounded-xl border border-line bg-paper p-6"
              >
                <div className="flex size-12 items-center justify-center rounded-full bg-navy font-display text-lg text-cream">
                  {m.initials}
                </div>
                <h3 className="mt-5 font-display text-2xl">{m.name}</h3>
                <p className="text-xs uppercase tracking-[0.16em] text-red">{m.role}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{m.bio}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ReviewsBand />

      <section className="border-b border-line bg-cream py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Eyebrow>Guides</Eyebrow>
              <h2 className="display-section max-w-2xl">From the job, not a farm.</h2>
            </div>
            <Link
              to="/articles"
              className="inline-flex items-center gap-2 text-sm text-red"
            >
              All articles
              <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {latestArticles(3).map((a) => (
              <Link
                key={a.slug}
                to="/articles/$slug"
                params={{ slug: a.slug }}
                className="group block"
              >
                <div className="overflow-hidden rounded-xl">
                  <img
                    src={a.image}
                    srcSet={a.image.endsWith(".webp") ? `${a.image.replace(".webp", "-800.webp")} 800w, ${a.image} 1600w` : undefined}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    alt={a.alt}
                    width={800}
                    height={500}
                    className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <p className="mt-4 text-[0.6875rem] uppercase tracking-[0.18em] text-red">
                  {a.category}
                </p>
                <h3 className="mt-1 font-display text-2xl leading-snug">
                  {a.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Eyebrow>Neighborhoods</Eyebrow>
          <h2 className="display-section max-w-3xl">
            The Valley streets we actually drive.
          </h2>
          <p className="mt-4 max-w-xl text-muted">
            Four different housing stocks. The office stays on Ventura Blvd in
            Sherman Oaks.
          </p>
          <ul className="mt-12 grid gap-8 md:grid-cols-2">
            {coreLocations.map((location) => (
              <li key={location.path}>
                <Link to={location.path} className="group block">
                  <span className="font-display text-3xl group-hover:text-red">
                    {location.h1}
                  </span>
                  <span className="mt-2 block max-w-md text-sm leading-relaxed text-muted">
                    {location.lede}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <Link
            to="/service-areas"
            className="mt-10 inline-flex items-center gap-1 text-sm text-red underline underline-offset-2"
          >
            North Hollywood, Burbank, Glendale, the West Valley, and every other area we serve
            <ArrowRight className="size-3.5" aria-hidden />
          </Link>
        </div>
      </section>

      <section className="bg-paper py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Eyebrow>Questions</Eyebrow>
          <h2 className="display-section mb-12">Before you call.</h2>
          <FaqList />
        </div>
      </section>

      <section className="relative overflow-hidden">
        <img
          src="/images/exterior-800.webp"
          srcSet={webpSrcSet("/images/exterior.webp")}
          sizes="100vw"
          alt="Los Angeles hillside home"
          width={1600}
          height={1000}
          className="absolute inset-0 size-full object-cover"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-navy/72" />
        <div className="relative mx-auto max-w-7xl px-5 py-28 sm:px-8 md:py-36">
          <p className="flex items-center gap-2 text-[0.6875rem] uppercase tracking-[0.22em] text-cream/85">
            <Sparkle className="size-3 text-red" />
            Call anytime. We mean it.
          </p>
          <h2 className="display-section mt-4 max-w-3xl text-cream">
            The next guest is already on the way.
          </h2>
          <p className="mt-5 max-w-md text-cream/85">
            Quoted before we start. 24/7 from Sherman Oaks.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Magnetic>
              <Button asChild size="xl">
                <a href={`tel:${company.phoneTel}`}>{company.phoneDisplay}</a>
              </Button>
            </Magnetic>
            <Button asChild size="xl" variant="cream">
              <Link to="/quote">Request a quote</Link>
            </Button>
          </div>
          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-cream/85">
            {["Licensed", "Insured", "Bonded", "Pet friendly", "EPA products"].map(
              (item) => (
                <li key={item} className="flex items-center gap-2">
                  <Check className="size-4 text-red" />
                  {item}
                </li>
              ),
            )}
          </ul>
        </div>
      </section>
    </main>
  );
}
