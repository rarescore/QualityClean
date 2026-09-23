import { company, reviews } from "@/lib/company";
import { Eyebrow } from "@/components/site/marks";

function Stars({ n }: { n: number }) {
  return (
    <p className="font-sans text-sm tracking-[0.28em] text-cream" aria-label={`${n} out of 5 stars`}>
      {"★".repeat(n)}
      <span className="text-cream/40" aria-hidden>
        {"★".repeat(5 - n)}
      </span>
    </p>
  );
}

export function ReviewsBand() {
  const g = company.ratings.google;
  const filled = Math.round(g.value);

  return (
    <section id="reviews" className="bg-navy py-24 text-cream md:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
          <div>
            <Eyebrow tone="cream">Proof</Eyebrow>
            <p className="font-sans text-[clamp(4.5rem,10vw,8rem)] font-light leading-none tracking-tight tabular-nums">
              {g.value.toFixed(1)}
            </p>
            <div className="mt-3">
              <Stars n={filled} />
            </div>
            <p className="mt-3 text-sm text-cream/85">
              {g.value.toFixed(1)} from {g.count} Google reviews
            </p>
          </div>
          <div className="max-w-md">
            <h2 className="font-display text-3xl md:text-4xl">
              Named people. Read them where they were written.
            </h2>
            <a
              href={company.social.google}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex h-11 items-center rounded-full border border-cream/25 px-5 text-sm text-cream transition-colors hover:border-red"
            >
              Read all {g.count} on Google
            </a>
          </div>
        </div>

        <div className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r) => (
            <article
              key={`${r.name}-${r.text.slice(0, 24)}`}
              className="flex flex-col justify-between rounded-xl border border-cream/15 p-7"
            >
              <div>
                <Stars n={r.stars} />
                <p className="mt-5 font-display text-2xl leading-snug">“{r.text}”</p>
              </div>
              <p className="mt-8 text-[0.6875rem] uppercase tracking-[0.18em] text-cream/80">
                {r.name} · Google
              </p>
            </article>
          ))}
          <a
            href={company.social.google}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col justify-between rounded-xl border border-red/40 bg-red/10 p-7 transition-colors hover:bg-red/16"
          >
            <div>
              <Stars n={5} />
              <p className="mt-5 font-display text-2xl leading-snug">
                The rest of the five-star set lives on Google.
              </p>
            </div>
            <p className="mt-8 text-[0.6875rem] uppercase tracking-[0.18em] text-cream/85">
              Open all {g.count} Google reviews →
            </p>
          </a>
        </div>
      </div>
    </section>
  );
}
