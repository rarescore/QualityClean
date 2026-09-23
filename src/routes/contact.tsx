import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/site/marks";
import { QuoteForm } from "@/components/site/quote-form";
import { SocialLinks } from "@/components/site/social-links";
import { areas, company } from "@/lib/company";
import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () =>
    seoHead({
      title: "Contact Extreme Quality Clean | Sherman Oaks, CA",
      description:
        "Call (818) 294-3141 anytime. 15130 Ventura Blvd, Sherman Oaks. Airbnb, home, and commercial cleaning across greater Los Angeles.",
      path: "/contact",
    }),
});

function ContactPage() {
  return (
    <main className="pb-16 md:pb-0">
      <section className="border-b border-line bg-navy py-20 text-cream md:py-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Eyebrow tone="cream">Contact</Eyebrow>
          <h1 className="max-w-3xl font-display text-5xl leading-tight md:text-7xl">
            Call anytime. We mean the 24 hours.
          </h1>
          <p className="mt-5 max-w-xl text-cream/85">
            A quote, a same-day turnover, a carpet emergency, or a question
            about products. Someone picks up.
          </p>
          <div className="mt-10">
            <Button asChild size="lg" variant="primary">
              <a href={`tel:${company.phoneTel}`}>{company.phoneDisplay}</a>
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-paper py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-4 px-5 sm:px-8 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: Phone,
              label: "Phone",
              value: company.phoneDisplay,
              href: `tel:${company.phoneTel}`,
            },
            {
              icon: Mail,
              label: "Email",
              value: company.email,
              href: `mailto:${company.email}`,
            },
            {
              icon: MapPin,
              label: "Studio",
              value: `${company.address.line1}, ${company.address.city}`,
              href: company.address.maps,
            },
            {
              icon: Clock,
              label: "Hours",
              value: "24 hours, 7 days",
              href: undefined,
            },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-xl border border-line bg-cream p-6"
            >
              <item.icon className="size-5 text-red" aria-hidden />
              <p className="mt-4 text-[0.6875rem] uppercase tracking-[0.18em] text-muted">
                {item.label}
              </p>
              {item.href ? (
                <a
                  href={item.href}
                  className="mt-1 block font-display text-2xl leading-snug text-ink hover:text-red"
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                >
                  {item.value}
                </a>
              ) : (
                <p className="mt-1 font-display text-2xl leading-snug">
                  {item.value}
                </p>
              )}
            </div>
          ))}
        </div>
        <div className="mx-auto mt-8 max-w-6xl px-5 sm:px-8">
          <SocialLinks />
        </div>
        <div className="mx-auto mt-8 max-w-6xl px-5 sm:px-8">
          <address className="rounded-xl border border-line bg-cream p-6 not-italic md:p-8">
            <Eyebrow>Studio</Eyebrow>
            <h2 className="font-display text-3xl md:text-4xl">
              {company.address.line1}
            </h2>
            <p className="mt-2 text-muted">
              {company.address.city}, {company.address.state} {company.address.zip}
            </p>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">
              Sherman Oaks base. We drive Van Nuys, Encino, Studio City, North
              Hollywood, Reseda, and the rest of greater Los Angeles. Statewide
              work is quoted case by case.
            </p>
            <div className="mt-6">
              <Button asChild variant="outline">
                <a
                  href={company.address.maps}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open in Google Maps
                </a>
              </Button>
            </div>
          </address>
        </div>
      </section>

      <section className="bg-cream py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Eyebrow>Service area</Eyebrow>
          <h2 className="font-display text-4xl md:text-5xl">
            Greater Los Angeles, from a Sherman Oaks base.
          </h2>
          <p className="mt-4 max-w-xl text-muted">
            Statewide work is quoted case by case. These are the neighborhoods
            we drive every week — house cleaning, Airbnb turnovers, offices,
            carpet, and glass.
          </p>
          <ul className="mt-10 flex flex-wrap gap-2">
            {areas.map((a) => (
              <li
                key={a}
                className="rounded-full border border-line bg-paper px-3 py-1.5 text-sm"
              >
                {a}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-paper py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <Eyebrow>Write to us</Eyebrow>
              <h2 className="font-display text-4xl">Or send the rooms here.</h2>
            </div>
            <Link to="/quote" className="text-sm text-red hover:underline">
              Open the full quote page
            </Link>
          </div>
          <div className="mt-8 rounded-xl border border-line bg-cream p-5 sm:p-8">
            <QuoteForm />
          </div>
        </div>
      </section>
    </main>
  );
}
