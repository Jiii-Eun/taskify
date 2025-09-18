"use client";
import clsx from "clsx";
import { useState, useEffect, useRef } from "react";

import DeleteColumnModal from "@/components/modal/columnModal/DeleteColumnModal";
import ManageColumnModal from "@/components/modal/columnModal/ManageColumnModal";
// import CreateCardModal from "@/components/modal/cardModal/CreateCardModal";
import CreateCardModal from "@/components/modal/cardModal/ModifyCardModal";
import Card from "@/components/card/Card";
import Chip from "@/components/common/chip/Chip";
import KebabModal from "@/components/modal/KebabModal";
import MyButton from "@/components/common/Button";
import Button from "@/components/common/Button";
import { ColumnProps } from "@/features/dashboard/types";
import { getCards } from "@/features/cards/api";
import type { CardData } from "@/features/dashboard/types";

export default function Column({
  status,
  cards,
  onAddCard,
  kebabIndex,
  isKebabOpen,
  columnId,
  dashboardId,
  setColumns,
}: ColumnProps) {
  const [modal, setModal] = useState<null | "manage" | "delete" | "card">(null);

  const loader = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState(false);
  const [cursorId, setCursorId] = useState<number | undefined>(undefined);
  const [hasMore, setHasMore] = useState(true);

  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    if (!loader.current) return;

    const observer = new IntersectionObserver(
      async (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          setLoading(true);
          try {
            const res = await getCards(columnId, { size: 5, cursorId });
            const newCards = (res?.cards ?? []) as CardData[];

            setColumns((prev) =>
              prev.map((col) =>
                col.id === columnId
                  ? {
                      ...col,
                      cards: [
                        ...(col.cards ?? []),
                        ...newCards.filter((nc) => !(col.cards ?? []).some((c) => c.id === nc.id)),
                      ].sort(
                        (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime(),
                      ),
                    }
                  : col,
              ),
            );

            if (res?.totalCount !== undefined) {
              setTotalCount(res.totalCount);
            }

            if (res?.cursorId) {
              setCursorId(res.cursorId);
            } else {
              setHasMore(false);
            }
          } catch (err) {
            console.error("카드 불러오기 실패:", err);
            setHasMore(false);
          } finally {
            setLoading(false);
          }
        }
      },
      { threshold: 1.0 },
    );

    observer.observe(loader.current);
    return () => observer.disconnect();
  }, [cursorId, hasMore, loading, columnId, setColumns]);

  const handleClickCard = (cardId: number) => {
    if (dashboardId == null || columnId == null) return;
  };

  return (
    <div
      className={clsx(
        // 기본 (mobile)
        "border-brand-gray-300 bg-brand-gray-100 flex-shrink-0 border-b p-5",

        // tablet
        "tablet:w-full",

        // pc
        "pc:w-[354px] pc:flex-shrink-0 pc:border-r pc:border-b-0",
      )}
      onClick={() => console.log("컬럼클릭시 id 숫자", columnId)}
    >
      {/* 컬럼 헤더 */}
      <div className="relative mb-[21px] flex items-center justify-between">
        <div className="flex items-center gap-[12px]">
          {/* 컬럼 이름 */}
          <span className="flex items-center gap-2">
            <span className="bg-brand-blue-500 h-2 w-2 rounded-full" />
            <h2 className="text-2lg text-brand-gray-700 font-bold">{status}</h2>
          </span>
          {/* 숫자 칩 */}
          <Chip variant="badge" label={(cards?.length ?? 0).toString()} />
        </div>
        {/* 설정 버튼 */}
        <button type="button" onClick={isKebabOpen}>
          <img src="/icons/icon-settings.svg" alt="설정" className="h-6 w-6" />
        </button>
        {kebabIndex && (
          <KebabModal className="top-8 right-0">
            <Button onClick={() => setModal("manage")} className="h-8 w-20" color="buttonWhite">
              수정하기
            </Button>
            <Button onClick={() => setModal("delete")} className="h-8 w-20" color="buttonWhite">
              삭제하기
            </Button>
          </KebabModal>
        )}
      </div>

      {/* 카드 추가 버튼 */}
      <div className="dark:bg-dark-700 mb-4 bg-white">
        <MyButton
          onClick={
            onAddCard ??
            (() => {
              setModal("card");
            })
          }
          color="buttonBasic"
          className="flex h-10 w-full items-center justify-center"
        >
          <Chip variant="add" />
        </MyButton>
      </div>

      {/* 카드 리스트 */}
      <div className="flex flex-col gap-[15px]">
        {cards?.map((card) => (
          <div key={card.id} onClick={() => card.id && handleClickCard(card.id)}>
            <Card
              {...card}
              setColumns={setColumns}
              dashboardId={dashboardId}
              columnId={columnId}
              cardId={card.id}
              status={status}
            />
          </div>
        ))}
        {hasMore && <div ref={loader} className="h-6" />}
        {loading && <p className="text-center text-sm text-gray-500">불러오는 중...</p>}
      </div>

      {/* 수정하기, 삭제하기 모달 관리  */}
      {modal === "card" && (
        <CreateCardModal
          isOpen
          setIsOpen={() => setModal(null)}
          setColumns={setColumns}
          dashboardId={dashboardId}
          columnId={columnId}
          mode="create"
        />
      )}
      {modal === "manage" && columnId !== null && (
        <ManageColumnModal
          isOpen
          setIsOpen={() => setModal(null)}
          columnId={columnId}
          setColumns={setColumns}
        />
      )}
      {modal === "delete" && columnId !== null && (
        <DeleteColumnModal
          isOpen
          setIsOpen={() => setModal(null)}
          columnId={columnId}
          setColumns={setColumns}
        />
      )}
    </div>
  );
}
