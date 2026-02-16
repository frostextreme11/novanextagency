import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jasa Pembuatan Website & Aplikasi Mobile Premium - NovaNext IT Agency",
  description: "Jasa bikin website keren murah, buat website, bikin aplikasi mobile brand sendiri, dan sistem kasir POS untuk UMKM dan Corporate. Konsultasi Gratis!",
  keywords: ["Bikin website keren murah", "buat website", "bikin aplikasi mobile brand sendiri", "bikin website brand sendiri", "jasa bikin website", "jasa bikin aplikasi mobile", "jasa bikin aplikasi android"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`dark scroll-smooth ${manrope.variable} ${spaceGrotesk.variable}`}>
      <head>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-background-dark text-slate-300 font-body antialiased overflow-x-hidden min-h-screen selection:bg-primary selection:text-white">
        {/* Fixed Background Noise */}
        <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none z-0"></div>

        {/* Abstract Glowing Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full mix-blend-screen filter blur-[100px] opacity-30 animate-blob"></div>
          <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-purple-500/20 rounded-full mix-blend-screen filter blur-[100px] opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-32 left-1/3 w-[500px] h-[500px] bg-pink-500/20 rounded-full mix-blend-screen filter blur-[100px] opacity-30 animate-blob animation-delay-4000"></div>
        </div>

        {children}
      </body>
    </html>
  );
}
