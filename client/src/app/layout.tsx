// app/layout.tsx
import type { Metadata } from "next";
import { Jost, Oxanium } from "next/font/google";
import "./globals.css";

const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
});

const oxanium = Oxanium({
  subsets: ["latin"],
  variable: "--font-oxanium",
});

export const metadata: Metadata = {
  title: "Luxemart – Smart Shopping for Everyone",
  description:
    "Shop electronics, fashion, groceries, and more on Luxemart. Seamless experience across devices. Trusted by thousands.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${jost.variable} ${oxanium.variable}`}>
      <body className="bg-white text-gray-900 antialiased">{children}</body>
    </html>
  );
}
