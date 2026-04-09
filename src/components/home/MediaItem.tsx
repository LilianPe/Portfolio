import { useEffect, useRef, useState } from "react";

export function MediaItem({ src, title }: { src: string; title: string }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const mediaRef = useRef<HTMLImageElement | HTMLVideoElement | null>(null);

  const setLoaded = (loaded: boolean) => {
    setIsLoaded(loaded);
  };

  const isVideo =
    src.endsWith(".mp4") ||
    src.endsWith(".webm") ||
    src.endsWith(".ogg");

  const setMediaRef = (node: HTMLImageElement | HTMLVideoElement | null) => {
    mediaRef.current = node;
  };

  useEffect(() => {
    setLoaded(false);

    const media = mediaRef.current;
    if (media) {
      if (!isVideo) {
        const image = media as HTMLImageElement;
        if (image.complete && image.naturalWidth > 0) {
          setLoaded(true);
        }
      } else {
        const video = media as HTMLVideoElement;
        if (video.readyState >= 3) {
          setLoaded(true);
        }
      }
    }
  }, [src, isVideo]);

  return (
    <div className="relative overflow-hidden rounded-xl">
      {!isLoaded && (
        <div className="min-h-[60vh] w-full animate-pulse rounded-xl bg-slate-950/70 backdrop-blur-sm">
            <div className="absolute inset-0 rounded-xl bg-slate-950/70 backdrop-blur-sm z-10 flex flex-col items-center justify-center gap-3 text-white">
            <div className="h-10 w-10 rounded-full border-4 border-white/20 border-t-white animate-spin" />
            <span className="text-xs uppercase tracking-[0.2em] text-white/80">Chargement...</span>
            </div>
        </div>
      )}

      {isVideo ? (
        <video
          ref={setMediaRef}
          src={src}
          className={`h-full w-full object-cover rounded-xl transition-opacity duration-200 ${isLoaded ? "opacity-100" : "opacity-0"}`}
          onLoadedData={() => setLoaded(true)}
          autoPlay
          muted
          loop
          playsInline
        />
      ) : (
        <img
          ref={setMediaRef}
          src={src}
          alt={`${title} cover`}
          className={`h-full w-full object-cover rounded-xl transition-opacity duration-200 ${isLoaded ? "opacity-100" : "opacity-0"}`}
          onLoad={() => setLoaded(true)}
        />
      )}
    </div>
  );
}
