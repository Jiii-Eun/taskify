"use client";

import MyButton from "@/components/common/Button";
import Label from "@/components/form/Label";
import Pagination from "@/components/common/Pagination";

type Member = {
  id: number;
  userId: number;
  email: string;
  nickname: string;
  profileImageUrl?: string;
  isOwner?: boolean;
};

interface MembersListProps {
  members: Member[];
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
  onDeleteMember: (memberId: number) => void;
}

export default function MembersList({
  members,
  page,
  totalPages,
  setPage,
  onDeleteMember,
}: MembersListProps) {
  return (
    <section className="tablet:p-6 rounded-lg bg-white px-4 py-5 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="tablet:text-2xl text-xl font-bold">구성원</h3>
        <div className="flex items-center gap-[15px]">
          <span className="tablet:text-sm text-brand-gray-700 text-xs">
            {totalPages} 페이지 중 {page}
          </span>
          <div className="[&>*]:mt-0 [&>*]:flex">
            <Pagination page={page} setPage={setPage} totalPages={Math.max(totalPages, 1)} />
          </div>
        </div>
      </div>

      {/* 라벨 */}
      <div>
        <Label className="text-brand-gray-400 text-sm">이름</Label>
      </div>

      <ul>
        {members.map((m, idx) => {
          const isOwner = m?.isOwner;

          return (
            <li
              key={m.id}
              className={`flex h-[70px] items-center justify-between py-3 ${
                idx !== members.length - 1 ? "border-brand-gray-200 border-b" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <img
                  src={m.profileImageUrl || "/images/img-profile-sample.svg"}
                  alt={m.nickname}
                  className="h-[38px] w-[38px] rounded-full object-cover"
                />
                <span className="text-sm">{m.nickname}</span>
              </div>

              {!isOwner && (
                <MyButton
                  onClick={() => onDeleteMember(m.id)}
                  color="buttonBasic"
                  className="tablet:w-21 tablet:text-sm text-brand-blue-500 h-8 w-13 rounded-md px-3 py-1 text-xs font-medium"
                >
                  삭제
                </MyButton>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
