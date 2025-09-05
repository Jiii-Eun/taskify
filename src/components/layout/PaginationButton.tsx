import Image from "next/image";

import { cn } from "@/lib/utils/cn";

type paginationprops = {
  direction: "prev" | "next";
  disabled: boolean;
  onClick: () => void;
};

export default function PaginationButton({
  direction,
  disabled = false,
  onClick,
}: paginationprops) {
  const buttonStyle = cn(
    "border-brand-gray-300 border flex h-10 w-10 justify-center px-2 py-1 disabled:opacity-50 disabled:cursor-default",
  );
  const imgStyle = cn("caret-brand-gray-500 disabled:to-brand-gray-300");
  const isPrev = direction === "prev";

  return (
    <>
      <button
        disabled={disabled}
        onClick={onClick}
        className={cn(buttonStyle, isPrev ? "rounded-l-[4px]" : "rounded-r-[4px]")}
      >
        <Image
          src={"/icons/icon-arrow-right.svg"}
          alt={direction}
          width={16}
          height={16}
          className={cn(imgStyle, isPrev && "rotate-180")}
        />
      </button>
    </>
  );
}
