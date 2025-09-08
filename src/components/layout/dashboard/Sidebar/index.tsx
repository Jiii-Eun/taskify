"use client";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { createDashboard, getDashboards } from "@/features/dashboard/api";
import { useApiHandler } from "@/lib/useApiHandler";
import { useDevice } from "@/lib/useDevice";

import AddDashboard from "./AddDashboard";
import DashboardList from "./DashboardList";
import Logo from "../../Logo";
import Pagination from "../../Pagination";

export type CreateData = {
  title: string;
  color: string;
};

export default function Sidebar() {
  const router = useRouter(); // dash보드 페이지에서 id 값 가지고 오려고 추가
  const device = useDevice();
  const [page, setPage] = useState<number>(1);
  const [direction, setDirection] = useState<"prev" | "next">("next");
  const prevPage = useRef(page);

  useEffect(() => {
    if (page > prevPage.current) {
      setDirection("next");
    } else if (page < prevPage.current) {
      setDirection("prev");
    }
    prevPage.current = page;
  }, [page]);

  const { data, refetch } = useApiHandler(() => {
    if (device === "mobile") {
      return getDashboards("infiniteScroll", { size: 20 });
    }
    return getDashboards("pagination", { page, size: 15 });
  }, [page, device]);

  const dashboards = data?.dashboards ?? [];
  const totalCount = data?.totalCount ?? 0;
  const totalPages = Math.ceil(totalCount / 15);

  const isPage = totalPages > 1;
  const isPrev = direction === "prev";

  const handleCreate = async (form: CreateData) => {
    const created = await createDashboard(form); // dash보드 페이지에서 id 값 가지고 오려고 변경
    await refetch();

    router.push(`/dashboard/${created.id}`); // dash보드 페이지에서 id 값 가지고 오려고 추가
  };

  return (
    <>
      <div>
        {/* 로고 이미지 */}
        <div className="tablet:mb-14 pc:justify-start mb-8 flex h-full w-full items-center justify-center">
          <Logo />
        </div>

        {/*클릭 시 대시보드 생성 모달 열림*/}
        <AddDashboard handleCreate={handleCreate} />

        <div className="grid">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={page}
              initial={{ x: isPrev ? "-23%" : "23%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: isPrev ? "-23%" : "23%", opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="col-start-1 row-start-1"
            >
              <DashboardList dashboards={dashboards} />
            </motion.div>
          </AnimatePresence>
        </div>

        {isPage && (
          <Pagination
            page={page}
            setPage={setPage}
            totalPages={totalPages}
            className={"tablet:flex hidden"}
          />
        )}
      </div>
    </>
  );
}
