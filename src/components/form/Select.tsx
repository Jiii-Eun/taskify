"use client";
import Image from "next/image";
import { useState } from "react";

import { cn } from "@/lib/utils/cn";

export type Option = {
  value: string;
  label: string;
  chip?: React.ReactNode;
  disabled?: boolean;
};

type SelectProps = {
  options: Option[];
  placeholder?: string;
  className?: string;
  labelNone?: boolean;
};

export default function Select({
  options,
  placeholder,
  className = "",
  labelNone = false,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<Option | null>(null);

  const btnClass = [
    "relative w-full",
    "h-12 px-4",
    "rounded-lg border bg-white",
    "text-[16px] text-[#333236] text-left",
    className,
  ].join(" ");

  return (
    <div className="relative">
      <button type="button" onClick={() => setIsOpen((o) => !o)} className={btnClass}>
        {selected ? (selected.chip ?? selected.label) : placeholder}
        <Image
          src="/icons/icon-arrow-dropdown.svg"
          width={26}
          height={26}
          alt="선택 화살표 아이콘"
          className="absolute top-1/2 right-4 -translate-y-1/2"
        />
      </button>

      {isOpen && (
        <ul className="absolute top-full left-0 z-10 mt-0.5 w-full rounded-md border bg-white shadow">
          {options.map((item) => (
            <li
              key={item.value}
              onClick={() => {
                setSelected(item);
                setIsOpen(false);
              }}
              className="flex h-12 cursor-pointer items-center px-4 hover:bg-gray-100"
            >
              {selected?.value === item.value && (
                <Image
                  src="/icons/icon-dropdown-check.svg"
                  width={22}
                  height={22}
                  alt="선택됨 체크 아이콘"
                  className="absolute"
                />
              )}
              <span className="pl-[30px]"> {item.chip}</span>
              <span className={cn(labelNone && "hidden", "pl-[30px]")}>{item.label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
