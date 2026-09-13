import { skills, stats } from "@/lib/content";

export const metadata = { title: "About" };

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <div className="grid gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">About</p>
          <h1 className="mt-5 text-5xl font-semibold tracking-[-0.06em] md:text-8xl">I like systems that hold up under real use.</h1>
        </div>
        <div className="space-y-6 text-xl leading-9 text-muted">
          <p>I&apos;m a full-stack software engineer based in Nairobi, with experience across web, mobile, backend, cloud infrastructure, data-heavy systems, hardware integrations, and AI-assisted workflows.</p>
          <p>The pattern across my work is ownership: understand the business problem, pick the boring architecture that can survive production, build the user-facing surface with care, and make the operational path observable.</p>
          <p>I&apos;ve led teams, mentored engineers, reported directly to founders and executives, and delivered systems where performance, reliability, cost, and user trust all matter.</p>
        </div>
      </div>
      <div className="mt-20 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{stats.map((stat) => <div key={stat.label} className="rounded-[24px] bg-surface p-6"><div className="text-3xl font-semibold tracking-tight">{stat.value}</div><p className="mt-2 text-sm text-muted">{stat.label}</p></div>)}</div>
      <section className="mt-24 rounded-[32px] bg-foreground p-8 text-white md:p-12">
        <h2 className="text-4xl font-semibold tracking-[-0.04em]">What I work with</h2>
        <div className="mt-8 flex flex-wrap gap-3">{skills.map((skill) => <span key={skill} className="rounded-full bg-white/10 px-4 py-2 text-sm text-white/80">{skill}</span>)}</div>
      </section>
    </div>
  );
}
