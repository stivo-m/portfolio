"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/experience", label: "Experience" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-white/95 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-sm font-semibold tracking-tight text-foreground no-underline" onClick={() => setOpen(false)}>
          Steven Maina
        </Link>
        <div className="hidden items-center gap-8 text-sm text-muted md:flex">
          {links.map((link) => {
            const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className="no-underline transition-colors hover:text-foreground"
                style={{ color: active ? "var(--foreground)" : "var(--muted)", fontWeight: active ? 600 : 400 }}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="hidden rounded-full bg-foreground px-4 py-2 text-sm font-medium !text-white no-underline transition-transform hover:-translate-y-0.5 sm:inline-flex"
          >
            Let&apos;s talk
          </Link>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-foreground md:hidden"
            onClick={() => setOpen((current) => !current)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <span aria-hidden className="text-lg leading-none">{open ? "×" : "☰"}</span>
          </button>
        </div>
      </nav>
      {open && (
        <div id="mobile-navigation" className="border-t border-line/70 px-6 py-4 md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-1 text-sm">
            {links.map((link) => {
              const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-xl px-3 py-3 no-underline transition-colors hover:bg-surface"
                  style={{ color: active ? "var(--foreground)" : "var(--muted)", fontWeight: active ? 600 : 400 }}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
