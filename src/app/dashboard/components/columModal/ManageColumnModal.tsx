"use client";
import { useState } from "react";

import Field from "@/components/form/Field";
import Input from "@/components/form/Input";
import Button from "@/components/layout/Button";
import { Modal, ModalHeader, ModalContext, ModalFooter } from "@/components/Modal";
import { updateColumn } from "@/features/columns/api";

import type { ColumnData } from "../../types";

type ModalType = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  columnId: number;
  setColumns: React.Dispatch<React.SetStateAction<ColumnData[]>>;
};

export default function CreateColumnModal({ isOpen, setIsOpen, columnId, setColumns }: ModalType) {
  const [modifyColumn, setModifyColumn] = useState("");
  const handleUpdate = async () => {
    try {
      await updateColumn(columnId, { title: modifyColumn.trim() });
      setColumns((prev) =>
        prev.map((col) => (col.id === columnId ? { ...col, title: modifyColumn.trim() } : col)),
      );
      setIsOpen(false);
    } catch (e) {
      alert((e as Error).message || "컬럼 수정 오류");
    }
  };
  return (
    <div>
      {isOpen && (
        <Modal open={isOpen} isOpenModal={setIsOpen} size="md">
          <ModalHeader title="컬럼 관리" onClose={() => setIsOpen(false)} />
          <ModalContext>
            <Field id="name" label="이름">
              <Input
                placeholder="Done"
                value={modifyColumn}
                onChange={(e) => setModifyColumn(e.currentTarget.value)}
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
            <Button className="h-[54px] w-64" onClick={handleUpdate} color="buttonBlue">
              변경
            </Button>
          </ModalFooter>
        </Modal>
      )}
    </div>
  );
}
