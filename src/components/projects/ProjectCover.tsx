type Props = {
  label: string;
  accent: string;
  src?: string;
  size?: "card" | "hero";
};

export function ProjectCover({ label, accent, src, size = "card" }: Props) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
      <div
        className={`absolute -inset-20 opacity-90 blur-3xl bg-gradient-to-br ${accent}`}
        aria-hidden
      />

      <div
        className={[
          "relative w-full",
          size === "hero" ? "h-56 sm:h-64" : "h-44 sm:h-52",
        ].join(" ")}
      >
        {src ? (
          <img
            src={src}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <svg
            className="absolute inset-0 h-full w-full opacity-80"
            viewBox="0 0 600 360"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            <defs>
              <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
                <stop stopColor="rgba(255,255,255,0.10)" />
                <stop offset="1" stopColor="rgba(255,255,255,0.00)" />
              </linearGradient>
              <pattern
                id="grid"
                width="36"
                height="36"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 36 0 L 0 0 0 36"
                  stroke="rgba(255,255,255,0.07)"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect x="0" y="0" width="600" height="360" fill="url(#grid)" />
            <path
              d="M-60 290C70 240 120 330 220 300C320 270 350 170 430 150C510 130 590 190 680 140"
              stroke="url(#g1)"
              strokeWidth="2"
            />
            <path
              d="M-40 210C70 160 160 240 240 220C320 200 360 120 450 100C540 80 610 120 700 90"
              stroke="rgba(255,255,255,0.10)"
              strokeWidth="1.5"
            />
            <circle cx="140" cy="120" r="66" fill="rgba(255,255,255,0.06)" />
            <circle cx="470" cy="250" r="92" fill="rgba(255,255,255,0.04)" />
          </svg>
        )}

        <div
          className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent"
          aria-hidden
        />

        <div className="absolute left-4 top-4">
          <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-white/80 backdrop-blur">
            {label}
          </span>
        </div>
      </div>
    </div>
  );
}

