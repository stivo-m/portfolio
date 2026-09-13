import { ContactForm } from "@/components/ContactForm";
import { site } from "@/lib/content";

export const metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <div className="mx-auto grid max-w-6xl gap-16 px-6 py-24 md:py-32 lg:grid-cols-[0.9fr_1.1fr]">
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">Contact</p>
        <h1 className="mt-5 text-5xl font-semibold tracking-[-0.06em] md:text-7xl">Let&apos;s talk about the system you need built.</h1>
        <p className="mt-8 text-xl leading-9 text-muted">I&apos;m open to senior full-stack, lead engineering, platform, and product-minded engineering roles.</p>
        <div className="mt-10 space-y-3 text-muted">
          <p><a className="text-accent" href={`mailto:${site.email}`}>{site.email}</a></p>
          <p><a className="text-accent" href={site.linkedin} target="_blank" rel="noreferrer">LinkedIn profile</a></p>
          <p><a className="text-accent" href={site.github} target="_blank" rel="noreferrer">GitHub profile</a></p>
          <p>{site.location}</p>
        </div>
      </div>
      <ContactForm />
    </div>
  );
}
