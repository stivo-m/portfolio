import { CaseStudyCard } from "@/components/CaseStudyCard";
import { caseStudies } from "@/lib/content";

export const metadata = { title: "Case Studies" };

export default function CaseStudiesPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <div className="max-w-3xl">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">Case studies</p>
        <h1 className="mt-5 text-5xl font-semibold tracking-[-0.06em] md:text-8xl">How the work actually works.</h1>
        <p className="mt-8 text-xl leading-9 text-muted">Deep dives into the architecture, decisions, trade-offs, and outcomes behind the systems I&apos;ve built.</p>
      </div>
      <div className="mt-20 grid gap-4 md:grid-cols-2">{caseStudies.map((study, index) => <CaseStudyCard key={study.slug} {...study} index={index} />)}</div>
    </div>
  );
}
