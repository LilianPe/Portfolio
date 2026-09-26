import { ProjectDetailModel } from "@/data/projects";
import { forwardRef, useLayoutEffect, useRef, useState } from "react";
import { MediaItem } from "./MediaItem";

type Props = {
  title: string;
  projects: ProjectDetailModel[];
};

type FilterKey = "all" | "fullstack" | "ia" | "systemes" | "jeu";

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "all", label: "Tous" },
  { key: "fullstack", label: "Fullstack" },
  { key: "ia", label: "IA" },
  { key: "systemes", label: "Systèmes" },
  { key: "jeu", label: "Jeu" },
];

function categoryOf(coverLabel: string): FilterKey {
  if (coverLabel === "Fullstack") return "fullstack";
  if (coverLabel === "IA") return "ia";
  if (coverLabel === "Backend") return "jeu";
  return "systemes"; // HTTP, Devops, Blockchain
}

export const ProjectsSection = forwardRef<HTMLElement, Props>(
  (
    { title, projects }: Props,
    ref: React.Ref<HTMLElement>
  ) => {
    const [activeFilter, setActiveFilter] = useState<FilterKey>("all");
    const [selectedId, setSelectedId] = useState(projects[0]?.id ?? "");
    const [indicator, setIndicator] = useState<{ left: number; width: number } | null>(null);
    const filterRefs = useRef<Partial<Record<FilterKey, HTMLButtonElement>>>({});

    const filteredProjects =
      activeFilter === "all"
        ? projects
        : projects.filter((p) => categoryOf(p.coverLabel) === activeFilter);

    const selectedProject =
      filteredProjects.find((p) => p.id === selectedId) ?? filteredProjects[0] ?? null;

    const mediaScrollRef = useRef<HTMLDivElement | null>(null);
    const descriptionScrollRef = useRef<HTMLDivElement | null>(null);

    const groupedProjects = filteredProjects.reduce<Record<string, ProjectDetailModel[]>>(
      (groups, project) => {
        const label = project.coverLabel || "Autres";
        (groups[label] ??= []).push(project);
        return groups;
      },
      {}
    );

    useLayoutEffect(() => {
      const btn = filterRefs.current[activeFilter];
      if (btn) {
        setIndicator({ left: btn.offsetLeft, width: btn.offsetWidth });
      }
    }, [activeFilter]);

    useLayoutEffect(() => {
      if (mediaScrollRef.current) {
        mediaScrollRef.current.scrollTo({ top: 0, behavior: "auto" });
      }
      if (descriptionScrollRef.current) {
        descriptionScrollRef.current.scrollTo({ top: 0, behavior: "auto" });
      }
    }, [selectedId]);

    return (
      <section
        id="projects"
        ref={ref}
        className="w-full snap-start snap-always lg:h-screen lg:overflow-hidden"
      >
        <div className="mx-auto flex w-full max-w-[1500px] flex-col px-1 pt-16 pb-10 sm:p-5 lg:h-full lg:justify-start lg:pt-24">
          <h2 className="ml-3 text-xl font-semibold">{title}</h2>

          <div className="grid grid-cols-1 gap-4 lg:h-[calc(60vh_+_132px)] lg:grid-cols-[25%_75%] lg:grid-rows-1">
            <div className="relative lg:flex lg:h-full lg:flex-col">
              <div
                role="group"
                aria-label="Filtrer par catégorie"
                className="relative mb-5 mt-3 ml-3 inline-flex w-fit shrink-0 gap-5"
              >
                {FILTERS.map((filter) => {
                  const isActive = activeFilter === filter.key;
                  return (
                    <button
                      key={filter.key}
                      ref={(el) => {
                        filterRefs.current[filter.key] = el ?? undefined;
                      }}
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => {
                        setActiveFilter(filter.key);
                        const stillVisible = projects.some(
                          (p) =>
                            p.id === selectedId &&
                            (filter.key === "all" || categoryOf(p.coverLabel) === filter.key)
                        );
                        if (!stillVisible) {
                          const first = projects.find(
                            (p) => filter.key === "all" || categoryOf(p.coverLabel) === filter.key
                          );
                          if (first) setSelectedId(first.id);
                        }
                      }}
                      className={`clickable pb-2 font-sans text-xs font-medium transition-colors ${
                        isActive ? "text-white" : "text-white/50 hover:text-white/80"
                      }`}
                    >
                      {filter.label}
                    </button>
                  );
                })}
                {indicator ? (
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute bottom-0 h-[2px] rounded-full bg-sky-400"
                    style={{
                      left: indicator.left,
                      width: indicator.width,
                      transition: "left 300ms cubic-bezier(0.16, 1, 0.3, 1), width 300ms cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                  />
                ) : null}
              </div>
              <div className="max-h-[35vh] overflow-y-scroll minimal-scrollbar lg:min-h-0 lg:max-h-none lg:flex-1">
                {Object.entries(groupedProjects).map(([label, groupProjects]) => (
                  <div key={label}>
                    <p className="px-3 pt-3 pb-1 text-[0.65rem] font-semibold uppercase tracking-wider text-white/40">
                      {label}
                    </p>
                    {groupProjects.map((project) => {
                      const isSelected = selectedId === project.id;
                      return (
                        <button
                          key={project.id}
                          type="button"
                          onClick={() => setSelectedId(project.id)}
                          className={`w-full min-h-[9vh] clickable text-left border-b border-white/10 p-3 transition ${
                            isSelected
                              ? "text-white bg-gradient-to-r from-sky-500/5 to-sky-500/40 transition-left"
                              : ""
                          }`}
                        >
                          <div className="text-base font-semibold text-white">{project.title}</div>
                        </button>
                      );
                    })}
                  </div>
                ))}
                {filteredProjects.length === 0 ? (
                  <p className="p-3 text-sm text-white/50">Aucun projet dans cette catégorie.</p>
                ) : null}
              </div>
            </div>

            <div className="p-3 min-w-0">
              {selectedProject ? (
                <>
                  <div className="flex mt-2 lg:h-[60vh] mb-3 gap-3 flex-col lg:flex-row">
                    <div className="relative lg:w-[70%]">
                      <div
                        ref={mediaScrollRef}
                        key={selectedId}
                        className="aspect-[7/4] lg:aspect-auto lg:h-full overflow-y-scroll minimal-scrollbar [--scrollbar-opacity:0.4] rounded-xl"
                      >
                        {selectedProject.links.length > 0 ? (
                          <div className="absolute top-5 right-5 flex flex-col items-end gap-2">
                            {selectedProject.links.map((link, i) => (
                              <a
                                key={i}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`Ouvrir le lien ${link.icon} du projet ${selectedProject.title}`}
                                className="clickable flex items-center justify-center rounded-full bg-white/10 p-1 z-10 transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                              >
                                <img
                                  src={link.src ? link.src : `https://cdn.simpleicons.org/${link.icon}/${link.color ? link.color : "020e21"}`}
                                  alt=""
                                  width={54}
                                  height={54}
                                />
                              </a>
                            ))}
                          </div>
                        ) : null}
                        {selectedProject.coverSrcs.length > 0 ? (
                          <div className="flex flex-col gap-3">
                            {selectedProject.coverSrcs.map((src, i) => (
                              <MediaItem key={i} src={src} title={selectedProject.title} />
                            ))}
                          </div>
                        ) : (
                          <div className="flex h-full items-center justify-center text-xs text-white/50">
                            Pas d&apos;image
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mt-4 lg:mt-0 flex flex-1 flex-col gap-4 pl-4">
                      <h3 className="text-lg font-semibold">{selectedProject.title}</h3>

                      <div
                        ref={descriptionScrollRef}
                        className="text-base max-h-[60vh] leading-relaxed text-white/75 overflow-y-scroll minimal-scrollbar bg-gradient-to-t from-black/10 to-transparent p-4 rounded-lg"
                      >
                        {selectedProject.description.map((p, i) => (
                          <p key={i} className="pb-4">
                            {p}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="relative mt-8 ml-4 lg:ml-0 lg:w-[70%] overflow-hidden">
                    <div className="flex w-max pb-1 animate-scroll">
                      {[...(selectedProject.items ?? []), ...(selectedProject.items ?? []), ...(selectedProject.items ?? []), ...(selectedProject.items ?? [])].map((item, i) => (
                        <div key={i} className="shrink-0 p-4 pl-10">
                          <div className="flex h-[44px] w-[44px] items-center justify-center">
                            <img
                              src={item.icon ? `https://cdn.simpleicons.org/${item.icon}/${item.color}` : item.src ? item.src : undefined}
                              alt={item.name}
                              className="max-h-[44px] max-w-[44px] object-contain"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex h-full items-center justify-center text-white/60">
                  Aucun projet sélectionné
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }
);
