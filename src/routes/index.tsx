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
  areas,
  services,
  proofs,
  hostTimeline,
  team,
  hostChecklist,
  turnoverProduct,
  sellable,
  versus,
  hostFails,
} from "@/lib/company";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => {
    const base = seoHead({
      title: "Extreme Quality Clean | Airbnb & Home Cleaning Los Angeles",
      description:
        "Los Angeles Airbnb turnovers, residential and commercial cleaning. Check-out at 11. Guest-ready at 3. 25 years. 24/7. Sherman Oaks.",
      path: "/",
      image: "/images/posters/hero-glass.webp",
    });
    return {
      meta: base.meta,
      links: [
        ...base.links,
        {
          rel: "preload",
          href: "/images/posters/hero-glass-800.webp",
          as: "image",
          type: "image/webp",
          media: "(max-width: 768px)",
        },
        {
          rel: "preload",
          href: "/images/posters/hero-glass.webp",
          as: "image",
          type: "image/webp",
          media: "(min-width: 769px)",
        },
        {
          rel: "preload",
          href: "/fonts/cormorant.woff2",
          as: "font",
          type: "font/woff2",
          crossOrigin: "anonymous",
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
      <section className="relative min-h-svh overflow-hidden bg-navy text-cream">
        <CinematicVideo
          src="/videos/hero-glass.mp4"
          mobileSrc="/videos/hero-glass-sm.mp4"
          poster="/images/posters/hero-glass.webp"
          alt="Spotless floor-to-ceiling glass over a Los Angeles hillside pool"
          priority
          className="absolute inset-0 size-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/55 to-navy/40" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-navy/70 to-transparent" />
        <div className="relative z-10 mx-auto flex min-h-svh max-w-7xl flex-col justify-end px-5 pb-16 pt-36 sm:px-8 md:pb-20">
          <Eyebrow tone="cream" className="rise-in">
            Los Angeles · Airbnb turnovers
          </Eyebrow>
          <h1 className="display-hero max-w-5xl text-cream">
            Check-out at <span className="display-num">11</span>.
            <br />
            <em>
              Guest-ready at <span className="display-num">3</span>.
            </em>
          </h1>
          <p className="rise-in-3 mt-6 max-w-xl text-base leading-relaxed text-cream/85 sm:text-lg">
            You are not buying hours. You are buying the next review.
            Hotel-standard turnovers for LA hosts — quoted in writing before we
            start.
          </p>
          <div className="rise-in-4 mt-8 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex flex-wrap items-center gap-3">
              <Magnetic>
                <Button asChild size="xl">
                  <Link to="/quote">
                    Book a turnover
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </Magnetic>
              <Button asChild size="xl" variant="invert">
                <Link to="/airbnb">See the product</Link>
              </Button>
            </div>
            <ClockLockup tone="cream" />
          </div>
          <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-cream/15 pt-6 max-w-xl">
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
      </section>

      <div className="overflow-hidden border-b border-line bg-cream py-3">
        <div className="marquee-track flex w-max gap-10 pr-10 text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-navy/70">
          {[...areas, ...areas].map((a, i) => (
            <span key={`${a}-${i}`} className="flex items-center gap-10">
              {a}
              <span className="spark-dot" aria-hidden />
            </span>
          ))}
        </div>
      </div>

      <section className="bg-paper py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="reveal max-w-3xl">
            <Eyebrow>{turnoverProduct.kicker}</Eyebrow>
            <h2 className="display-section">{turnoverProduct.name}.</h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
              {turnoverProduct.pitch}
            </p>
          </div>

          <div className="mt-14 grid gap-4 lg:grid-cols-12">
            <article className="reveal relative overflow-hidden rounded-xl bg-navy p-8 text-cream lg:col-span-7 lg:p-12">
              <p className="text-[0.6875rem] uppercase tracking-[0.2em] text-cream/80">
                Lead offer · Airbnb hosts
              </p>
              <p className="mt-4 font-sans text-6xl font-light leading-none tracking-tight md:text-7xl">
                <span className="tracking-[0.06em]">11:00</span>
                <span className="mx-3 font-light text-red">→</span>
                3:00
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

      <section className="bg-navy py-24 text-cream md:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="reveal max-w-3xl">
            <Eyebrow tone="cream">Why hosts pay us</Eyebrow>
            <h2 className="display-section">
              Listings don’t lose stars on the square footage.
            </h2>
          </div>
          <div className="mt-14 grid gap-px bg-cream/10 md:grid-cols-3">
            {hostFails.map((item) => (
              <article key={item.title} className="reveal bg-navy p-8">
                <Sparkle className="size-4 text-red" />
                <h3 className="mt-6 font-display text-3xl">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-cream/85">{item.text}</p>
              </article>
            ))}
          </div>
          <p className="reveal mt-12 max-w-2xl font-display text-2xl leading-snug md:text-3xl">
            One 3-star review can cost a Superhost badge. A typical turnover is
            less than a night’s rent. That is the product.
          </p>
        </div>
      </section>

      <TheWindow />

      <section className="bg-cream py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="reveal">
            <Eyebrow>On the clock</Eyebrow>
            <h2 className="display-section max-w-3xl">Four hours. One crew. No mystery.</h2>
          </div>
          <div className="mt-14 grid gap-px bg-line md:grid-cols-4">
            {hostTimeline.map((step) => (
              <article key={step.time} className="bg-cream p-6 md:p-8">
                <p className="font-sans text-3xl font-light tabular-nums tracking-tight text-red md:text-4xl">
                  {step.time}
                </p>
                <h3 className="mt-4 font-display text-2xl">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{step.text}</p>
              </article>
            ))}
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

      <section className="border-b border-line bg-paper py-24 md:py-32" id="quote">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="reveal">
            <Eyebrow>Buy it</Eyebrow>
            <h2 className="display-section max-w-3xl">Tell us the rooms. We’ll quote first.</h2>
            <p className="mt-5 max-w-xl text-muted">
              No published rates. The number we stand behind is the one we give
              before a crew is booked. Call if it is same-day — we pick up at
              night.
            </p>
          </div>
          <div className="mt-12 rounded-xl border border-line bg-cream p-5 shadow-card sm:p-10">
            <QuoteForm />
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
