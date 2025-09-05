import { ComponentPropsWithRef } from "react";

export type Option = { value: string; label: string; disabled?: boolean };

type Native = ComponentPropsWithRef<"select">;

type SelectProps = Omit<Native, "children" | "id" | "aria-invalid" | "aria-errormessage"> & {
  options: Option[];
  placeholder?: string;
};

export default function Select({ options, placeholder, className = "", ...rest }: SelectProps) {
  const classes = [
    "block w-full appearance-none",
    "h-[26px] pr-[11px]",
    "rounded-md border bg-white",
    "text-[16px] text-[#333236]",
    "[&[aria-invalid='true']]:border-red-500 [&[aria-invalid='true']]:focus:border-red-500 [&[aria-invalid='true']]:focus:ring-red-500",
    className,
  ].join(" ");

  return (
    <div className="relative">
      <select className={classes} {...rest}>
        {placeholder && (
          <option value="" disabled hidden>
            {placeholder}
          </option>
        )}
        {options.map((o) => (
          <option key={o.value} value={o.value} disabled={o.disabled}>
            {o.label}
          </option>
        ))}
      </select>
      <span
        aria-hidden
        className="absolute inset-y-0 right-0 flex w-[26px] items-center justify-center"
      >
        {/* 드롭다운 아이콘 */}
        <svg></svg>
      </span>
    </div>
  );
}
