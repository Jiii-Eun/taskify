"use client";

import { useState } from "react";

import NewDashboardModal from "@/components/CreateDashboardModal";
import { cn } from "@/lib/utils/cn";

import { CreateData } from ".";
import MyButton from "../../Button";

export default function AddDashboard({
  handleCreate,
}: {
  handleCreate: (data: CreateData) => Promise<void>;
}) {
  const addIconSrc = "/icons/icon-box-add.svg";

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="tablet:mb-4 mb-6 flex w-full justify-center">
        <MyButton
          className="tablet:justify-between tablet:w-full flex justify-center border-0 bg-transparent"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          <div
            className={cn(
              "tablet:flex text-brand-gray-500 hidden text-xs font-semibold",
              "dark:text-dark-200",
            )}
          >
            Dash Boards
          </div>
          {/* 이미지 색상 바꾸기 위해서 svg라이브러리 설치해도 좋았을거같다. */}
          <span
            className={cn("bg-brand-gray-500 h-5 w-5", "dark:bg-brand-gray-200")}
            style={{
              mask: `url(${addIconSrc}) no-repeat center`,
              WebkitMask: `url(${addIconSrc}) no-repeat center`,
              maskSize: "contain",
              WebkitMaskSize: "contain",
            }}
          />
        </MyButton>
        {isOpen && (
          <NewDashboardModal
            open={isOpen}
            onCreate={(name, selectedColor) => handleCreate({ title: name, color: selectedColor })}
            onClose={() => setIsOpen(false)}
          />
        )}
      </div>
    </>
  );
}
