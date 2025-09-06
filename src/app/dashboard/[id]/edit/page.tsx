"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

import Chip from "@/components/chip/Chip";
import Input from "@/components/form/Input";
import Label from "@/components/form/Label";
import MyButton from "@/components/layout/Button";
import Pagination from "@/components/layout/Pagination";

export default function DashboardIdEdit() {
  const { id } = useParams<{ id: string }>();
  const dashboardId = id;

  const colors = ["#7AC555", "#760DDE", "#FFA500", "#E876EA", "#76A5EA"];
  const [selectedColor, setSelectedColor] = useState("#7AC555");

  const [memberPage, setMemberPage] = useState(1);
  const totalMemberPages = 2;

  const [invitePage, setInvitePage] = useState(1);
  const totalInvitePages = 2;

  const members = [
    { id: 1, name: "정만철", avatar: "/images/img-profile-sample.svg" },
    { id: 2, name: "김태순", avatar: "/images/img-profile-sample.svg" },
    { id: 3, name: "최주협", avatar: "/images/img-profile-sample.svg" },
    { id: 4, name: "윤지현", avatar: "/images/img-profile-sample.svg" },
  ];
  const invites = [
    { id: 1, email: "codeitA@codeit.com" },
    { id: 2, email: "codeitB@codeit.com" },
    { id: 3, email: "codeitC@codeit.com" },
    { id: 4, email: "codeitD@codeit.com" },
    { id: 5, email: "codeitE@codeit.com" },
  ];

  return (
    <div className="bg-brand-gray-100 min-h-screen p-6">
      {/* 전체 컨테이너 */}
      <div className="pc:max-w-155 flex w-full min-w-71 flex-col gap-[15px]">
        {/* 돌아가기 버튼 */}
        <Link
          href={`/dashboard/${dashboardId}`}
          className="tablet:text-base text-brand-gray-700 mb-1 flex text-left text-sm font-medium"
        >
          <img src="/icons/icon-arrow-left.svg" alt="돌아가기" className="mr-2" />
          돌아가기
        </Link>

        {/* 대시보드 이름 + 색상 */}
        <section className="tablet:px-7 tablet:py-8 rounded-lg bg-white px-4 py-5 shadow-sm">
          <h2 className="tablet:text-2xl mb-6 text-xl font-bold">비브리지</h2>
          <div className="flex flex-col gap-4">
            <div>
              <Label className="tablet:text-2lg text-lg font-medium">대시보드 이름</Label>
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
              className="tablet:text-base h-[54px] w-full text-sm font-semibold text-white"
            >
              변경
            </MyButton>
          </div>
        </section>

        {/* 구성원 리스트 */}
        <section className="tablet:p-6 rounded-lg bg-white px-4 py-5 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="tablet:text-2xl text-xl font-bold">구성원</h3>
            <div className="flex items-center gap-[15px]">
              <span className="tablet:text-sm text-brand-gray-700 text-xs">
                {totalMemberPages} 페이지 중 {memberPage}
              </span>
              <div className="[&>*]:mt-0 [&>*]:flex">
                <Pagination
                  page={memberPage}
                  setPage={setMemberPage}
                  totalPages={totalMemberPages}
                />
              </div>
            </div>
          </div>
          {/* 라벨 */}
          <div>
            <Label className="text-brand-gray-400 text-sm">이름</Label>
          </div>
          <ul>
            {members.map((m, idx) => (
              <li
                key={m.id}
                className={`flex h-[70px] items-center justify-between py-3 ${
                  idx !== members.length - 1 ? "border-b border-gray-200" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={m.avatar}
                    alt={m.name}
                    className="h-[38px] w-[38px] rounded-full object-cover"
                  />
                  <span className="text-sm">{m.name}</span>
                </div>
                <MyButton
                  onClick={() => alert(`${m.name} 삭제`)}
                  color="buttonBasic"
                  className="tablet:w-21 tablet:text-sm h-8 w-13 rounded-md px-3 py-1 text-xs font-medium text-[#2661E8]"
                >
                  삭제
                </MyButton>
              </li>
            ))}
          </ul>
        </section>

        {/* 초대 내역 */}
        <section className="tablet:p-6 rounded-lg bg-white px-4 py-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="tablet:text-2xl text-xl font-bold">초대 내역</h3>

            <div className="flex items-center gap-[15px]">
              <span className="tablet:text-sm text-brand-gray-700 text-xs">
                {totalInvitePages} 페이지 중 {invitePage}
              </span>

              <div className="[&>*]:mt-0 [&>*]:flex">
                <Pagination
                  page={invitePage}
                  setPage={setInvitePage}
                  totalPages={totalInvitePages}
                />
              </div>

              <MyButton
                onClick={() => alert("초대하기")}
                color="buttonBlue"
                className="tablet:flex hidden h-8 w-[105px] items-center justify-center gap-2 rounded-md text-sm text-white"
              >
                <img src="/icons/icon-box-add-white.svg" alt="초대하기" className="h-4 w-4" />
                초대하기
              </MyButton>
            </div>
          </div>

          {/* 모바일 전용 라벨*/}
          <div className="tablet:hidden mt-4 mb-6 flex items-center justify-between">
            <Label className="text-brand-gray-400 mb-0 text-sm">이메일</Label>
            <MyButton
              onClick={() => alert("초대하기")}
              color="buttonBlue"
              className="flex h-[26px] w-[86px] items-center justify-center gap-2 rounded-md text-xs font-medium text-white"
            >
              <img src="/icons/icon-box-add-white.svg" alt="초대하기" className="h-4 w-4" />
              초대하기
            </MyButton>
          </div>

          {/* tablet+ 전용 라벨 */}
          <div className="tablet:block mt-7 hidden">
            <Label className="text-brand-gray-400 mb-0 text-base">이메일</Label>
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
                  className="tablet:w-21 tablet:text-sm text-brand-blue-500 h-8 w-13 rounded-md px-3 py-1 text-xs font-medium"
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
          className="tablet:text-lg pc:mb-[33px] tablet:mb-12 tablet:w-80 tablet:h-[62px] text-brand-gray-700 mt-2 mb-25 h-13 w-full text-base font-medium"
        >
          대시보드 삭제하기
        </MyButton>
      </div>
    </div>
  );
}
