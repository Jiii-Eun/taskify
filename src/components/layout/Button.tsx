"use client";

import { ReactNode } from "react";

interface MyButtonProps {
  //text: string;
  children: ReactNode;
  onClick: () => void;
  className?: string;
  color?: "buttonBasic" | "buttonBlue" | "buttonGrey" | "buttonWhite";
  disabled?: boolean;
}

/*기본은 primary며, primary는 흰바탕, secondary는 보라배경, danger는 회색배경입니다*/
export default function MyButton({
  children,
  onClick,
  className = "",
  color = "buttonBasic",
}: MyButtonProps) {
  const colorClasses = {
    buttonBasic: "bg-[#ffffff] border border-[#d9d9d9]",
    buttonBlue: "bg-[#4276EC] border border-[#4276EC] text-white",
    buttonGrey: "bg-[#9FA6B2] border border-[#9FA6B2]",
    buttonWhite: "bg-white border border-white hover:bg-brand-blue-50",
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`cursor-pointer rounded-lg text-sm ${className} ${colorClasses[color]}`}
      disabled={false}
    >
      {children}
    </button>
  );
}
