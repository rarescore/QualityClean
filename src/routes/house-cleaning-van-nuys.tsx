import { createFileRoute } from "@tanstack/react-router";
import { LocationPage } from "@/components/site/location-page";
import { locationByPath } from "@/lib/locations";
import { seoHead } from "@/lib/seo";

const page = locationByPath("/house-cleaning-van-nuys");

export const Route = createFileRoute("/house-cleaning-van-nuys")({
  component: function VanNuysPage() {
    if (!page) return null;
    return <LocationPage page={page} />;
  },
  head: () =>
    seoHead({
      title: page?.title ?? "House Cleaning in Van Nuys",
      description: page?.description ?? "",
      path: "/house-cleaning-van-nuys",
      image: page?.image,
    }),
});
