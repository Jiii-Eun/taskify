"use client";

import type { Member } from "@/features/members/types";
import { useDevice } from "@/lib/useDevice";
import { cn } from "@/lib/utils/cn";

export default function MemberList({ members }: { members: Member[] }) {
  const device = useDevice();
  const maxCount = device === "pc" ? 4 : 2;
  const nonOwners = members.filter((m) => !m.isOwner);
  const visible = nonOwners?.slice(0, maxCount);

  const liStyle = cn(
    "[&>li]:h-[34px] [&>li]:w-[34px] [&>li]:tablet:h-[38px] [&>li]:tablet:w-[38px] [&>li]:overflow-hidden [&>li]:rounded-full [&>li]:border-3 [&>li]:border-white [&>li:not(:first-child)]:-ml-2",
  );

  return (
    <ol className={cn(liStyle, "tablet:ml-8 pc:ml-9 ml-4 flex flex-row")}>
      {visible.map((m) => (
        <li key={m.id}>
          <img src={m.profileImageUrl} alt="멤버 프로필" className="h-full w-full object-cover" />
        </li>
      ))}
      {members.length > maxCount && (
        <li className="flex items-center justify-center bg-[#f4d7da] text-[#D25B68]">
          +{nonOwners.length - maxCount}
        </li>
      )}
    </ol>
  );
}
