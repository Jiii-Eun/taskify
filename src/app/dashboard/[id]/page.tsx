"use client";

import Chip from "@/components/chip/Chip";
import Column from "@/components/column/Column";
import MyButton from "@/components/layout/Button";

export default function DashboardId() {
  const cards = [
    {
      title: "새로운 일정 관리 Taskify",
      tags: ["프로젝트", "백엔드", "상"],
      date: "2022.12.31",
      image: "/images/img-card-pink.svg",
      author: "B",
    },
    {
      title: "새로운 일정 관리 Taskify",
      tags: ["프로젝트", "백엔드", "상"],
      date: "2022.12.31",
      image: "/images/img-card-blue.svg",
      author: "B",
    },
    {
      title: "새로운 일정 관리 Taskify",
      tags: ["프로젝트", "백엔드", "상"],
      date: "2022.12.31",
      image: "/images/img-card-lime.svg",
      author: "B",
    },
  ];

  return (
    <main className="flex flex-1">
      <Column
        status="To Do"
        count={cards.length}
        cards={cards}
        onAddCard={() => alert("카드 추가")}
      />
      <Column
        status="On Progress"
        count={cards.length}
        cards={cards}
        onAddCard={() => alert("카드 추가")}
      />
      <Column
        status="Done"
        count={cards.length}
        cards={cards}
        onAddCard={() => alert("카드 추가")}
      />

      {/* 새로운 컬럼 추가 버튼 */}
      <MyButton
        onClick={() => alert("새 컬럼 추가")}
        className="mt-17 ml-5 flex h-[70px] w-[354px] items-center justify-center border border-[#D9D9D9] bg-white"
      >
        <span className="mr-3 text-lg font-bold">새로운 컬럼 추가하기</span>
        <Chip variant="add" />
      </MyButton>
    </main>
  );
}