"use client";

import { useRef } from "react";
import { BackgroundLayers } from "@/components/home/BackgroundLayers";
import { ContactSection } from "@/components/home/ContactSection";
import { HeroHeader } from "@/components/home/HeroHeader";
import { HomeNav } from "@/components/home/HomeNav";
import { projectsBySlug } from "@/data/projects";
import usePageScroll from "@/hooks/usePageScroll";
import { ProjectsSection } from "@/components/home/ProjectsSection";
import { HomeFooter } from "@/components/home/HomeFooter";
import { Analytics } from "@vercel/analytics/next"

const FEATURED_PROJECTS = [
  projectsBySlug.transcendence,
  projectsBySlug.tokenizer,
  projectsBySlug.learn2slither,
  projectsBySlug.ragPipeline,
  projectsBySlug.leaffliction,
  projectsBySlug.multilayerPerceptron,
  projectsBySlug.webserv,
  projectsBySlug.inception,
  projectsBySlug.javaBackendModule,
].map((p) => ({
  id: p.id,
  title: p.title,
  coverLabel: p.coverLabel,
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
    iconSrc: "https://cdn.simpleicons.org/gmail/EA4335",
    iconAlt: "Email",
  },
  {
    label: "GitHub",
    value: "github.com/LilianPe",
    href: "https://github.com/LilianPe",
    iconSrc: "https://cdn.simpleicons.org/github/FFFFFF",
    iconAlt: "GitHub",
  },
  {
    label: "LinkedIn",
    value: "LinkedIn",
    href: "https://www.linkedin.com/in/lilian-perthuis-14bb562a2/",
    iconSrc: "/icons/linkedin.png",
    iconAlt: "LinkedIn",
  },
];


export default function Home() {

  const heroRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);
  
  usePageScroll([heroRef, projectsRef, contactRef]);
  
  return (
    <main>
      <div className="relative min-h-screen overflow-hidden px-6 py-10 sm:py-14 print:overflow-visible print:px-0 print:py-0">
        <BackgroundLayers />

        <div className="relative ml-5 mr-5 lg:ml-10 lg:mr-10">
          <HomeNav name="Lilian" tagline="42" />

          <HeroHeader
            ref={heroRef}
            title="Software Engineer"
            subtitle="Systèmes & IA"
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
          />
        </div>
      <HomeFooter github="LilianPe" email="lilianperthuis@gmail.com" />   
      </div>
      <Analytics />
    </main>
  );
}
