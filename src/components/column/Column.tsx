"use client";
import clsx from "clsx";
import { useState } from "react";

import DeleteColumnModal from "@/app/dashboard/components/columModal/DeleteColumnModal";
import ManageColumnModal from "@/app/dashboard/components/columModal/ManageColumnModal";
import type { ColumnProps } from "@/app/dashboard/types";
import Card from "@/components/card/Card";
import Chip from "@/components/chip/Chip";
import KebabModal from "@/components/KebabModal";
import MyButton from "@/components/layout/Button";
import Button from "@/components/layout/Button";

export default function Column({
  status,
  cards,
  onAddCard,
  kebabIndex,
  isKebabOpen,
  columnId,
  setColumns,
}: ColumnProps) {
  const [modal, setModal] = useState<null | "manage" | "delete">(null);

  return (
    <div
      className={clsx(
        // 기본 (mobile)
        "border-b border-[#D9D9D9] bg-[#FAFAFA] p-5",

        // tablet
        "tablet:w-full",

        // pc
        "pc:w-[354px] pc:border-r pc:border-b-0",
      )}
      onClick={() => console.log("컬럼클릭시 id 숫자", columnId)}
    >
      {/* 컬럼 헤더 */}
      <div className="relative mb-[21px] flex items-center justify-between">
        <div className="flex items-center gap-[12px]">
          {/* 컬럼 이름 */}
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#2661E8]" />
            <h2 className="text-2lg font-bold text-[#000000]">{status}</h2>
          </span>
          {/* 숫자 칩 */}
          <Chip variant="badge" label={cards.length.toString()} />
        </div>
        {/* 설정 버튼 */}
        <button type="button" onClick={isKebabOpen}>
          <img src="/icons/icon-settings.svg" alt="설정" className="h-6 w-6" />
        </button>
        {kebabIndex && (
          <KebabModal className="top-8 right-0">
            <Button onClick={() => setModal("manage")} className="h-8 w-20" color="buttonWhite">
              수정하기
            </Button>
            <Button onClick={() => setModal("delete")} className="h-8 w-20" color="buttonWhite">
              삭제하기
            </Button>
          </KebabModal>
        )}
      </div>

      {/* 카드 추가 버튼 */}
      <div className="mb-4">
        <MyButton
          onClick={onAddCard ?? (() => {})}
          color="buttonBasic"
          className="flex h-10 w-full items-center justify-center"
        >
          <Chip variant="add" />
        </MyButton>
      </div>

      {/* 카드 리스트 */}
      <div className="flex flex-col gap-[15px]">
        {cards.map((card, index) => (
          <Card key={index} {...card} />
        ))}
      </div>
      {/* 수정하기, 삭제하기 모달 관리  */}
      {modal === "manage" && columnId !== null && (
        <ManageColumnModal
          isOpen
          setIsOpen={() => setModal(null)}
          columnId={columnId}
          setColumns={setColumns}
        />
      )}
      {modal === "delete" && columnId !== null && (
        <DeleteColumnModal
          isOpen
          setIsOpen={() => setModal(null)}
          columnId={columnId}
          setColumns={setColumns}
        />
      )}
    </div>
  );
}
