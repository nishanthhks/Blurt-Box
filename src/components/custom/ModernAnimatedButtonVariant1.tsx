import { CircleArrowRight } from "lucide-react";

export default function ModernAnimatedButtonVariant1({
    text,
  }: {
    text: string;
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
              0% {
                --r2: 0deg;
              }
              32.8228% {
                --r2: 0deg;
              }
              50% {
                --r2: 180deg;
              }
              82.8228% {
                --r2: 180deg;
              }
              100% {
                --r2: 360deg;
              }
            }
  
            @keyframes translationKeyFrames {
              0% {
                --x: 20px;
              }
              32.8228% {
                --x: 180px;
              }
              50% {
                --x: 180px;
              }
              82.8228% {
                --x: 20px;
              }
              100% {
                --x: 20px;
              }
            }
          `}
        </style>
        <button
          className="rotation-animation transform-gpu cursor-pointer rounded-full p-px shadow-[0_0_20px_0_rgba(128,0,128,0.3)] transition-all hover:bg-[#6a0dad] hover:shadow-[0_0_20px_3px_rgba(128,0,128,.5)]"
          style={{
            background:
              "conic-gradient(from calc(var(--r2) - 80deg) at var(--x) 15px, transparent 0, #b19cd9 20%, transparent 25%), #4b0082",
          }}
          type="button"
        >
            
          <span className="pointer-events-none flex  h-7 flex-nowrap items-center gap-2 rounded-full bg-[#3b007d] px-3 py-6 sm:px-6 sm:py-7 font-medium text-[#d8b9ff] text-sm tracking-tighter">
            <span className="sm:text-xl">{text}</span>
            <div className="inline-flex sm:text-lg gap-2 items-center bg-purple-700 text-white border border-purple-500 px-3 rounded-full text-sm py-1">
            Sign Up <CircleArrowRight />
            </div>
          </span>
        </button>
      </>
    );
  }