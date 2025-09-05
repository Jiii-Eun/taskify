"use client";

import Image from "next/image";
import { useState } from "react";

import { getDashboards } from "@/features/dashboard/api";
import { useApiHandler } from "@/lib/useApiHandler";

import DashboardList from "./DashboardList";
import MyButton from "../../Button";
import Logo from "../../Logo";
import Pagination from "../../Pagination";

export default function Sidebar() {
  const [page, setPage] = useState<number>(1);
  const { data } = useApiHandler(() => getDashboards("pagination", { page, size: 15 }), [page]);

  const dashboards = data?.dashboards ?? [];
  const totalCount = data?.totalCount ?? 0;
  const totalPages = Math.ceil(totalCount / 15);

  return (
    <>
      <div>
        {/* 로고 이미지 */}
        <div className="h=full tablet:mb-14 pc:justify-start mb-8 flex w-full items-center justify-center">
          <Logo />
        </div>
        {/*클릭 시 대시보드 생성 모달 열림*/}
        <div className="tablet:mb-4 mb-6 flex w-full justify-center">
          <MyButton
            className="tablet:justify-between tablet:w-full flex justify-center border-0"
            onClick={() => {}}
          >
            <div className="tablet:flex text-brand-gray-500 hidden text-xs font-semibold">
              Dash Boards
            </div>
            <Image src={"/icons/icon-box-add.svg"} alt="대시보드 추가" width={20} height={20} />
          </MyButton>
        </div>
        <DashboardList dashboards={dashboards} />
        <Pagination page={page} setPage={setPage} totalPages={totalPages} />
      </div>
    </>
  );
}
