import type { Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Fountain Group | Pure Oils, Naturally Made",
    template: "%s | Fountain Group",
  },
  description:
    "Fountain Group manufactures coconut oil and Mama’s Red Oil for homes, retailers and wholesale partners.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${fraunces.variable} h-full`}>
      <body className="min-h-full bg-surface text-ink antialiased">{children}</body>
    </html>
  );
}
