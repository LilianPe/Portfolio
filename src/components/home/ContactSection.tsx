"use client";

import { forwardRef, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { HomeFooter } from "./HomeFooter";

type ContactLink = {
  label: string;
  value: string;
  href: string;
};

type Props = {
  intro: string;
  links: ContactLink[];
  footerGithub: string;
  footerEmail: string;
};

const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "";
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "";
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "";

const MSG_MAX_HEIGHT = 130;

function iconFor(label: string) {
  const key = label.toLowerCase();
  if (key === "email") return MailIcon;
  if (key === "github") return GithubIcon;
  return LinkedinIcon;
}

export const ContactSection = forwardRef<HTMLElement, Props>(
  ({ intro, links, footerGithub, footerEmail }: Props, ref: React.Ref<HTMLElement>) => {
    const formRef = useRef<HTMLFormElement | null>(null);
    const messageRef = useRef<HTMLTextAreaElement | null>(null);
    const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
    const [feedback, setFeedback] = useState("");

    const canSend = Boolean(EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY);

    const autoGrowMessage = () => {
      const el = messageRef.current;
      if (!el) return;
      el.style.height = "auto";
      const next = Math.min(el.scrollHeight, MSG_MAX_HEIGHT);
      el.style.height = `${next}px`;
      el.style.overflowY = el.scrollHeight > MSG_MAX_HEIGHT ? "auto" : "hidden";
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (!formRef.current || !canSend) {
        setStatus("error");
        setFeedback("Le formulaire n'est pas encore configuré.");
        return;
      }

      setStatus("sending");
      setFeedback("");

      try {
        await emailjs.sendForm(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          formRef.current,
          EMAILJS_PUBLIC_KEY
        );

        setStatus("success");
        setFeedback("Message envoyé ! Je te réponds dès que possible.");
        formRef.current.reset();
        autoGrowMessage();
      } catch (error) {
        console.error("EmailJS error:", error);

        setStatus("error");
        setFeedback(
          "Oups, le message n'est pas parti. Réessaie dans un instant, ou écris-moi directement par email."
        );
      }
    };

    return (
      <section
        id="contact"
        ref={ref}
        className="relative w-full snap-start snap-always print:break-inside-avoid lg:h-screen lg:overflow-hidden"
      >
        <div className="mx-auto flex w-full max-w-[560px] flex-col px-6 pt-16 pb-24 text-center sm:pt-20 lg:h-full lg:justify-center lg:pt-0 lg:pb-0">
          <h2 className="text-xl font-semibold">Contact</h2>
          <p className="mx-auto mt-3 max-w-[42ch] text-lg text-white/70">{intro}</p>

          <div className="mx-auto mt-7 mb-9 flex items-center gap-6">
            {links.map((link) => {
              const Icon = iconFor(link.label);
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={`${link.label} : ${link.value}`}
                  title={link.label}
                  className="clickable -m-2.5 inline-flex items-center justify-center rounded-full p-2.5 text-white/70 transition hover:-translate-y-0.5 hover:text-sky-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-400"
                >
                  <Icon />
                </a>
              );
            })}
          </div>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="mx-auto flex w-full max-w-[460px] flex-col gap-6 text-left"
          >
            <label className="block">
              <span className="font-sans text-xs uppercase tracking-wider text-white/50">Nom</span>
              <input
                type="text"
                name="user_name"
                placeholder="Votre nom"
                required
                className="clickable mt-2 w-full border-b border-white/10 bg-transparent pb-2 text-base text-white outline-none transition focus:border-sky-400/70"
              />
            </label>
            <label className="block">
              <span className="font-sans text-xs uppercase tracking-wider text-white/50">Email</span>
              <input
                type="email"
                name="user_email"
                placeholder="votre.email@example.com"
                required
                className="clickable mt-2 w-full border-b border-white/10 bg-transparent pb-2 text-base text-white outline-none transition focus:border-sky-400/70"
              />
            </label>
            <label className="block">
              <span className="font-sans text-xs uppercase tracking-wider text-white/50">Message</span>
              <textarea
                ref={messageRef}
                name="message"
                rows={1}
                placeholder="Votre message..."
                required
                onInput={autoGrowMessage}
                className="clickable mt-2 w-full resize-none overflow-hidden border-b border-white/10 bg-transparent pb-2 text-base text-white outline-none transition focus:border-sky-400/70"
              />
            </label>

            <div className="flex items-center justify-between gap-4">
              <button
                type="submit"
                disabled={status === "sending" || !canSend}
                className="clickable inline-flex items-center gap-2 font-sans text-sm font-semibold text-sky-300 transition disabled:cursor-not-allowed disabled:text-white/40"
              >
                {status === "sending" ? "Envoi…" : "Envoyer"}
                <span aria-hidden="true">→</span>
              </button>

              {feedback ? (
                <p
                  role="status"
                  aria-live="polite"
                  className={`font-sans text-sm ${status === "success" ? "text-emerald-300" : "text-rose-300"}`}
                >
                  {feedback}
                </p>
              ) : null}
            </div>

            {!canSend ? (
              <p className="font-sans text-sm text-amber-300">
                Configure les variables d&apos;environnement EmailJS dans `.env` :
                <br />
                <code className="text-xs text-white/70">NEXT_PUBLIC_EMAILJS_SERVICE_ID</code>,{" "}
                <code className="text-xs text-white/70">NEXT_PUBLIC_EMAILJS_TEMPLATE_ID</code>,{" "}
                <code className="text-xs text-white/70">NEXT_PUBLIC_EMAILJS_PUBLIC_KEY</code>
              </p>
            ) : null}
          </form>
        </div>

        <div className="mt-10 lg:absolute lg:inset-x-0 lg:bottom-4 lg:mt-0">
          <HomeFooter github={footerGithub} email={footerEmail} />
        </div>
      </section>
    );
  }
);

function MailIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="2" y="4.5" width="20" height="15" rx="3" />
      <path d="m2.5 7.5 9.5 6.8 9.5-6.8" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5.001 2.5 2.5 0 0 1 0-5.001ZM3 9.5h4v11H3v-11Zm7 0h3.8v1.5h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.5 4.78 5.75v6.7h-4v-5.94c0-1.42-.03-3.25-2.02-3.25-2.02 0-2.33 1.5-2.33 3.15v6.04h-4v-11Z" />
    </svg>
  );
}
