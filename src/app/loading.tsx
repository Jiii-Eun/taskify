import { cn } from "@/lib/utils/cn";

export default function Loading() {
  return (
    <div className="bg-brand-gray-100 flex h-screen items-center justify-center">
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className={cn(
          "h-[180px] w-[180px]",
          "tablet:h-[250px] tablet:w-[250px]",
          "pc:h-[280px] pc:w-[280px]",
        )}
      >
        <source src="/video/Puzzle_Loader.webm" type="video/webm" />
      </video>
    </div>
  );
}
