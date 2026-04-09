import Link from "next/link";
import { ProjectCover } from "@/components/projects/ProjectCover";

export type ProjectSection = {
  id: string;
  title: string;
  paragraphs?: string[];
  bullets?: string[];
};

export type ProjectLink = {
  label: string;
  href: string;
};

export type ProjectDetailModel = {
  slug: string;
  title: string;
  coverLabel: string;
  coverSrc: string;
  summary: string;
  pitch: string;
  outcomes: string[];
  tags: string[];
  accent: string;
  links: ProjectLink[];
  highlights: string[];
  sections: ProjectSection[];
};

type Props = {
  project: ProjectDetailModel;
};

export function ProjectDetail({ project }: Props) {
  return (
    <main className="min-h-screen px-6 py-14">
      <div className="mx-auto max-w-5xl space-y-10">
        <header className="relative overflow-hidden rounded-3xl border border-white/15 bg-white/[0.07] p-6 backdrop-blur-sm sm:p-8">
          <div
            className={`pointer-events-none absolute -inset-24 opacity-70 blur-3xl bg-gradient-to-br ${project.accent}`}
            aria-hidden
          />
          <div className="relative grid gap-6 lg:grid-cols-[1fr_360px] lg:items-start">
            <div className="space-y-4">
              <p className="text-sm text-white/60">
                <Link href="/projects" className="hover:text-white">
                  ← Projets
                </Link>
              </p>
              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                {project.title}
              </h1>
              <p className="max-w-3xl text-sm leading-relaxed text-white/70">
                {project.summary}
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {project.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/15 bg-white/[0.07] px-2.5 py-1 text-xs text-white/75"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-3 pt-2">
                {project.links.map((l) => (
                  <a
                    key={l.href}
                    className="inline-flex rounded-xl bg-white px-4 py-2 text-sm font-medium text-black hover:bg-white/90"
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {l.label} →
                  </a>
                ))}
              </div>
            </div>

            <div className="hidden lg:block">
              <ProjectCover
                label={project.coverLabel}
                accent={project.accent}
                src={project.coverSrc}
                size="hero"
              />
            </div>
          </div>
        </header>

        <div className="grid gap-8 lg:grid-cols-[1fr_260px] lg:items-start">
          <div className="space-y-8">
            <section className="space-y-3">
              <h2 className="text-lg font-semibold">À retenir</h2>
              <ul className="grid gap-3 sm:grid-cols-2">
                {project.highlights.map((h) => (
                  <li
                    key={h}
                    className="transition-smooth rounded-2xl border border-white/15 bg-white/[0.07] p-4 text-sm text-white/75 duration-200 ease-out hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.11] hover:shadow-lg hover:shadow-black/20"
                  >
                    {h}
                  </li>
                ))}
              </ul>
            </section>

            {project.sections.map((s) => (
              <section
                key={s.id}
                id={s.id}
                className="transition-smooth rounded-3xl border border-white/15 bg-white/[0.07] p-5 duration-200 ease-out hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.11] hover:shadow-lg hover:shadow-black/20 sm:p-6"
              >
                <div className="space-y-3">
                  <h2 className="text-lg font-semibold">{s.title}</h2>
                  {s.paragraphs?.map((p) => (
                    <p key={p} className="text-sm leading-relaxed text-white/70">
                      {p}
                    </p>
                  ))}
                  {s.bullets && (
                    <ul className="list-disc space-y-2 pl-5 text-sm text-white/75">
                      {s.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </section>
            ))}
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-6 rounded-2xl border border-white/15 bg-white/[0.07] p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-white/60">
                Sommaire
              </p>
              <nav className="mt-3 space-y-2 text-sm">
                {project.sections.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="block text-white/70 hover:text-white"
                  >
                    {s.title}
                  </a>
                ))}
              </nav>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

