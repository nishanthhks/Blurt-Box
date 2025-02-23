import { CircleArrowRight } from "lucide-react";
import Link from "next/link";

export default function ModernAnimatedButtonVariant1({
  text,
  buttonText,
  buttonLink,
}: {
  text: string;
  buttonText: string;
  buttonLink: string;
}) {
  return (
    <>
      <style>
        {`
          @property --r2 {
            syntax: "<angle>";
            inherits: false;
            initial-value: 0deg;
          }

          @property --x {
            syntax: "<length>";
            inherits: false;
            initial-value: 20px;
          }

          .rotation-animation {
            animation: rotationKeyFrames -.64s linear 3s infinite, translationKeyFrames -.64s linear 3s infinite;
          }

          @keyframes rotationKeyFrames {
            0% { --r2: 0deg; }
            32.8228% { --r2: 0deg; }
            50% { --r2: 180deg; }
            82.8228% { --r2: 180deg; }
            100% { --r2: 360deg; }
          }

          @keyframes translationKeyFrames {
            0% { --x: 20px; }
            32.8228% { --x: 180px; }
            50% { --x: 180px; }
            82.8228% { --x: 20px; }
            100% { --x: 20px; }
          }
        `}
      </style>
      <div
        className="rotation-animation transform-gpu cursor-pointer rounded-full p-px shadow-[0_0_20px_0_rgba(128,0,128,0.3)] transition-all hover:bg-[#6a0dad] hover:shadow-[0_0_20px_3px_rgba(128,0,128,.5)]"
        style={{
          background:
            "conic-gradient(from calc(var(--r2) - 80deg) at var(--x) 15px, transparent 0, #b19cd9 20%, transparent 25%), #4b0082",
        }}>
        <span className="flex h-7 flex-nowrap items-center gap-2 rounded-full bg-[#3b007d] px-3 py-6 sm:px-4 sm:p-6 font-medium text-[#d8b9ff] text-sm tracking-tighter">
          <span className="sm:text-md">{text}</span>
          <Link
            href={buttonLink} // Using dynamic buttonLink
            className="inline-flex sm:text-md gap-2 items-center bg-purple-700 text-white border border-purple-500 px-3 rounded-full text-sm py-1">
            {buttonText} <CircleArrowRight />
          </Link>
        </span>
      </div>
    </>
  );
}
