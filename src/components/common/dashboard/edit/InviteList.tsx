"use client";

import Label from "@/components/form/Label";
import MyButton from "@/components/common/Button";
import Pagination from "@/components/common/Pagination";

interface Invite {
  id: number;
  email: string;
}

interface InviteListProps {
  invites: Invite[];
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
  onCancel: (inviteId: number) => void;
  onOpenInviteModal: () => void;
}

export default function InviteList({
  invites,
  page,
  totalPages,
  setPage,
  onCancel,
  onOpenInviteModal,
}: InviteListProps) {
  return (
    <section className="tablet:p-6 rounded-lg bg-white px-4 py-5 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="tablet:text-2xl text-xl font-bold">초대 내역</h3>
        <div className="flex items-center gap-[15px]">
          <span className="tablet:text-sm text-brand-gray-700 text-xs">
            {Math.max(totalPages, 1)} 페이지 중 {page}
          </span>
          <div className="[&>*]:mt-0 [&>*]:flex">
            <Pagination page={page} setPage={setPage} totalPages={Math.max(totalPages, 1)} />
          </div>
          <MyButton
            onClick={onOpenInviteModal}
            color="buttonBlue"
            className="tablet:flex hidden h-8 w-[105px] items-center justify-center gap-2 rounded-md text-sm"
          >
            <img src="/icons/icon-box-add-white.svg" alt="초대하기" className="h-4 w-4" />
            초대하기
          </MyButton>
        </div>
      </div>

      {/* 모바일 전용 라벨 */}
      <div className="tablet:hidden mt-4 mb-6 flex items-center justify-between">
        <Label className="text-brand-gray-400 mb-0 text-sm">이메일</Label>
        <MyButton
          onClick={onOpenInviteModal}
          color="buttonBlue"
          className="flex h-[26px] w-[86px] items-center justify-center gap-2 rounded-md text-xs font-medium"
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
              onClick={() => onCancel(i.id)}
              color="buttonBasic"
              className="tablet:w-21 tablet:text-sm text-brand-blue-500 h-8 w-13 rounded-md px-3 py-1 text-xs font-medium"
            >
              취소
            </MyButton>
          </li>
        ))}
      </ul>
    </section>
  );
}
