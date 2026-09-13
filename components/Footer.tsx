import Link from "next/link";
import { site } from "@/lib/content";

export function Footer() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 text-sm text-muted md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} {site.name}. Built with Next.js.</p>
        <div className="flex gap-5">
          <a href={`mailto:${site.email}`} className="hover:text-foreground">Email</a>
          <a href={site.linkedin} target="_blank" rel="noreferrer" className="hover:text-foreground">LinkedIn</a>
          <Link href="/case-studies" className="hover:text-foreground">Case studies</Link>
        </div>
      </div>
    </footer>
  );
}
