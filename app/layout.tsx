import type { Metadata, Viewport } from "next";
import "@fontsource-variable/manrope/wght.css";
import "./globals.css";
import { getSiteMetadata } from "@/src/lib/site";

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
    <html lang="es-MX">
      <body>{children}</body>
    </html>
  );
}
