"use client";

import { useRef } from "react";
import { BackgroundLayers } from "@/components/home/BackgroundLayers";
import { ContactSection } from "@/components/home/ContactSection";
import { HeroHeader } from "@/components/home/HeroHeader";
import { SideNav } from "@/components/home/SideNav";
import { projectsBySlug } from "@/data/projects";
import { ProjectsSection } from "@/components/home/ProjectsSection";
import { Analytics } from "@vercel/analytics/next"

const FEATURED_PROJECTS = [
  projectsBySlug.intersektion,
  projectsBySlug.transcendence,
  projectsBySlug.leaffliction,
  projectsBySlug.ragPipeline,
  projectsBySlug.multilayerPerceptron,
  projectsBySlug.learn2slither,
  projectsBySlug.volleytrack,
  projectsBySlug.forseason,
  projectsBySlug.chaostnt,
  projectsBySlug.webserv,
  projectsBySlug.tokenizer,
  projectsBySlug.inception,
].map((p) => ({
  id: p.id,
  title: p.title,
  coverLabel: p.coverLabel,
  status: p.status,
  coverSrcs: p.coverSrcs,
  description: p.description,
  items: p.items,
  links: p.links,
}));

const CONTACT_LINKS = [
  {
    label: "Email",
    value: "lilianperthuis@gmail.com",
    href: "mailto:lilianperthuis@gmail.com",
  },
  {
    label: "GitHub",
    value: "github.com/LilianPe",
    href: "https://github.com/LilianPe",
  },
  {
    label: "LinkedIn",
    value: "LinkedIn",
    href: "https://www.linkedin.com/in/lilian-perthuis-14bb562a2/",
  },
];


export default function Home() {

  const heroRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  return (
    <div>
      <div className="relative min-h-screen overflow-hidden px-6 py-10 sm:py-14 print:overflow-visible print:px-0 print:py-0 lg:py-0">
        <BackgroundLayers />
        <SideNav />

        <div
          id="snap"
          className="relative ml-5 mr-5 lg:ml-10 lg:mr-10 lg:h-screen lg:overflow-y-auto lg:overscroll-contain lg:snap-y lg:snap-mandatory lg:scroll-smooth"
        >
          <HeroHeader
            ref={heroRef}
            title="Lilian Perthuis"
            subtitle="Ingénieur logiciel — Systèmes & IA"
            tagline="Étudiant à 42 Paris"
          />

          <ProjectsSection
            ref={projectsRef}
            title="Projets"
            projects={FEATURED_PROJECTS}
          />

          <ContactSection
            ref={contactRef}
            intro="Un besoin ponctuel ou un projet ? Écris-moi et on en parle."
            links={CONTACT_LINKS}
            footerGithub="LilianPe"
            footerEmail="lilianperthuis@gmail.com"
          />
        </div>
      </div>
      <Analytics />
    </div>
  );
}
