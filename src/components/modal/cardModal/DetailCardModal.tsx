"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

import Chip from "@/components/common/chip/Chip";
import KebabModal from "@/components/modal/KebabModal";
import Button from "@/components/common/Button";
import { Modal, ModalHeader, ModalContext } from "@/components/modal/Modal";
import { getCard, deleteCard } from "@/features/cards/api";
import { cn } from "@/lib/utils/cn";

import Comment from "./Comment";
import ModifyCardModal from "./CardModal";
import { ColumnData } from "@/features/dashboard/types";
import { Card } from "@/features/cards/types";
import { getColorForTag } from "@/lib/utils/tagColor";

type ModalType = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  columns?: ColumnData[];
  setColumns?: React.Dispatch<React.SetStateAction<ColumnData[]>>;
  dashboardId?: number;
  columnId?: number;
  cardId?: number;
  status: string;
};

export default function DetailCardModal({
  isOpen,
  setIsOpen,
  setColumns,
  dashboardId,
  columnId,
  cardId,
  status,
  columns,
}: ModalType) {
  const [card, setCard] = useState<Card | null>(null);
  const [isKebabOpen, setIsKebabOpen] = useState(false);
  const [isModifyModal, setIsModifyModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // 카드 데이터 다시 불러오기 함수
  const fetchCardData = async () => {
    if (!cardId) return;

    setIsLoading(true);
    try {
      const res = await getCard(cardId);
      const data = (res as any)?.data ?? res;
      setCard(data);

      if (data?.assignee) {
        const assigneeOption = {
          value: String(data.assignee.id),
          label: data.assignee.nickname,
          chip: (
            <img
              src={data.assignee.profileImageUrl}
              alt={data.assignee.nickname}
              className="h-[26px] w-[26px] rounded-full object-cover"
            />
          ),
        };
        // setMembersId([assigneeOption]);
      }
    } catch (e) {
      console.error("카드 로딩 오류:", e);
      alert((e as Error)?.message || "카드 상세 불러오기 실패");
    } finally {
      setIsLoading(false);
    }
  };

  // 디테일 모달값 받아오기
  useEffect(() => {
    if (!isOpen || !cardId) return;

    fetchCardData();
  }, [isOpen, cardId]);

  // 카드 삭제하기
  const handleDelete = async () => {
    if (!cardId) {
      alert("카드 정보가 없습니다.");
      return;
    }

    if (!confirm("이 카드를 삭제할까요?")) return;

    setIsLoading(true);

    try {
      await deleteCard(cardId);

      // 컬럼 상태에서 카드 제거
      if (setColumns && columnId) {
        setColumns((prevColumns) => {
          return prevColumns.map((col) => {
            if (col.id === columnId) {
              return {
                ...col,
                cards: col.cards?.filter((c) => c.id !== cardId) || [],
              };
            }
            return col;
          });
        });
      }

      alert("삭제되었습니다.");
      setIsKebabOpen(false);
      setIsOpen(false);
    } catch (e) {
      alert((e as Error).message || "카드 삭제 오류");
    } finally {
      setIsLoading(false);
    }
  };

  // 수정 모달 열기
  const handleModify = () => {
    setIsKebabOpen(false); // 케밥 메뉴 닫기
    setIsModifyModal(true); // 수정 모달 열기
  };

  //  서버에서 최신 데이터 다시 불러오기
  const handleModifyComplete = async () => {
    setIsModifyModal(false); // 수정 모달 닫기
    await fetchCardData(); // 최신 데이터 다시 불러오기
  };

  // 로딩 중일 때
  if (isLoading && !card) {
    return (
      <div>
        {isOpen && (
          <Modal open={isOpen} size="xl" className="relative">
            <ModalHeader title="로딩 중..." onClose={() => setIsOpen(false)} />
            <ModalContext className="flex items-center justify-center p-8">
              <p>카드 정보를 불러오는 중...</p>
            </ModalContext>
          </Modal>
        )}
      </div>
    );
  }

  return (
    <div>
      {isOpen && (
        <Modal open={isOpen} size="xl" className="relative">
          <ModalHeader
            title={card?.title || "카드 상세 모달"}
            onClose={() => setIsOpen(false)}
            className="tablet:h-8 h-[70px]"
            titleStyle="overflow-hidden text-ellipsis pc:w-[500px] tablet:w-[480px] self-end tablet:self-center"
            btnStyle="self-start tablet:self-center"
            extraBtn={
              <Button
                onClick={() => setIsKebabOpen(!isKebabOpen)}
                className="tablet:size-8 tablet:mr-3 ml-auto size-6 h-9 w-9 border-0"
                disabled={isLoading}
              >
                <Image
                  src="/icons/icon-menu.svg"
                  width={20}
                  height={20}
                  alt="더보기"
                  className="tablet:size-7"
                />
              </Button>
            }
          ></ModalHeader>
          <ModalContext
            className={cn(
              "relative flex flex-col py-0",
              "pc:flex pc:items-start pc:justify-between pc:flex-row-reverse",
              "tablet:flex tablet:items-start tablet:justify-between tablet:flex-row-reverse tablet:py-3",
            )}
          >
            <div
              className={cn(
                "border-brand-gray-200 mb-4 flex w-full justify-between gap-4 self-start rounded-lg border px-4 py-2",
                "tablet:w-[180px] tablet:flex-col tablet:mb-4 tablet:py-4 tablet:sticky tablet:top-0",
                "pc:w-[200px]",
              )}
            >
              <div>
                <p className="tablet:text-sm mb-1.5 text-xs font-bold">담당자</p>
                <p className="tablet:text-sm flex items-center gap-2 text-xs whitespace-nowrap">
                  {/* 카드 데이터에서 직접 담당자 정보 표시 */}
                  <img
                    src={card?.assignee?.profileImageUrl}
                    alt={card?.assignee?.nickname}
                    className="tablet:size-8 tablet:text-sm size-6 rounded-full object-cover text-xs"
                  />
                  {card?.assignee?.nickname || "담당자 없음"}
                </p>
              </div>
              <div>
                <p className="tablet:text-sm mb-1.5 text-xs font-bold">마감일</p>
                <p className="tablet:text-sm tablet:pt-0 pt-0.5 text-xs whitespace-nowrap">
                  {card?.dueDate || "마감일 없음"}
                </p>
              </div>
            </div>
            <div className={cn("flex w-full flex-col gap-4", "tablet:w-[420px]", "pc:w-[450px]")}>
              <div className="flex items-center gap-5">
                <Chip variant="status" label={status} />
                <span className="bg-brand-gray-300 h-5 w-[1px]" />
                <div className="flex gap-1.5">
                  {card?.tags?.map((tag: any, index: number) => {
                    const label = typeof tag === "string" ? tag : tag.label;
                    const color = getColorForTag(label);

                    return (
                      <Chip
                        key={`${label}-${index}`}
                        variant="category"
                        label={label}
                        color={color}
                      />
                    );
                  })}
                </div>
              </div>
              <div>
                <p className="p-2.5">{card?.description}</p>
                {card?.imageUrl && card.imageUrl.trim() ? (
                  <Image
                    src={card.imageUrl}
                    alt="이미지"
                    width={274}
                    height={160}
                    className={cn("h-[168px] w-full rounded-md object-contain", "pc:h-[260px]")}
                  />
                ) : null}
              </div>
              <Comment cardId={cardId} columnId={columnId} dashboardId={dashboardId} />
            </div>
          </ModalContext>

          {/* 케밥 메뉴 */}
          {isKebabOpen && (
            <KebabModal className="tablet:top-16 tablet:right-24 top-14 right-6 bg-white">
              <Button
                onClick={handleModify}
                className="h-8 w-20"
                color="buttonWhite"
                disabled={isLoading}
              >
                수정하기
              </Button>
              <Button
                onClick={handleDelete}
                className="h-8 w-20"
                color="buttonWhite"
                disabled={isLoading}
              >
                {isLoading ? "삭제 중..." : "삭제하기"}
              </Button>
            </KebabModal>
          )}
        </Modal>
      )}

      {/* 수정 모달 */}
      {isModifyModal && (
        <ModifyCardModal
          isOpen={isModifyModal}
          setIsOpen={setIsModifyModal}
          cardData={card}
          setColumns={setColumns}
          dashboardId={dashboardId}
          columnId={columnId}
          columns={columns}
          mode="edit"
          cardId={cardId}
        />
      )}
    </div>
  );
}
