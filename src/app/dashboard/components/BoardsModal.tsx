"use client";
import Image from "next/image";
import { useState } from "react";

import Chip from "@/components/chip/Chip";
import Field from "@/components/form/Field";
import Textarea from "@/components/form/Textarea";
import Button from "@/components/layout/Button";
import { Modal, ModalHeader, ModalContext } from "@/components/Modal";

type ModalType = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function BoardsModal({ isOpen, setIsOpen }: ModalType) {
  const [isCebabOpen, setIsCebabOpen] = useState(false);
  return (
    <div>
      {isOpen && (
        <Modal open={isOpen} size="xl" className="relative">
          <ModalHeader title="새로운 새로운 일정 관리 Taskify" onClose={() => setIsOpen(false)}>
            <Button
              onClick={() => {
                setIsCebabOpen(!isCebabOpen);
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
                  <Chip variant="category" label="프로젝트" />
                  <Chip variant="category" label="일반" />
                  <Chip variant="category" label="백앤드" />
                  <Chip variant="category" label="상 " />
                </div>
              </div>
              <div>
                <p className="p-2.5">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum finibus nibh
                  arcu, quis consequat ante cursus eget. Cras mattis, nulla non laoreet porttitor,
                  diam justo laoreet eros, vel aliquet diam elit at leo.
                </p>
                <Image src="/images/img-card-lime.svg" height={260} width={445} alt="이미지" />
              </div>
              <Field id="comment" label="댓글">
                <div className="rounded-lg border border-[#D9D9D9] p-3">
                  <Textarea
                    placeholder="댓글 작성하기"
                    className="resize-none rounded-none border-0 !p-0"
                  />
                  <div className="mt-1 flex justify-end">
                    <Button
                      color="buttonBasic"
                      onClick={() => {}}
                      className="text-brand-blue-500 h-8 w-20"
                    >
                      입력
                    </Button>
                  </div>
                </div>
              </Field>
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
          {isCebabOpen && (
            <div className="absolute top-16 right-24 flex flex-col rounded-md border border-[#D9D9D9] bg-white px-1.5 py-[7px]">
              <Button onClick={() => {}} className="h-8 w-20">
                수정하기
              </Button>
              <Button onClick={() => {}} className="h-8 w-20">
                삭제하기
              </Button>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
}
