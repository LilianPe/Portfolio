import type { Metadata } from "next";

import "./globals.css";
import Cursor from "@/components/Cursor";

export const metadata: Metadata = {
  title: "Lilian — Portfolio",
  description: "Portfolio de Lilian (42) — projets, compétences, contact.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>
        <main className="relative z-10 isolate">
          <Cursor/>
          {children}
        </main>
        </body>
    </html>
  );
}
