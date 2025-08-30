"use client";

import PlusIcon from "./icon-plus.svg";

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
            "inline-flex h-[26px] min-w-[57px] items-center rounded-full px-[8px] " +
            "bg-[#E2ECFF] text-xs-regular text-[#2661E8]" +
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
            "text-sm-regular inline-flex h-[28px] min-w-[25px] items-center justify-center rounded-[4px] px-[6px] " +
            "bg-[#F9EEE3] text-[#D58D49]" +
            className
          }
        >
          {label}
        </span>
      );

    /** 색상 칩 (원형 색 선택) */
    case "color": {
      const colorSizeClasses = size === "sm" ? "h-[28px] w-[28px]" : "h-[30px] w-[30px]";
      const checkIconSize = size === "sm" ? "h-[22px] w-[22px]" : "h-[24px] w-[24px]";
      return (
        <button
          type="button"
          aria-label={`color ${color}`}
          onClick={onClick}
          className={`relative flex items-center justify-center rounded-full ${colorSizeClasses} ${className}`}
          style={{ backgroundColor: color }}
        >
          {selected && <img src="./icon-check.svg" alt="선택됨" className={checkIconSize} />}
        </button>
      );
    }

    /** 숫자 칩 */
    case "badge":
      return (
        <span
          className={
            "inline-flex h-[20px] min-w-[20px] items-center justify-center rounded-[4px] " +
            "bg-[#EEEEEE] px-[6px] text-xs-medium text-[#787486]" +
            className
          }
        >
          {label}
        </span>
      );

    /** + 버튼 칩 (카드 추가 버튼) */
    case "add": {
      const plusSizeClasses =
        size === "sm" ? "h-[20px] w-[20px] text-base" : "h-[22px] w-[22px] text-lg";
      const plusIconSize = size === "sm" ? "w-[14.5px] h-[14.5px]" : "w-[16px] h-[16px]";

      return (
        <button
          type="button"
          aria-label="add"
          onClick={onClick}
          className={`inline-flex items-center justify-center rounded-[4px] bg-[#E2ECFF] ${plusSizeClasses} ${className}`}
        >
          <PlusIcon aria-hidden className={plusIconSize} />
          <span className="sr-only">추가</span>
        </button>
      );
    }

    default:
      return null;
  }
}
