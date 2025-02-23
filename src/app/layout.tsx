import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/context/AuthProvider";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Blurt Box",
  description:
    "Blurt Box is an anonymous messaging platform that allows you to send and receive messages anonymously.",
  keywords: [
    "anonymous messaging",
    "ngl",
    "confessions",
    "confession box",
    "not gonna lie",
    "private messages",
    "secure communication",
    "Blurt Box",
    "anonymous platform",
  ],
  authors: [{ name: "Blurt Box" }],
  openGraph: {
    title: "BlurtBox - Anonymous Messaging Platform",
    description:
      "Send and receive messages anonymously with BlurtBox's secure platform",
    type: "website",
    siteName: "BlurtBox",
    locale: "en_IN",
    alternateLocale: ["en_US", "en_GB", "es_ES", "fr_FR", "de_DE"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blurt Box - Anonymous Messaging Platform",
    description:
      "Send and receive messages anonymously with Blurt Box's secure platform",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/fevicon.jpg", // Single favicon for all uses
  },
};

// Move viewport and themeColor to a separate export
export const generateViewport = () => ({
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          {children}
          <Toaster />
        </body>
      </AuthProvider>
    </html>
  );
}
