"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

import Chip from "@/components/chip/Chip";
import Field from "@/components/form/Field";
import KebabModal from "@/components/KebabModal";
import Button from "@/components/layout/Button";
import { Modal, ModalHeader, ModalContext } from "@/components/Modal";
import { getCard, deleteCard } from "@/features/cards/api";
import { cn } from "@/lib/utils/cn";

import Comment from "./Comment";
import ModifyCardModal from "./ModifyCardModal";
import { CardData } from "../../types";

type ModalType = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function BoardsModal({ isOpen, setIsOpen }: ModalType) {
  const [card, setCard] = useState<CardData | null>(null);
  const [isKebabOpen, setIsKebabOpen] = useState(false);
  // 모달 오픈
  const [isModal, setIsModal] = useState(false);
  const cardId = 14074;
  // 디테일 모달값 받아오기
  useEffect(() => {
    if (!isOpen) return;
    let alive = true;
    (async () => {
      try {
        const res = await getCard(cardId);
        const data = (res as any)?.data ?? res;
        if (alive) setCard(data);
      } catch (e) {
        alert((e as Error)?.message || "카드 상세 불러오기 실패");
      }
    })();
    return () => {
      alive = false;
    };
  }, [isOpen, cardId]);
  // 카드 삭제 하기

  const handleDelete = async () => {
    if (!confirm("이 카드를 삭제할까요?")) return;
    try {
      await deleteCard(cardId);
      alert("삭제되었습니다.");
      setIsKebabOpen(false);
      setIsOpen(false);
    } catch (e) {
      alert((e as Error).message || "카드 삭제 오류");
    }
  };

  return (
    <div>
      {isOpen && (
        <Modal open={isOpen} size="xl" className="relative">
          <ModalHeader title={card?.title} onClose={() => setIsOpen(false)}>
            <Button
              onClick={() => {
                setIsKebabOpen(!isKebabOpen);
              }}
              className="mr-6 ml-auto border-0"
            >
              <Image src="/icons/icon-menu.svg" width={28} height={28} alt="더보기" />
            </Button>
          </ModalHeader>
          <ModalContext className="flex items-start justify-between">
            <div className="flex w-[450px] flex-col gap-4">
              <div className="flex items-center gap-5">
                <Chip variant="status" label="To Do" />
                <span className="bg-brand-gray-300 h-5 w-[1px]" />
                <div className="flex gap-1.5">
                  {card?.tags?.map((tag, i) => (
                    <Chip key={i} variant="category" label={tag} />
                  ))}
                </div>
              </div>
              <div>
                <p className="p-2.5">{card?.description}</p>
                {card?.imageUrl && card.imageUrl.trim() ? (
                  <Image
                    src={card?.imageUrl}
                    alt="이미지"
                    width={274}
                    height={160}
                    className={cn(
                      "rounded-md object-cover",
                      // 기본 (mobile)
                      "h-auto w-full object-cover",

                      // tablet
                      "tablet:h-auto tablet:w-[120px]",

                      // pc
                      "pc:h-[160px] pc:w-[274px]",
                    )}
                  />
                ) : (
                  <Image
                    src="/images/img-card-pink.svg"
                    alt="기본 이미지"
                    width={274}
                    height={160}
                    className={cn(
                      "rounded-md object-cover",
                      // 기본 (mobile)
                      "h-auto w-full object-cover",

                      // tablet
                      "tablet:h-auto tablet:w-[120px]",

                      // pc
                      "pc:h-[160px] pc:w-[274px]",
                    )}
                  />
                )}
              </div>
              <Comment />
            </div>
            <div className="flex w-[200px] flex-col gap-4 rounded-lg border border-[#D9D9D9] p-4">
              <Field id="manager" label="담당자">
                <p>배문철</p>
              </Field>
              <Field id="endDate" label="마감일">
                <p>2022.12.30 19:00</p>
              </Field>
            </div>
          </ModalContext>
          {isKebabOpen && (
            <KebabModal className="top-16 right-24 bg-white">
              <Button
                onClick={() => {
                  setIsModal(true);
                }}
                className="h-8 w-20"
                color="buttonWhite"
              >
                수정하기
              </Button>
              <Button onClick={handleDelete} className="h-8 w-20" color="buttonWhite">
                삭제하기
              </Button>
            </KebabModal>
          )}
        </Modal>
      )}
      {isModal && <ModifyCardModal isOpen setIsOpen={setIsOpen} />}
    </div>
  );
}
