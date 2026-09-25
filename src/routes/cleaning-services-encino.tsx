import { createFileRoute } from "@tanstack/react-router";
import { LocationPage } from "@/components/site/location-page";
import { locationByPath } from "@/lib/locations";
import { seoHead } from "@/lib/seo";

const page = locationByPath("/cleaning-services-encino");

export const Route = createFileRoute("/cleaning-services-encino")({
  component: function EncinoPage() {
    if (!page) return null;
    return <LocationPage page={page} />;
  },
  head: () =>
    seoHead({
      title: page?.title ?? "Cleaning Services in Encino",
      description: page?.description ?? "",
      path: "/cleaning-services-encino",
      image: page?.image,
    }),
});
