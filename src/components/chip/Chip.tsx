"use client";

import Image from "next/image";

import checkIcon from "./icon-check.svg";
import plusIcon from "./icon-plus.svg";

type ChipProps = {
  variant: "status" | "category" | "color" | "badge" | "add";
  label?: string;
  color?: string;
  onClick?: () => void;
  className?: string;
  size?: "sm" | "md";
  selected?: boolean;
};

export default function Chip({
  variant,
  label,
  color,
  onClick,
  className = "",
  size = "md",
  selected = false,
}: ChipProps) {
  switch (variant) {
    /** 상태 칩 (• To Do / On Progress / Done) */
    case "status":
      return (
        <span
          className={
            "inline-flex h-[26px] min-w-[57px] items-center rounded-full px-2 " +
            "bg-[#E2ECFF] text-xs text-[#2661E8]" +
            className
          }
        >
          <span
            aria-hidden
            className="mr-2 inline-block h-[6px] w-[6px] shrink-0 rounded-full bg-[#2661E8]"
          />
          {label}
        </span>
      );

    /** 카테고리 칩 (프로젝트, 일반, 백엔드 등) */
    case "category":
      return (
        <span
          className={
            "inline-flex h-7 min-w-[25px] items-center justify-center rounded px-[6px] text-sm " +
            "bg-[#F9EEE3] text-[#D58D49]" +
            className
          }
        >
          {label}
        </span>
      );

    /** 색상 칩 (원형 색 선택) */
    case "color": {
      const colorSizeClasses = size === "sm" ? "h-7 w-7" : "h-[30px] w-[30px]";
      const checkIconSize = size === "sm" ? "h-[22px] w-[22px]" : "h-6 w-6";
      return (
        <button
          type="button"
          aria-label={`color ${color}`}
          onClick={onClick}
          className={`relative flex items-center justify-center rounded-full ${colorSizeClasses} ${className}`}
          style={{ backgroundColor: color }}
        >
          {selected && (
            <Image src={checkIcon} alt="선택됨" width={24} height={24} className={checkIconSize} />
          )}
        </button>
      );
    }

    /** 숫자 칩 */
    case "badge":
      return (
        <span
          className={
            "inline-flex h-5 min-w-5 items-center justify-center rounded " +
            "bg-[#EEEEEE] px-[6px] text-xs font-medium text-[#787486]" +
            className
          }
        >
          {label}
        </span>
      );

    /** + 버튼 칩 (카드 추가 버튼) */
    case "add": {
      const plusSizeClasses = size === "sm" ? "h-5 w-5" : "h-[22px] w-[22px]";
      const plusIconSize = size === "sm" ? 14.5 : 16;

      return (
        <div
          className={`inline-flex items-center justify-center rounded bg-[#E2ECFF] ${plusSizeClasses} ${className}`}
        >
          <Image
            src={plusIcon}
            alt="추가"
            width={plusIconSize}
            height={plusIconSize}
            aria-hidden="true"
          />
          <span className="sr-only">추가</span>
        </div>
      );
    }

    default:
      return null;
  }
}
