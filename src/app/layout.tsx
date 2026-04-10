import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import "./styles/globals.css";
import Providers from "./Providers";
import { Footer } from "./components/Footer";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Project Pulse",
  description: "Gestión de proyectos ágil y eficiente",
  icons: {
    icon: "/Logo.png",
  }
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#171717" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${outfit.variable} antialiased min-h-screen bg-gray-50 flex flex-col`}
      >
        <Providers>
          <main className="bg-gray-50 flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
