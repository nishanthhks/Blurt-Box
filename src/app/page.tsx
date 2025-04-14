import ModernAnimatedButtonVariant1 from "@/components/custom/ModernAnimatedButtonVariant1";
import Navbar from "@/components/Navbar";
import NewNavbar from "@/components/NewNavbar";
import {
  CircleArrowRight,
  Shield,
  MessageSquare,
  Lock,
  Heart,
  Send,
  Users,
  Sparkles,
  Zap,
} from "lucide-react";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <NewNavbar />
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

      {/* Features Section */}
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group hover:border-purple-200">
              <div className="bg-purple-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-purple-200 transition-colors">
                <Shield className="w-8 h-8 text-purple-700" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Complete Anonymity
              </h3>
              <p className="text-gray-600">
                Your identity remains protected. Share thoughts freely without
                fear of judgment.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group hover:border-purple-200">
              <div className="bg-purple-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-purple-200 transition-colors">
                <MessageSquare className="w-8 h-8 text-purple-700" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Instant Feedback
              </h3>
              <p className="text-gray-600">
                Receive honest messages and feedback from your network
                instantly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="relative">
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center h-full">
                <div className="bg-purple-100 w-20 h-20 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <Users className="w-10 h-10 text-purple-700" />
                </div>
                <span className="absolute -top-4 -left-4 w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                  1
                </span>
                <h3 className="text-2xl font-semibold mb-4">
                  Create Your Link
                </h3>
                <p className="text-gray-600">
                  Sign up in seconds and get your unique BlurtBox link to share
                  with the world.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center h-full">
                <div className="bg-purple-100 w-20 h-20 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <Send className="w-10 h-10 text-purple-700" />
                </div>
                <span className="absolute -top-4 -left-4 w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                  2
                </span>
                <h3 className="text-2xl font-semibold mb-4">
                  Share With Friends
                </h3>
                <p className="text-gray-600">
                  Share your link on social media or directly with friends and
                  followers.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center h-full">
                <div className="bg-purple-100 w-20 h-20 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <Heart className="w-10 h-10 text-purple-700" />
                </div>
                <span className="absolute -top-4 -left-4 w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                  3
                </span>
                <h3 className="text-2xl font-semibold mb-4">
                  Receive Messages
                </h3>
                <p className="text-gray-600">
                  Get anonymous messages, confessions, and honest feedback in
                  your dashboard.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <Link
              href="/sign-up"
              className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105">
              Get Started Now
              <Zap className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-6">
            <Sparkles className="w-6 h-6 text-purple-400 mr-2" />
            <span className="text-xl font-bold text-white">BlurtBox</span>
          </div>
          <p className="text-sm mb-6 max-w-md mx-auto">
            Express yourself freely. Connect anonymously. Share your thoughts
            without boundaries.
          </p>
          <div className="flex justify-center space-x-6 mb-8">
            <Link
              href="/disclaimer"
              className="text-gray-400 hover:text-purple-400 transition-colors">
              Disclaimer
            </Link>
            <Link
              href="/privacy-policy"
              className="text-gray-400 hover:text-purple-400 transition-colors">
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-gray-400 hover:text-purple-400 transition-colors">
              Terms of Service
            </Link>
          </div>
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} BlurtBox. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
