"use client";
import React from "react";
import { Box, CircleArrowRight } from "lucide-react";
import Link from "next/link";
import BadgeShine from "./custom/BadgeShine";

function NewNavbar() {
  return (
    <nav className="sticky top-0 z-50 flex justify-between items-center p-4 bg-white/80 backdrop-blur-md shadow-md border-b border-gray-300 px-6 md:px-16 xl:px-40">
      {/* left */}
      <div>
        <Link href="/" className="flex items-center">
          <Box className="w-8 h-8" />
          <div className="flex text-2xl sm:text-3xl text-gray-500">
            <span className="text-purple-700 font-bold">Blurt</span>{" "}
            <span className="font-bold">Box</span>
          </div>
        </Link>
      </div>
      {/* right */}
      <div className="flex gap-2 items-center">
        <BadgeShine text="Login"></BadgeShine>
        <div className="inline-flex sm:text-lg gap-2 items-center bg-purple-700 text-white border border-purple-500 px-3 rounded  text-sm py-1 sm:py-1.5">
          Sign Up <CircleArrowRight />
        </div>
      </div>
    </nav>
  );
}

export default NewNavbar;
