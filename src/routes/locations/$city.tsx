import { createFileRoute, notFound } from "@tanstack/react-router";
import { thinLocationBySlug } from "@/lib/strip-locations";
import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/locations/$city")({
  loader: ({ params }) => {
    const page = thinLocationBySlug(params.city);
    if (!page) throw notFound();
    return page;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const title = `${loaderData.service} in ${loaderData.city}`;
    return seoHead({
      title: `${title} | Extreme Quality Clean`,
      description: loaderData.body,
      path: `/locations/${loaderData.slug}`,
    });
  },
  component: ThinLocationPage,
});

function ThinLocationPage() {
  const page = Route.useLoaderData();
  return (
    <main>
      <section className="border-b border-line bg-cream py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <h1 className="font-display text-5xl leading-tight md:text-6xl">
            {page.service} in {page.city}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted">{page.body}</p>
        </div>
      </section>
    </main>
  );
}
