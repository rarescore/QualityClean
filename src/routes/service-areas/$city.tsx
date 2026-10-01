import { createFileRoute, notFound } from "@tanstack/react-router";
import { LocationPage } from "@/components/site/location-page";
import { locationByPath } from "@/lib/locations";
import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/service-areas/$city")({
  loader: ({ params }) => {
    const page = locationByPath(`/service-areas/${params.city}`);
    if (!page) throw notFound();
    return { path: page.path };
  },
  head: ({ loaderData }) => {
    const page = loaderData ? locationByPath(loaderData.path) : undefined;
    if (!page) return {};
    return seoHead({
      title: page.title,
      description: page.description,
      path: page.path,
      image: page.image,
    });
  },
  component: ServiceAreaCityPage,
});

function ServiceAreaCityPage() {
  const { path } = Route.useLoaderData();
  const page = locationByPath(path);
  if (!page) return null;
  return <LocationPage page={page} />;
}
