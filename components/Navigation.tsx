import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/experience", label: "Experience" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navigation() {
  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-white/95 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-sm font-semibold tracking-tight">
          Steven Maina
        </Link>
        <div className="hidden items-center gap-8 text-sm text-muted md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="transition-colors hover:text-foreground">
              {link.label}
            </Link>
          ))}
        </div>
        <Link
          href="/contact"
          className="rounded-full bg-foreground px-4 py-2 text-sm font-medium text-white transition-transform hover:-translate-y-0.5"
        >
          Let&apos;s talk
        </Link>
      </nav>
    </header>
  );
}
