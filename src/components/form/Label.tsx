import { cn } from "@/lib/utils/cn";

type LabelProps = {
  children: React.ReactNode;
  essential?: boolean;
  className?: string;
};

export default function Label({ children, essential = false, className }: LabelProps) {
  return (
    <span className={cn("mb-2 inline-block", className)}>
      {children}
      {essential && <span className="text-brand-blue-500 pt-0.5 pl-0.5 text-lg">*</span>}
    </span>
  );
}
