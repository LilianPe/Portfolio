import { forwardRef } from "react";

type Props = {
  title: string;
  subtitle: string;
};

export const HeroHeader = forwardRef<HTMLElement, Props>(
  ({ title, subtitle }: Props, ref: React.Ref<HTMLElement>) => {
    return (
      <section id="hero" ref={ref}>
        <header className="h-screen flex items-center justify-center text-center">

          <div className="space-y-3 sm:space-y-4">
          <h1 className="text-5xl font-semibold tracking-tight sm:text-7xl lg:text-8xl">
            {title}
          </h1>
          <p className="text-base font-medium tracking-wide text-white/70 sm:text-lg">
            {subtitle}
          </p>
        </div>
      </header>
    </section>
  );
});
