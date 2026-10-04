import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jhalak 2026",
  description:
    "Intra-Collegiate Cultural Festival · SRMIST. Directorate of Student Affairs presents Jhalak '26: 8 Houses, 1 Throne.",
  keywords: ["Jhalak", "Jhalak 26", "SRMIST", "DSA", "Cultural Fest", "Olympus Ascendant"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen bg-[#050811] text-slate-100 antialiased selection:bg-amber-500/30 selection:text-amber-200">
        {children}
      </body>
    </html>
  );
}
