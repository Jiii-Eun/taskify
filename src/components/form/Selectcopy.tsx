import { ComponentPropsWithRef } from "react";
//import ArrowDropIcon from "@/assets/icons/icon-arrow-dropdown.svg";

export type Option = { value: string; label: string; chip?: React.ReactNode; disabled?: boolean };

type Native = ComponentPropsWithRef<"select">;

type SelectProps = Omit<Native, "children" | "id" | "aria-invalid" | "aria-errormessage"> & {
  options: Option[];
  placeholder?: string;
};

export default function Select({ options, placeholder, className = "", ...rest }: SelectProps) {
  const classes = [
    "block w-full appearance-none",
    "h-[48px] px-[16px]",
    "rounded-lg border bg-white",
    "text-[16px] text-[#333236]",
    "[&[aria-invalid='true']]:border-red-500 [&[aria-invalid='true']]:focus:border-red-500 [&[aria-invalid='true']]:focus:ring-red-500",
    className,
  ].join(" ");

  return (
    <div className="relative">
      <label htmlFor="isSelect"></label>
      <select id="isSelect" className={classes} {...rest}>
        {placeholder && (
          <option value="" disabled hidden>
            {placeholder}
          </option>
        )}
        {options.map((o) => (
          <option key={o.value} value={o.value} disabled={o.disabled}>
            {o.chip}
            {o.label}
          </option>
        ))}
      </select>
      {/* <span
        aria-hidden
        className="absolute inset-y-0 right-4 flex w-[26px] items-center justify-center"
      >
        <ArrowDropIcon className="w-[26px] pr-[10px] text-[#333236]" />
      </span> */}
    </div>
  );
}
