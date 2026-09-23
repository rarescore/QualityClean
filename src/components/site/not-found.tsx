import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function NotFound() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center bg-cream px-5 py-24 text-center">
      <p className="text-[0.6875rem] uppercase tracking-[0.2em] text-red">
        404
      </p>
      <h1 className="mt-4 font-display text-5xl leading-tight md:text-7xl">
        That page is gone.
      </h1>
      <p className="mt-5 max-w-md text-muted">
        The listing still needs a turnover, though. Try home, the guides, or a
        quote.
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        <Button asChild>
          <Link to="/">
            Home
            <ArrowRight className="size-4" />
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/articles">Guides</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/quote">Request a quote</Link>
        </Button>
      </div>
    </main>
  );
}
