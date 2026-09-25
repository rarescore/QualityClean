import { createFileRoute } from "@tanstack/react-router";
import { LocationPage } from "@/components/site/location-page";
import { locationByPath } from "@/lib/locations";
import { seoHead } from "@/lib/seo";

const page = locationByPath("/house-cleaning-sherman-oaks");

export const Route = createFileRoute("/house-cleaning-sherman-oaks")({
  component: function ShermanOaksPage() {
    if (!page) return null;
    return <LocationPage page={page} />;
  },
  head: () =>
    seoHead({
      title: page?.title ?? "House Cleaning in Sherman Oaks",
      description: page?.description ?? "",
      path: "/house-cleaning-sherman-oaks",
      image: page?.image,
    }),
});
