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
  const isPrev = direction === "prev";
  const direnctionIconSrc = "/icons/icon-arrow-right.svg";

  const buttonStyle = cn(
    "border-brand-gray-300 border flex h-10 w-10 justify-center items-center px-2 py-1 disabled:opacity-50 disabled:cursor-default",
    !disabled && "hover:bg-brand-gray-100 dark:hover:bg-dark-700",
    isPrev ? "rounded-l-[4px]" : "rounded-r-[4px]",
  );
  const imgStyle = cn(
    "bg-brand-gray-500 dark:bg-dark-200 h-5 w-5",
    "dark:text-dark-200",
    isPrev && "rotate-180",
  );

  return (
    <>
      <button disabled={disabled} onClick={onClick} className={cn(buttonStyle)}>
        <span
          className={cn(imgStyle)}
          style={{
            mask: `url(${direnctionIconSrc}) no-repeat center`,
            WebkitMask: `url(${direnctionIconSrc}) no-repeat center`,
            maskSize: "contain",
            WebkitMaskSize: "contain",
          }}
        />
      </button>
    </>
  );
}
