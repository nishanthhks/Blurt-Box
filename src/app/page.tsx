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
} from "lucide-react";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export default function Home() {
  return (
    <>
      {/* <Navbar /> */}
      <NewNavbar />
      <section className="mt-8 sm:mt-11 px-4 sm:px-10 md:px-16 xl:px-48">
        <div className="container mx-auto text-center flex flex-col items-center">
          <h1 className="flex flex-col items-center text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-gray-800 mb-3 sm:mb-4">
            Say It. Share It. Stay{" "}
            <div className="text-purple-700 inline-block text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
              Anonymous.
            </div>
          </h1>
          <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto px-2">
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
          <div className="w-full mt-10 transition-all duration-300 ease-in-out hover:scale-105">
            <AspectRatio ratio={16 / 9}>
              <Image
                src="/image.png"
                alt="Image"
                fill
                className="rounded-md object-cover transition-transform duration-300"
              />
            </AspectRatio>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-10 md:px-16 xl:px-48 bg-gradient-to-b from-white to-purple-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
            Why Choose <span className="text-purple-700">BlurtBox</span>?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="bg-purple-100 w-14 h-14 rounded-full flex items-center justify-center mb-6 mx-auto">
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
            <div className="bg-white p-6 px rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="bg-purple-100 w-14 h-14 rounded-full flex items-center justify-center mb-6 mx-auto">
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

            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="bg-purple-100 w-14 h-14 rounded-full flex items-center justify-center mb-6 mx-auto">
                <Lock className="w-8 h-8 text-purple-700" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Secure Platform
              </h3>
              <p className="text-gray-600">
                Advanced encryption and security measures to protect your data.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                <Users className="w-8 h-8 text-purple-700" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Create Your Link</h3>
              <p className="text-gray-600">
                Sign up and get your unique BlurtBox link
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                <Send className="w-8 h-8 text-purple-700" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Share With Friends</h3>
              <p className="text-gray-600">
                Share your link on social media or with friends
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                <Heart className="w-8 h-8 text-purple-700" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Receive Messages</h3>
              <p className="text-gray-600">
                Get anonymous messages and feedback
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}

      <footer className="bg-black text-gray-400 py-6 text-center">
        <p className="text-sm mb-2">
          &copy; {new Date().getFullYear()} BlurtBox. All rights reserved.
        </p>
        <div className="text-sm">
          <a href="/disclaimer" className="hover:text-purple-400 mx-2">
            Disclaimer
          </a>
          <span>•</span>
          <a href="/privacy-policy" className="hover:text-purple-400 mx-2">
            Privacy Policy
          </a>
        </div>
      </footer>
    </>
  );
}
