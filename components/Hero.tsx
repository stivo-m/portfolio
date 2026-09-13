import Link from "next/link";
import { site } from "@/lib/content";

export function Hero() {
  return (
    <section className="mx-auto flex min-h-[78vh] max-w-6xl flex-col justify-center px-6 py-24 md:py-32">
      <p className="mb-6 text-sm font-medium uppercase tracking-[0.25em] text-muted">
        {site.location} · Full-stack systems
      </p>
      <h1 className="max-w-5xl text-6xl font-semibold tracking-[-0.06em] text-foreground md:text-8xl">
        I build reliable software for complex, real-world operations.
      </h1>
      <p className="mt-8 max-w-3xl text-xl leading-9 text-muted md:text-2xl">
        {site.summary} My work spans field-sales platforms, risk engines, mobile products,
        infrastructure, hardware integrations, and AI-enabled developer workflows.
      </p>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Link href="/case-studies" className="rounded-full bg-accent px-6 py-3 text-center text-sm font-semibold !text-white no-underline transition-transform hover:-translate-y-0.5">
          View case studies
        </Link>
        <Link href="/experience" className="rounded-full border border-line px-6 py-3 text-center text-sm font-semibold text-foreground no-underline transition-colors hover:bg-surface">
          See experience
        </Link>
      </div>
    </section>
  );
}
