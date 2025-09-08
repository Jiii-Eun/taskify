"use client";
import { useParams } from "next/navigation";
import { useState } from "react";

import Field from "@/components/form/Field";
import Input from "@/components/form/Input";
import Button from "@/components/layout/Button";
import { Modal, ModalHeader, ModalContext, ModalFooter } from "@/components/Modal";
import { createColumn } from "@/features/columns/api";

import type { ColumnData } from "../../types";

type ModalType = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setColumns: React.Dispatch<React.SetStateAction<ColumnData[]>>;
};

export default function CreateColumnModal({ isOpen, setIsOpen, setColumns }: ModalType) {
  const [newColumn, setNewColumn] = useState("");
  const isDisabled = newColumn.trim() === "";

  // useParams로 dashbordId값 받아옴
  const { id } = useParams();
  const dashboardId = Number(id);

  const handleCreate = async () => {
    if (isDisabled) return;
    console.log(dashboardId);

    try {
      const res = await createColumn({
        title: newColumn.trim(),
        dashboardId,
      });
      const col: ColumnData = (res as { data?: ColumnData }).data ?? (res as ColumnData);

      setColumns((prev) => [...prev, { id: col.id, title: col.title }]);
      setIsOpen(false);
      console.log(col);
    } catch (e) {
      alert((e as Error).message || "컬럼 생성 오류");
    }
  };

  return (
    <div>
      {isOpen && (
        <Modal open={isOpen} isOpenModal={setIsOpen} size="md">
          <ModalHeader title="새 컬럼 생성" />
          <ModalContext>
            <Field id="name" label="이름">
              <Input
                placeholder="새로운 프로젝트"
                value={newColumn}
                onChange={(e) => setNewColumn(e.currentTarget.value)}
              />
            </Field>
          </ModalContext>
          <ModalFooter>
            <Button
              className="h-[54px] w-64"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              취소
            </Button>
            <Button
              className="h-[54px] w-64"
              onClick={handleCreate}
              color={isDisabled ? "buttonGrey" : "buttonBlue"}
              disabled={isDisabled}
            >
              생성
            </Button>
          </ModalFooter>
        </Modal>
      )}
    </div>
  );
}
