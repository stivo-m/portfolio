import Link from "next/link";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import { caseStudies } from "@/lib/content";
import { getCaseStudy } from "@/lib/mdx";

export function generateStaticParams() { return caseStudies.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = caseStudies.find((item) => item.slug === slug);
  return study ? { title: study.title, description: study.summary } : {};
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = caseStudies.find((item) => item.slug === slug);
  if (!study) notFound();
  const { content } = await getCaseStudy(slug);
  const { content: rendered } = await compileMDX({ source: content });
  return (
    <article className="mx-auto max-w-4xl px-6 py-24 md:py-32">
      <Link href="/case-studies" className="text-sm font-medium text-accent">← All case studies</Link>
      <header className="mt-12 border-b border-line pb-16">
        <div className="flex flex-wrap gap-2">{study.tags.map((tag) => <span key={tag} className="rounded-full bg-surface px-3 py-1 text-xs text-muted">{tag}</span>)}</div>
        <h1 className="mt-8 text-5xl font-semibold tracking-[-0.06em] md:text-7xl">{study.title}</h1>
        <p className="mt-8 max-w-2xl text-xl leading-9 text-muted">{study.summary}</p>
      </header>
      <div className="prose-portfolio mt-16">{rendered}</div>
    </article>
  );
}
