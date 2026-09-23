import { createFileRoute, notFound } from "@tanstack/react-router";

export const Route = createFileRoute("/$")({
  loader: () => {
    throw notFound();
  },
  head: () => ({
    meta: [
      { title: "Page not found | Extreme Quality Clean" },
      { name: "robots", content: "noindex, follow" },
      { name: "description", content: "That page is gone. Try home, the guides, or a quote." },
    ],
  }),
});
