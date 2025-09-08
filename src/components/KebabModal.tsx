import { cn } from "@/lib/utils/cn";

type KebabProps = {
  children: React.ReactNode;
  className?: string;
};

export default function KebabModal({ children, className }: KebabProps) {
  return (
    <div
      className={cn(
        "absolute",
        "flex flex-col px-1.5 py-[7px]",
        "rounded-md border border-[#D9D9D9] bg-white",
        className,
      )}
    >
      {children}
    </div>
  );
}
