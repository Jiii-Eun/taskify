import MyButton from "@/components/layout/Button";
import { cn } from "@/lib/utils/cn";

type NavButtonProps = {
  src: string;
  label: string;
  onClick?: () => void;
  className?: string;
};

export default function NavButton({ src, label, onClick = () => {}, className }: NavButtonProps) {
  return (
    <MyButton
      onClick={onClick}
      className={cn(
        `flex items-center justify-center bg-transparent px-3 text-xl font-medium ${className}`,
        "hover:bg-brand-gray-200",
        "dark:hover:bg-dark-700 dark:border-dark-600",
      )}
    >
      <span
        className={cn(
          "tablet:inline-block bg-brand-gray-500 mr-2 hidden h-4 w-4",
          "dark:bg-dark-200",
        )}
        style={{
          mask: `url(${src}) no-repeat center`,
          WebkitMask: `url(${src}) no-repeat center`,
          maskSize: "contain",
          WebkitMaskSize: "contain",
        }}
      />
      <span className={cn("text-brand-gray-500 pc:text-base text-sm", "dark:text-dark-200")}>
        {label}
      </span>
    </MyButton>
  );
}
