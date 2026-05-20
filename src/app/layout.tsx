import type { Metadata } from "next";
import { Syne, Manrope } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "DigiCraft Studio | Estudio Digital Creativo",
  description:
    "Estudio digital creativo especializado en desarrollo web, aplicaciones móviles, diseño gráfico, branding, edición de fotos y video, e invitaciones virtuales. Transformamos ideas en experiencias digitales excepcionales.",
  keywords: [
    "DigiCraft Studio",
    "desarrollo web",
    "aplicaciones móviles",
    "diseño gráfico",
    "branding",
    "edición de fotos",
    "edición de video",
    "invitaciones virtuales",
    "estudio digital",
  ],
  authors: [{ name: "DigiCraft Studio" }],
  openGraph: {
    title: "DigiCraft Studio | Estudio Digital Creativo",
    description:
      "Transformamos ideas en experiencias digitales excepcionales. Desarrollo web, apps, diseño y más.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('digicraft-theme');
                  if (saved === 'light') {
                    document.documentElement.setAttribute('data-theme', 'light');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${syne.variable} ${manrope.variable}`}>
        {children}
      </body>
    </html>
  );
}
