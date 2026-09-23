import { createFileRoute } from "@tanstack/react-router";
import { QuoteForm } from "@/components/site/quote-form";
import { Eyebrow } from "@/components/site/marks";
import { company } from "@/lib/company";
import type { ServiceId } from "@/lib/estimate";
import { serviceOptions } from "@/lib/estimate";
import { seoHead } from "@/lib/seo";

type QuoteSearch = {
  service?: string;
};

export const Route = createFileRoute("/quote")({
  validateSearch: (search: Record<string, unknown>): QuoteSearch => ({
    service: typeof search.service === "string" ? search.service : undefined,
  }),
  component: QuotePage,
  head: () =>
    seoHead({
      title: "Request a Cleaning Quote | Extreme Quality Clean",
      description:
        "Request a quote for Airbnb turnovers, home, or commercial cleaning in Los Angeles. Price before we start. Call (818) 294-3141 24/7.",
      path: "/quote",
    }),
});

function QuotePage() {
  const { service } = Route.useSearch();
  const defaultService = serviceOptions.some((s) => s.id === service)
    ? (service as ServiceId)
    : "airbnb";

  return (
    <main className="pb-16 md:pb-0">
      <section className="border-b border-line bg-cream py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Eyebrow>Quote</Eyebrow>
          <h1 className="display-section max-w-3xl">
            Tell us the rooms. We’ll quote before we start.
          </h1>
          <p className="mt-4 max-w-xl text-muted">
            No published rates. You get the number in writing before a crew is
            booked. Call{" "}
            <a href={`tel:${company.phoneTel}`} className="text-red underline underline-offset-2">
              {company.phoneDisplay}
            </a>{" "}
            if it is same-day — we pick up at night.
          </p>
        </div>
      </section>
      <section className="bg-paper py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="min-h-[36rem] rounded-xl border border-line bg-cream p-5 shadow-card sm:p-8">
            <QuoteForm key={defaultService} defaultService={defaultService} />
          </div>
        </div>
      </section>
    </main>
  );
}
