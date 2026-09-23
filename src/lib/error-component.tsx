import type { ErrorComponentProps } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";

const FALLBACK_MESSAGE = "Something broke on this page. Try home, or call us.";

function errorMessage(error: unknown): string {
  if (error instanceof Error && error.message) return error.message;
  if (typeof error === "string" && error) return error;
  return FALLBACK_MESSAGE;
}

export function AppErrorComponent({ error }: ErrorComponentProps) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-cream px-6 py-24 text-center text-ink">
      <p className="text-[0.6875rem] uppercase tracking-[0.2em] text-red">
        Error
      </p>
      <h1 className="mt-4 font-display text-4xl md:text-6xl">
        This page hiccuped.
      </h1>
      <p className="mt-5 max-w-md text-sm leading-relaxed text-muted">
        {errorMessage(error)}
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm">
        <Link to="/" className="text-red hover:underline">
          Home
        </Link>
        <Link to="/articles" className="text-red hover:underline">
          Guides
        </Link>
        <a href="tel:+18182943141" className="text-red hover:underline">
          (818) 294-3141
        </a>
      </div>
    </main>
  );
}
