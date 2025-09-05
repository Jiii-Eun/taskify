"use client";

import { useState } from "react";

import Chip from "@/components/chip/Chip";
import Input from "@/components/form/Input";
import Label from "@/components/form/Label";
import MyButton from "@/components/layout/Button";

export default function DashboardIdEdit() {
  const colors = ["#7AC555", "#760DDE", "#FFA500", "#E876EA", "#76A5EA"];
  const [selectedColor, setSelectedColor] = useState("#7AC555");

  const members = [
    { id: 1, name: "정만철" },
    { id: 2, name: "김태순" },
    { id: 3, name: "최주협" },
    { id: 4, name: "윤지현" },
  ];
  const invites = [
    { id: 1, email: "codeitA@codeit.com" },
    { id: 2, email: "codeitB@codeit.com" },
    { id: 3, email: "codeitC@codeit.com" },
    { id: 4, email: "codeitD@codeit.com" },
    { id: 5, email: "codeitE@codeit.com" },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA] px-6 py-8">
      {/* 전체 컨테이너 */}
      <div className="mx-auto flex w-full max-w-155 flex-col gap-[15px]">
        {/* 돌아가기 버튼 */}
        <button className="mb-5 text-left text-base font-medium text-[#333236]">
          &lt; 돌아가기
        </button>

        {/* 대시보드 이름 + 색상 */}
        <section className="rounded-lg bg-white px-7 py-8 shadow-sm">
          <h2 className="mb-[23px] text-2xl font-bold">비브리지</h2>
          <div className="flex flex-col gap-4">
            <div>
              <Label className="text-2lg font-medium">대시보드 이름</Label>
              <Input placeholder="대시보드 이름" defaultValue="뉴프로젝트" />
            </div>

            <div className="mb-6 flex items-center gap-2">
              {colors.map((c) => (
                <Chip
                  key={c}
                  variant="color"
                  color={c}
                  selected={c === selectedColor}
                  onClick={() => setSelectedColor(c)}
                />
              ))}
            </div>

            <MyButton
              onClick={() => alert("대시보드 변경")}
              color="buttonBlue"
              className="h-[54px] w-full text-base font-semibold text-white"
            >
              변경
            </MyButton>
          </div>
        </section>

        {/* 구성원 리스트 */}
        <section className="rounded-lg bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-2xl font-bold">구성원</h3>
            <span className="text-sm text-[#333236]">1 페이지 중 1</span>
          </div>
          {/* 라벨 */}
          <div>
            <Label className="text-sm text-[#9FA6B2]">이름</Label>
          </div>
          <ul>
            {members.map((m, idx) => (
              <li
                key={m.id}
                className={`flex h-[70px] items-center justify-between py-3 ${
                  idx !== members.length - 1 ? "border-b border-gray-200" : ""
                }`}
              >
                <span className="text-sm">{m.name}</span>
                <MyButton
                  onClick={() => alert(`${m.name} 삭제`)}
                  color="buttonBasic"
                  className="h-8 w-21 rounded-md px-3 py-1 text-sm font-medium text-[#2661E8]"
                >
                  삭제
                </MyButton>
              </li>
            ))}
          </ul>
        </section>

        {/* 초대 내역 */}
        <section className="rounded-lg bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-2xl font-bold">초대 내역</h3>
            <MyButton
              onClick={() => alert("초대하기")}
              color="buttonBlue"
              className="h-8 w-[105px] rounded-md text-sm text-white"
            >
              초대하기
            </MyButton>
          </div>
          {/* 라벨 */}
          <div>
            <Label className="text-sm text-[#9FA6B2]">이메일</Label>
          </div>
          <ul>
            {invites.map((i, idx) => (
              <li
                key={i.id}
                className={`flex h-[70px] items-center justify-between py-3 ${
                  idx !== invites.length - 1 ? "border-b border-gray-200" : ""
                }`}
              >
                <span className="text-sm">{i.email}</span>
                <MyButton
                  onClick={() => alert(`${i.email} 취소`)}
                  color="buttonBasic"
                  className="h-8 w-21 rounded-md px-3 py-1 text-sm font-medium text-[#2661E8]"
                >
                  취소
                </MyButton>
              </li>
            ))}
          </ul>
        </section>

        {/* 삭제 버튼 */}
        <MyButton
          onClick={() => alert("대시보드 삭제")}
          color="buttonBasic"
          className="text-2lg h-[62px] w-80 font-medium text-[#333236]"
        >
          대시보드 삭제하기
        </MyButton>
      </div>
    </div>
  );
}
