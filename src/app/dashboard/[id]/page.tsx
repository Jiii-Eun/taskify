"use client";

import { useState } from "react";

import Chip from "@/components/chip/Chip";
import Column from "@/components/column/Column";
import MyButton from "@/components/layout/Button";

import CreateCardModal from "../components/cardModal/CreateCardModal";
import CreateColumnModal from "../components/columModal/CreateColumnModal";
import type { ColumnData } from "../types";

export default function DashboardId() {
  // 모달 오픈
  const [modal, setModal] = useState<null | "card" | "column">(null);
  // 컬럼 설정 부분의 수정, 삭제 선택하는 캐밥 모달 부분
  const [isKebabOpen, setIsKebabOpen] = useState<number | null>(null);
  // 선택한 모달 번호 확인
  const [isActiveCol, setActiveCol] = useState<number | null>(null);
  // title과 id는 컬럼 생성 모달에서, 카드는 카드생성 모달에서 들고옴
  const [columns, setColumns] = useState<ColumnData[]>([
    {
      title: "To Do",
      id: 0,
      cards: [
        {
          title: "새로운 일정 관리 Taskify",
          description: "설명글",
          dueDate: "2022.12.31",
          tags: ["프로젝트", "백엔드", "상"],
          imageUrl: "/images/img-card-pink.svg",
          author: "B",
        },
      ],
    },
    { title: "On Progress", id: 1, cards: [] },
    { title: "On Done", id: 2, cards: [] },
  ]);

  return (
    <main className="pc:flex-row bg-brand-gray-100 flex flex-1 flex-col">
      {columns.map((item, i) => (
        <Column
          key={i}
          status={item.title}
          cards={item.cards ?? []}
          onAddCard={() => {
            setActiveCol(item.id);
            setModal("card");
          }}
          kebabIndex={isKebabOpen === i}
          // 클릭한 index만 열기
          isKebabOpen={() => setIsKebabOpen((prev) => (prev === i ? null : i))}
          columnId={item.id}
          setColumns={setColumns}
        />
      ))}
      {/* 새로운 컬럼 추가 버튼 */}
      <div className="pc:pt-17 pc:w-[354px] mx-5 py-5">
        {/* 새로운 컬럼 추가 버튼 */}
        <MyButton
          onClick={() => {
            setModal("column");
          }}
          className="border-brand-gray-300 flex h-[70px] w-full items-center justify-center border bg-white"
        >
          <span className="mr-3 text-lg font-bold">새로운 컬럼 추가하기</span>
          <Chip variant="add" />
        </MyButton>
      </div>
      {modal === "card" && isActiveCol !== null && (
        <CreateCardModal
          isOpen
          setIsOpen={() => setModal(null)}
          setColumns={setColumns}
          isActiveCol={isActiveCol}
        />
      )}
      {modal === "column" && (
        <CreateColumnModal isOpen setIsOpen={() => setModal(null)} setColumns={setColumns} />
      )}
    </main>
  );
}
