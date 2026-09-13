import Link from "next/link";

type Props = { slug: string; title: string; summary: string; tags: string[]; index?: number };

export function CaseStudyCard({ slug, title, summary, tags, index = 0 }: Props) {
  return (
    <Link href={`/case-studies/${slug}`} className="group flex min-h-[360px] flex-col rounded-[28px] border border-line p-8 transition-all hover:-translate-y-1 hover:border-foreground hover:shadow-md">
      <div className="flex items-start justify-between text-sm text-muted"><span>0{index + 1}</span><span className="text-xl transition-transform group-hover:translate-x-1">↗</span></div>
      <div className="mt-auto">
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{title}</h2>
        <p className="mt-4 leading-7 text-muted">{summary}</p>
        <div className="mt-7 flex flex-wrap gap-2">{tags.map((tag) => <span key={tag} className="rounded-full bg-surface px-3 py-1 text-xs text-muted">{tag}</span>)}</div>
      </div>
    </Link>
  );
}
