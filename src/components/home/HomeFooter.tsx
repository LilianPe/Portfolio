"use client";

type Props = {
  github: string;
  email: string;
};

export function HomeFooter({ github, email }: Props) {
  return (
    <footer className="w-full px-6 py-3 text-xs text-white/60 sm:px-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-center gap-2 sm:flex-row sm:gap-6">
        <p>
          © 2026 Lilian Perthuis <span className="text-white/30">·</span>{" "}
          <a href="/mentions-legales" className="clickable transition-colors hover:text-white/90">
            Mentions légales
          </a>
        </p>
        <div className="flex items-center gap-4">
          <a
            href={`https://github.com/${github}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`GitHub : github.com/${github}`}
            title="GitHub"
            className="clickable -m-2 inline-flex rounded-full p-2 text-white/60 transition-colors hover:text-white"
          >
            <GithubIcon />
          </a>
          <a
            href={`mailto:${email}`}
            aria-label={`Email : ${email}`}
            title="Email"
            className="clickable -m-2 inline-flex rounded-full p-2 text-white/60 transition-colors hover:text-white"
          >
            <MailIcon />
          </a>
        </div>
      </div>
    </footer>
  );
}

function GithubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="4" width="20" height="16" rx="3" />
      <path d="m2 7 10 7 10-7" />
    </svg>
  );
}
