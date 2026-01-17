import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Inter, Montserrat, Outfit, Plus_Jakarta_Sans, Poppins } from "next/font/google";
import "./styles/globals.css";
import Providers from "./Providers";
import { Footer } from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-poppins",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-poppins",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-plus-jakarta-sans",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-montserrat",
});

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
    <html lang="en">
      <body
        className={`${outfit.variable} antialiased min-h-screen flex flex-col`}
      >
        <Providers>
          <main className="bg-gray-50 flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
