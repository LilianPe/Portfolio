import { forwardRef } from "react";

type Props = {
  title: string;
  subtitle: string;
  tagline: string;
};

export const HeroHeader = forwardRef<HTMLElement, Props>(
  ({ title, subtitle, tagline }: Props, ref: React.Ref<HTMLElement>) => {
    return (
      <section id="hero" ref={ref} className="h-screen snap-start snap-always">
        <header className="h-screen flex items-center justify-center text-center">

          <div className="space-y-3 sm:space-y-4">
          <h1 className="text-5xl font-semibold tracking-tight sm:text-7xl lg:text-8xl">
            {title}
          </h1>
          <p className="text-base font-medium tracking-wide text-white/70 sm:text-lg">
            {subtitle}
          </p>
          <p className="font-sans text-sm text-white/50">{tagline}</p>
          <a
            href="#projects"
            className="mt-20 inline-flex items-center gap-2 px-1 py-1 font-sans text-sm text-white/70 transition-colors hover:text-sky-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-400"
          >
            Projets
            <span aria-hidden="true" className="motion-safe:animate-bounce">
              ↓
            </span>
          </a>
        </div>
      </header>
    </section>
  );
});
