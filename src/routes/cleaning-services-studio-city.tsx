import { createFileRoute } from "@tanstack/react-router";
import { LocationPage } from "@/components/site/location-page";
import { locationByPath } from "@/lib/locations";
import { seoHead } from "@/lib/seo";

const page = locationByPath("/cleaning-services-studio-city");

export const Route = createFileRoute("/cleaning-services-studio-city")({
  component: function StudioCityPage() {
    if (!page) return null;
    return <LocationPage page={page} />;
  },
  head: () =>
    seoHead({
      title: page?.title ?? "Cleaning Services in Studio City",
      description: page?.description ?? "",
      path: "/cleaning-services-studio-city",
      image: page?.image,
    }),
});
