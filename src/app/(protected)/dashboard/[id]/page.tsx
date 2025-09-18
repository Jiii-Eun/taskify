"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

import Chip from "@/components/common/chip/Chip";
import Column from "@/components/column/Column";
import MyButton from "@/components/common/Button";
import { getColumns } from "@/features/columns/api";
import { ColumnData } from "@/features/dashboard/types";
import CreateColumnModal from "@/components/modal/columnModal/CreateColumnModal";

export default function DashboardId() {
  const { id } = useParams();
  const dashboardId = Number(id);

  const [modal, setModal] = useState<null | "column">(null);
  const [isKebabOpen, setIsKebabOpen] = useState<number | null>(null);
  const [columns, setColumns] = useState<ColumnData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!dashboardId) return;

    (async () => {
      try {
        setIsLoading(true);
        const response = await getColumns(dashboardId);
        const columnsData = Array.isArray(response) ? response : response?.data || [];
        setColumns(columnsData);
      } catch (error) {
        console.error("컬럼 목록 조회 실패", error);
        setColumns([]);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [dashboardId]);

  const handleAddColumn = () => {
    setModal("column");
  };

  const closeModal = () => {
    setModal(null);
  };

  if (isLoading) {
    return <div className="flex flex-1 items-center justify-center">로딩 중</div>;
  }

  return (
    <main className="pc:flex-row pc:min-h-full bg-brand-gray-100 flex flex-1 flex-col">
      {columns.map((item, i) => (
        <Column
          key={item.id}
          status={item.title}
          cards={item.cards ?? []}
          kebabIndex={isKebabOpen === i}
          isKebabOpen={() => setIsKebabOpen((prev) => (prev === i ? null : i))}
          dashboardId={dashboardId}
          columnId={item.id}
          setColumns={setColumns}
          columns={columns}
        />
      ))}

      {/* 새로운 컬럼 추가 버튼 */}
      <div className="pc:pt-[38px] pc:w-[354px] flex flex-shrink-0 px-5 py-5">
        <MyButton
          onClick={handleAddColumn}
          className="border-brand-gray-300 dark:bg-dark-700 flex h-[70px] w-full items-center justify-center border bg-white"
        >
          <span className="mr-3 text-lg font-bold">새로운 컬럼 추가하기</span>
          <Chip variant="add" />
        </MyButton>
      </div>
      {modal === "column" && (
        <CreateColumnModal isOpen setIsOpen={closeModal} setColumns={setColumns} />
      )}
    </main>
  );
}
