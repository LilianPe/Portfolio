"use client";

import { forwardRef, useRef, useState } from "react";
import emailjs from "@emailjs/browser";

type ContactLink = {
  label: string;
  value: string;
  href: string;
  iconSrc: string;
  iconAlt: string;
};

type Props = {
  intro: string;
  links: ContactLink[];
};

const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "";
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "";
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "";

export const ContactSection = forwardRef<HTMLElement, Props>(
  ({ intro, links }: Props, ref: React.Ref<HTMLElement>) => {
    const formRef = useRef<HTMLFormElement | null>(null);
    const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
    const [feedback, setFeedback] = useState("");

    const canSend = Boolean(EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY);

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
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : typeof error === "object"
            ? JSON.stringify(error, Object.getOwnPropertyNames(error))
            : String(error);

        if (process.env.NODE_ENV !== "production") {
          console.warn("EmailJS error", errorMessage, error);
        }

        setStatus("error");
        setFeedback(
          `Impossible d'envoyer le message pour le moment. ${errorMessage}`
        );
      }
    };

    return (
      <section id="contact" ref={ref} className="scroll-mt-20 mb-10 space-y-6 print:break-inside-avoid">
            <div className="space-y-4">
              <h2 className="text-5xl font-semibold">Contact</h2>
              <p className="text-xl text-white/70">{intro}</p>
            </div>
          <div>
            <div className="space-y-6">
              <div className="rounded-2xl border border-white/20 bg-white/[0.06] p-6 print:break-inside-avoid">
                <div className="space-y-3">
                  <p className="text-2xl font-semibold">Envoyer un message</p>
                </div>

                <form ref={formRef} onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <div className="flex flex-col gap-4 lg:flex-row">
                      <label className="block w-full">
                        <span className="text-sm text-white/70">Nom</span>
                        <input
                          type="text"
                          name="user_name"
                          placeholder="Votre nom"
                          required
                          className="mt-2 w-full rounded-2xl clickable border border-white/10 bg-slate-950/55 px-4 py-3 text-sm text-white outline-none transition focus:border-sky-500/60 focus:ring-2 focus:ring-sky-500/20"
                          />
                      </label>
                      <label className="block w-full">
                        <span className="text-sm text-white/70">Email</span>
                        <input
                          type="email"
                          placeholder="votre.email@example.com"
                          name="user_email"
                          required
                          className="mt-2 w-full rounded-2xl clickable border border-white/10 bg-slate-950/55 px-4 py-3 text-sm text-white outline-none transition focus:border-sky-500/60 focus:ring-2 focus:ring-sky-500/20"
                          />
                      </label>
                    </div>

                  <label className="block">
                    <span className="text-sm text-white/70">Message</span>
                    <textarea
                      name="message"
                      placeholder="Votre message..."
                      required
                      rows={5}
                      className="mt-2 w-full rounded-3xl clickable border border-white/10 bg-slate-950/55 px-4 py-3 text-sm text-white outline-none transition focus:border-sky-500/60 focus:ring-2 focus:ring-sky-500/20"
                    />
                  </label>

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <button
                      type="submit"
                      disabled={status === "sending" || !canSend}
                      className="inline-flex items-center justify-center rounded-3xl bg-sky-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {status === "sending" ? "Envoi…" : "Envoyer"}
                    </button>

                    {feedback ? (
                      <p className={`text-sm ${status === "success" ? "text-emerald-300" : "text-rose-300"}`}>
                        {feedback}
                      </p>
                    ) : null}
                  </div>

                  {!canSend ? (
                    <p className="text-sm text-amber-300">
                      Configure les variables d'environnement EmailJS dans `.env` :
                      <br />
                      <code className="text-xs text-white/70">NEXT_PUBLIC_EMAILJS_SERVICE_ID</code>,
                      <code className="text-xs text-white/70">NEXT_PUBLIC_EMAILJS_TEMPLATE_ID</code>,
                      <code className="text-xs text-white/70">NEXT_PUBLIC_EMAILJS_PUBLIC_KEY</code>
                    </p>
                  ) : null}
                </form>
              </div>
            </div>
          </div>
      </section>
    );
  }
);
