import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/site/marks";
import { SmartImg } from "@/components/site/smart-img";
import { company, team, values } from "@/lib/company";
import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () =>
    seoHead({
      title: "About Extreme Quality Clean | Sherman Oaks, Los Angeles",
      description:
        "25 years of licensed, insured, bonded cleaning in greater Los Angeles. Pet-friendly, EPA-approved products, 24/7 crews from Sherman Oaks.",
      path: "/about",
      image: "/images/hands.webp",
    }),
});

function AboutPage() {
  return (
    <main className="pb-16 md:pb-0">
      <section className="border-b border-line bg-cream py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Eyebrow>Since the mid-nineties</Eyebrow>
          <h1 className="max-w-3xl font-display text-5xl leading-tight md:text-7xl">
            A Sherman Oaks company that still answers the phone.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            We have covered greater Los Angeles County for over {company.years}{" "}
            years — 24 hours a day, 7 days a week — under full license,
            insurance, and bond. The work has always been the same: treat the
            room as ours, quote before we start, leave it better than the
            brief.
          </p>
        </div>
      </section>

      <section className="bg-paper py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-2">
          <div>
            <Eyebrow>From the owner</Eyebrow>
            <div className="space-y-4 font-display text-2xl leading-snug text-ink md:text-3xl">
              <p>
                There is no job too big or too small. Our technicians handle
                ordinary Tuesdays and genuine emergencies with the same
                attitude.
              </p>
              <p className="text-muted">
                It is my duty to teach the crew to work hard and still enjoy
                the day. Twice a week we sit down on safety and how to keep
                you satisfied. After work we check every tool so the next
                morning starts honest.
              </p>
              <p>
                People are treated with respect here. Honesty is the
                priority. There are many cleaning companies in Los Angeles. It
                is hard to find one that takes pride and tells you the price
                first.
              </p>
            </div>
          </div>
          <div className="grid gap-4">
            <SmartImg
              src="/images/hands.webp"
              alt="Crew detailing marble in a Los Angeles home"
              className="aspect-[4/3] w-full rounded-xl"
              width={900}
              height={675}
            />
            <SmartImg
              src="/images/night.webp"
              alt="A Los Angeles home after hours — we still come"
              className="aspect-[16/9] w-full rounded-xl"
              width={960}
              height={540}
            />
          </div>
        </div>
      </section>

      <section className="bg-navy py-20 text-cream md:py-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Eyebrow tone="cream">How we work</Eyebrow>
          <div className="mt-8 grid gap-px bg-cream/10 sm:grid-cols-2">
            {values.map((v) => (
              <article key={v.title} className="bg-navy p-6 md:p-8">
                <h2 className="font-display text-3xl">{v.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-cream/85">
                  {v.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Eyebrow>The people</Eyebrow>
          <h2 className="max-w-xl font-display text-4xl md:text-5xl">
            Health first. Then the corners.
          </h2>
          <p className="mt-4 max-w-xl text-muted">
            The staff on this page have been in the work for years. We use
            protection gear — eyewear, gloves, boots — and EPA-approved
            chemistry that is safe around pets and people.
          </p>
          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {team.map((m) => (
              <article
                key={m.name}
                className="flex gap-5 rounded-xl border border-line bg-paper p-6"
              >
                <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-navy font-display text-xl text-cream">
                  {m.initials}
                </div>
                <div>
                  <h3 className="font-display text-2xl">{m.name}</h3>
                  <p className="text-xs uppercase tracking-[0.16em] text-red">
                    {m.role}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {m.bio}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper py-16 md:py-24">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-5 sm:px-8 md:flex-row md:items-center">
          <div>
            <h2 className="font-display text-4xl">Come see the work.</h2>
            <p className="mt-2 text-muted">
              {company.address.line1}, {company.address.city}. Or just call.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg">
              <a href={`tel:${company.phoneTel}`}>{company.phoneDisplay}</a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/quote">Request a quote</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
