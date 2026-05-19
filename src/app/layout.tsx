import type { Metadata } from "next";
import { Syne, Manrope } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const manrope = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "DigiCraft Studio — Servicios Digitales Creativos",
  description:
    "Estudio digital creativo especializado en desarrollo web, aplicaciones móviles, invitaciones virtuales, edición de fotos y videos, diseño gráfico y branding. Transformamos ideas en experiencias digitales extraordinarias.",
  keywords: [
    "desarrollo web",
    "apps móviles",
    "invitaciones virtuales",
    "edición de fotos",
    "edición de video",
    "diseño gráfico",
    "branding",
    "estudio digital",
  ],
  openGraph: {
    title: "DigiCraft Studio — Servicios Digitales Creativos",
    description:
      "Transformamos ideas en experiencias digitales extraordinarias.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark" suppressHydrationWarning>
      <body
        className={`${syne.variable} ${manrope.variable} antialiased`}
        style={{ backgroundColor: "#0A0A0A", color: "#EDEDED" }}
      >
        {children}
      </body>
    </html>
  );
}
