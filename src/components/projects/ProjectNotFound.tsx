import Link from "next/link";

export function ProjectNotFound() {
  return (
    <main className="min-h-screen px-6 py-14">
      <div className="mx-auto max-w-3xl space-y-5">
        <p className="text-sm text-white/60">
          <Link href="/projects" className="hover:text-white">
            ← Projets
          </Link>
        </p>
        <h1 className="text-2xl font-semibold">Projet introuvable</h1>
        <p className="text-sm text-white/70">
          Ce projet n’existe pas (encore) dans le portfolio.
        </p>
      </div>
    </main>
  );
}

