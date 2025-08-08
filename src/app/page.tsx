import ModernAnimatedButtonVariant1 from "@/components/custom/ModernAnimatedButtonVariant1";
import NewNavbar from "@/components/NewNavbar";
import {
  Shield,
  MessageSquare,
  Heart,
  Send,
  Users,
  Sparkles,
  Zap,
  Box,
} from "lucide-react";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Link from "next/link";

// Data for the "Features" section.
const features = [
  {
    icon: <Shield className="w-8 h-8 text-purple-700" />,
    title: "Complete Anonymity",
    description:
      "Your identity remains protected. Share thoughts freely without fear of judgment.",
  },
  {
    icon: <MessageSquare className="w-8 h-8 text-purple-700" />,
    title: "Instant Feedback",
    description:
      "Receive honest messages and feedback from your network instantly.",
  },
];

// Data for the "How It Works" section.
const howItWorksSteps = [
  {
    icon: <Users className="w-10 h-10 text-purple-700" />,
    title: "Create Your Link",
    description:
      "Sign up in seconds and get your unique BlurtBox link to share with the world.",
  },
  {
    icon: <Send className="w-10 h-10 text-purple-700" />,
    title: "Share With Friends",
    description:
      "Share your link on social media or directly with friends and followers.",
  },
  {
    icon: <Heart className="w-10 h-10 text-purple-700" />,
    title: "Receive Messages",
    description:
      "Get anonymous messages, confessions, and honest feedback in your dashboard.",
  },
];

// Data for the footer navigation links.
const footerLinks = [
  { href: "/disclaimer", label: "Disclaimer" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
];

export default function Home() {
  return (
    <>
      <NewNavbar />

      {/* ===== HERO SECTION ===== */}
      <section className="mt-12 sm:mt-16 px-4 sm:px-10 md:px-16 xl:px-48 bg-gradient-to-br from-white via-purple-50 to-white">
        <div className="container mx-auto text-center flex flex-col items-center">
          <h1 className="flex flex-col items-center text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-gray-800 mb-4 sm:mb-6">
            Say It. Share It. Stay{" "}
            <div className="text-purple-600 inline-block text-4xl sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Anonymous.
            </div>
          </h1>
          <p className="text-base sm:text-lg text-gray-600 mb-8 sm:mb-10 max-w-2xl mx-auto px-2">
            Share your unique link and receive anonymous messages, feedback, and
            confessions from friends and followers. Express yourself freely in a
            safe space.
          </p>
          <div className="px-2">
            <ModernAnimatedButtonVariant1
              text="Get Your Link Now"
              buttonText="Click"
              buttonLink="/sign-up"
            />
          </div>
          <div className="w-full mt-12 transition-all duration-300 ease-in-out hover:scale-105 shadow-xl rounded-2xl overflow-hidden">
            <AspectRatio ratio={16 / 9}>
              <Image
                src="/image.png"
                alt="BlurtBox Dashboard Preview"
                fill
                className="rounded-2xl object-cover transition-transform duration-300"
                priority
              />
            </AspectRatio>
          </div>
        </div>
      </section>

      {/* ===== FEATURES SECTION ===== */}
      <section className="py-24 px-4 sm:px-10 md:px-16 xl:px-48 bg-gradient-to-b from-white to-purple-100">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-4">
              FEATURES
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-800">
              Why Choose <span className="text-purple-700">BlurtBox</span>?
            </h2>
          </div>
          {/* map over the `features` array */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group hover:border-purple-200">
                <div className="bg-purple-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-purple-200 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS SECTION ===== */}
      <section className="py-24 px-4 sm:px-10 md:px-16 xl:px-48 bg-gradient-to-b from-purple-50/50 to-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-4">
              Simple Process
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800">
              How It Works
            </h2>
          </div>
          {/* map over the `howItWorksSteps` array*/}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {howItWorksSteps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center h-full">
                  <div className="bg-purple-100 w-20 h-20 rounded-full flex items-center justify-center mb-6 mx-auto">
                    {step.icon}
                  </div>
                  {/* The step number is generated from the loop's index */}
                  <span className="absolute -top-4 -left-4 w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                    {index + 1}
                  </span>
                  <h3 className="text-2xl font-semibold mb-4">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center w-[250px] container mx-auto flex flex-col items-center">
            <ModernAnimatedButtonVariant1
              text="Get Your Link Now"
              buttonText="Click"
              buttonLink="/sign-up"
            />
          </div>
        </div>
      </section>

      {/* ===== FOOTER SECTION ===== */}
      <footer className="bg-gray-900 text-gray-300 py-6">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-6">
            <Box className="w-8 h-8 pr-2" />

            <span className="text-xl font-bold text-white">BlurtBox</span>
          </div>
          <p className="text-sm mb-6 max-w-md mx-auto">
            Express yourself freely. Connect anonymously. Share your thoughts
            without boundaries.
          </p>
          <div className="flex justify-center space-x-6 mb-8">
            {/* We map over the `footerLinks` array to avoid repeating Link components. */}
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-400 hover:text-purple-400 transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
          <p className="text-xs text-gray-500">
            {/* Automatically updates the year to the current year. */}
            {/* &copy; {new Date().getFullYear()} BlurtBox. All rights reserved. */}
            &copy; 2025 BlurtBox. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
