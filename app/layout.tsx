import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "For You",
  description: "A small reminder of what I notice.",
  authors: [{ name: "For You" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} scroll-smooth h-full`}>
      <body className="min-h-full flex flex-col font-sans antialiased bg-[#030008] text-[#f5f2fa] selection:bg-purple-900/40">
        {children}
      </body>
    </html>
  );
}
