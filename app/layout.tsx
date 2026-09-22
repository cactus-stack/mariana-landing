import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { getSiteMetadata } from "@/src/lib/site";

const manrope = localFont({
  src: "../node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2",
  weight: "200 800",
  display: "swap",
  variable: "--font-manrope",
});

export const metadata: Metadata = getSiteMetadata();

// The client asked for a light-only site, so the page declares a single color
// scheme. Advertising "light dark" here would let the browser tint form
// controls and scrollbars for a dark theme the stylesheet no longer ships.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
  themeColor: "#f4f6f7",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-MX" className={manrope.variable}>
      <body>{children}</body>
    </html>
  );
}
