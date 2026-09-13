import Link from "next/link";
import { Hero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { caseStudies, highlights } from "@/lib/content";

export default function Home() {
  return (
    <>
      <Hero />
      <Section className="border-t border-line bg-surface">
        <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
          <div className="max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">How I work</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] md:text-6xl">Technical depth, connected to outcomes.</h2>
          </div>
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {highlights.map((highlight, index) => (
              <article key={highlight.title} className="rounded-[28px] bg-white p-8 shadow-sm">
                <span className="text-sm text-muted">0{index + 1}</span>
                <h3 className="mt-12 text-2xl font-semibold tracking-tight">{highlight.title}</h3>
                <p className="mt-4 leading-7 text-muted">{highlight.description}</p>
              </article>
            ))}
          </div>
        </div>
      </Section>
      <Section>
        <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">Selected work</p>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] md:text-6xl">The details matter.</h2>
            </div>
            <Link href="/case-studies" className="text-sm font-semibold text-accent">Explore all case studies →</Link>
          </div>
          <div className="mt-16 grid gap-4 md:grid-cols-2">
            {caseStudies.slice(0, 4).map((study) => (
              <Link key={study.slug} href={`/case-studies/${study.slug}`} className="group rounded-[28px] border border-line p-8 transition-all hover:-translate-y-1 hover:border-foreground hover:shadow-md">
                <div className="flex items-start justify-between gap-4">
                  <span className="text-sm text-muted">Case study</span>
                  <span className="text-xl transition-transform group-hover:translate-x-1">↗</span>
                </div>
                <h3 className="mt-16 max-w-lg text-2xl font-semibold tracking-tight md:text-3xl">{study.title}</h3>
                <p className="mt-4 max-w-xl leading-7 text-muted">{study.summary}</p>
                <div className="mt-8 flex flex-wrap gap-2">
                  {study.tags.map((tag) => <span key={tag} className="rounded-full bg-surface px-3 py-1 text-xs text-muted">{tag}</span>)}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Section>
      <section className="bg-foreground text-white">
        <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-white/50">Let&apos;s build something useful</p>
          <h2 className="mt-6 max-w-3xl text-5xl font-semibold tracking-[-0.05em] md:text-7xl">Have a hard problem? I&apos;d like to hear about it.</h2>
          <Link href="/contact" className="mt-10 inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold !text-black transition-transform hover:-translate-y-0.5">Start a conversation</Link>
        </div>
      </section>
    </>
  );
}
