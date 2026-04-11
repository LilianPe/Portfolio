import { ProjectDetailModel } from "@/data/projects";
import { forwardRef, useEffect, useLayoutEffect, useRef, useState } from "react";
import { MediaItem } from "./MediaItem";


type Props = {
  title: string;
  projects: ProjectDetailModel[];
};

export const ProjectsSection = forwardRef<HTMLElement, Props>(
  (
    { title, projects }: Props,
    ref: React.Ref<HTMLElement>
  ) => {
    const [selectedId, setSelectedId] = useState(projects[0]?.id ?? "");
    const selectedProject =
      projects.find((p) => p.id === selectedId) ?? projects[0] ?? null;

    const mediaScrollRef = useRef<HTMLDivElement | null>(null);
    const descriptionScrollRef = useRef<HTMLDivElement | null>(null);

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
        className="scroll-mt-14 lg:scroll-mt-24 mt-20 w-full sm:p-5"
      >

        <div className="grid gap-4 grid-cols-1 lg:grid-cols-[25%_75%]">
          <div>
            <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold ml-3">{title}</h2>
              </div>
            </div>
            <div className="relative">
              <div className="max-h-[35vh] lg:max-h-[70vh] overflow-y-scroll minimal-scrollbar">
                
                {projects.map((project) => {
                  const isSelected = selectedId === project.id;
                  return (
                    <button
                      key={project.id}
                      type="button"
                      onClick={() => setSelectedId(project.id)}
                      className={`w-full min-h-[9vh] clickable text-left border-b border-white/100 p-3 transition ${
                        isSelected
                          ? "text-white bg-gradient-to-r from-sky-500/5 to-sky-500/40 transition-left shadow-[-10px_0_15px_-5px_rgba(0,0,0,0.5),10px_0_15px_-5px_rgba(0,0,0,0.5)]"
                          : ""
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="text-base font-semibold text-white">{project.title}</div>
                        </div>
                        <span className="rounded-full bg-white/10 px-2 py-1 text-[0.65rem] text-white/70">
                          {project.coverLabel}
                        </span>
                      </div>
                    </button>
                );
              })}
              </div>
            </div>
          </div>

          <div className="p-3 min-w-0 ">
            {selectedProject ? (
              <>
                <div className="flex mt-2 lg:h-[60vh] mb-3 gap-3 flex-col lg:flex-row">
                  <div className="lg:w-[70%] relative">
                    <div ref={mediaScrollRef} key={selectedId} className="aspect-[7/4] lg:aspect-auto lg:h-full overflow-y-scroll minimal-scrollbar [--scrollbar-opacity:0.4] rounded-xl ">
                      {selectedProject.links ? (
                        <div className="absolute top-3 right-3 flex flex-col items-end gap-2">
                          {selectedProject.links.map((link, i) => (
                            <img
                              src={`https://cdn.simpleicons.org/${link.icon}/${link.color}`}
                              alt={link.icon}
                              width={44}
                              height={44}
                              key={i}
                              onClick={() => window.open(link.href, "_blank")}
                              className="clickable rounded-full bg-white/10 p-1 z-10 transition hover:bg-white/20"
                            />
                          ))}
                        </div>
                      ) : null}
                      {selectedProject.coverSrcs ? (
                        <div className="flex flex-col gap-3">
                          {selectedProject.coverSrcs.map((src, i) => (
                            <MediaItem key={i} src={src} title={selectedProject.title} />
                          ))}
                        </div>
                      ) : (
                        <div className="flex h-full items-center justify-center text-xs text-white/50">
                          Pas d’image
                        </div>
                      )}                    
                    </div>
                  <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-20  from-black/50 via-transparent to-transparent" /></div>

                  <div className="mt-4 lg:mt-0 flex flex-1 flex-col gap-4 pl-4">
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <p className="text-xs uppercase tracking-[0.18em] text-sky-300/80">
                          Projet
                        </p>
                        <h3 className="text-lg font-semibold">{selectedProject.title}</h3>
                      </div>
                    </div>

                    <div ref={descriptionScrollRef} className="text-base max-h-[60vh] leading-relaxed text-white/75 overflow-y-scroll minimal-scrollbar bg-gradient-to-t from-black/10 to-transparent p-4 rounded-lg ">
                      {selectedProject.description.map((p, i) => (
                        <p key={i} className="pb-4">
                          {p}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="relative mt-8 h-[20vh] ml-4 lg:ml-0 lg:w-[70%] overflow-hidden">
                  <div className="flex w-max pb-1 animate-scroll">
                    {
                    ([...(selectedProject.items ?? []), ...(selectedProject.items ?? []), ...(selectedProject.items ?? []), ...(selectedProject.items ?? [])]).map((item, i) => (
                      <div
                        key={i}
                        className="shrink-0 p-4 pl-10"
                      >
                        <img
                          src={item.icon ? `https://cdn.simpleicons.org/${item.icon}/${item.color}` : item.src? item.src : undefined  }
                          alt={item.name}
                          width={44}
                          height={44}
                        />
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
      </section>
    );
  }
);
