interface BadgeShineProps {
  text: string;
  children?: React.ReactNode;
}

const BadgeShine = ({ text }: BadgeShineProps) => {
  return (
    <span className="inline-flex h-full animate-background-shine cursor-pointer items-center justify-center rounded border border-gray-800 bg-[linear-gradient(110deg,#000,45%,#4D4B4B,55%,#000)] bg-[length:250%_100%] px-3 py-1.5 text-sm sm:text-lg text-gray-300">
      {text}
    </span>
  );
};

export default BadgeShine;
