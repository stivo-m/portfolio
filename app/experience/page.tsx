import { experience, skills } from "@/lib/content";

export const metadata = { title: "Experience" };

export default function ExperiencePage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <div className="max-w-3xl">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">Experience</p>
        <h1 className="mt-5 text-5xl font-semibold tracking-[-0.06em] md:text-8xl">Shipping production systems that hold up.</h1>
        <p className="mt-8 text-xl leading-9 text-muted">A resume-aligned timeline of the roles, platforms, and outcomes behind the work.</p>
      </div>
      <section className="mt-20 grid gap-8 lg:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          {experience.map((job) => (
            <article key={`${job.company}-${job.period}`} className="rounded-[28px] border border-line p-8">
              <div className="flex flex-col justify-between gap-3 md:flex-row">
                <div>
                  <h2 className="text-2xl font-semibold tracking-tight">{job.role}</h2>
                  <p className="mt-1 text-muted">{job.company}{job.location ? ` · ${job.location}` : ""}</p>
                </div>
                <p className="text-sm text-muted">{job.period}</p>
              </div>
              <ul className="mt-8 space-y-3 text-muted">
                {job.bullets.map((bullet) => <li key={bullet} className="leading-7">• {bullet}</li>)}
              </ul>
            </article>
          ))}
        </div>
        <aside className="h-fit rounded-[28px] bg-surface p-8 lg:sticky lg:top-28">
          <h2 className="text-2xl font-semibold tracking-tight">Core skills</h2>
          <div className="mt-6 flex flex-wrap gap-2">
            {skills.map((skill) => <span key={skill} className="rounded-full bg-white px-3 py-2 text-sm text-muted shadow-sm">{skill}</span>)}
          </div>
        </aside>
      </section>
    </div>
  );
}
