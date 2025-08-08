import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/context/AuthProvider";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/next";

// Load and configure Geist Sans font with a custom CSS variable
const geistSans = Geist({
  variable: "--font-geist-sans", // Custom CSS variable name for usage in Tailwind/CSS
  subsets: ["latin"], // Include only Latin character set
});

// Load and configure Geist Mono font with a custom CSS variable
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Define SEO metadata used by Next.js for this app
export const metadata: Metadata = {
  title: "Blurt Box", // Title shown in browser tab
  description:
    "Blurt Box is an anonymous messaging platform that allows you to send and receive messages anonymously.",
  keywords: [
    // Helps search engines index your app
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
    // Metadata for link previews on platforms like Facebook
    title: "BlurtBox - Anonymous Messaging Platform",
    description:
      "Send and receive messages anonymously with BlurtBox's secure platform",
    type: "website",
    siteName: "BlurtBox",
    locale: "en_IN",
    alternateLocale: ["en_US", "en_GB", "es_ES", "fr_FR", "de_DE"],
  },
  twitter: {
    // Metadata for Twitter card previews
    card: "summary_large_image",
    title: "Blurt Box - Anonymous Messaging Platform",
    description:
      "Send and receive messages anonymously with Blurt Box's secure platform",
  },
  robots: {
    // Instructs search engines to index and follow links
    index: true,
    follow: true,
  },
  icons: {
    icon: "/fevicon.jpg", // Path to the favicon icon
  },
};

// Define the viewport and theme color (useful for mobile responsiveness and browser color)
export const generateViewport = () => ({
  width: "device-width", // Viewport width should match the device width
  initialScale: 1, // Initial zoom level
  themeColor: "#ffffff", // Browser theme color (for mobile address bar)
});

// Root layout component that wraps all pages
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <AuthProvider>
        {/* Provide auth context to the entire app */}
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          {children} {/* Render the page content */}
          <Toaster /> {/* Include toast notification system */}
          <Analytics /> {/* Include Vercel Analytics */}
        </body>
      </AuthProvider>
    </html>
  );
}
