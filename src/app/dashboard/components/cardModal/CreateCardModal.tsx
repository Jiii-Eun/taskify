"use client";
import { useParams } from "next/navigation";
import { useState } from "react";

import DatePicker from "@/components/form/DatePicker";
import Field from "@/components/form/Field";
import ImgUpload from "@/components/form/ImgUpload";
import Input from "@/components/form/Input";
import Select from "@/components/form/Select";
import TagInput from "@/components/form/TagInput";
import Textarea from "@/components/form/Textarea";
import Button from "@/components/layout/Button";
import { Modal, ModalHeader, ModalContext, ModalFooter } from "@/components/Modal";
import { createCard } from "@/features/cards/api";
import { getColumns, uploadCardImage } from "@/features/columns/api";

import type { ColumnData, CardData } from "../../types";

type ModalType = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setColumns: React.Dispatch<React.SetStateAction<ColumnData[]>>;
  isActiveCol: number;
};

const managerOpt = [
  { value: "1", label: "배유철" },
  { value: "2", label: "배동석" },
];

export default function CreateModal({ isOpen, setIsOpen, setColumns, isActiveCol }: ModalType) {
  // input 값
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState("");

  // 공백값 체크(필수 표시 붙은것만!)
  const isDisabled = title.trim() === "" || description.trim() === "";

  // useParams로 dashbordId값 받아옴
  const { id } = useParams();
  const dashboardId = Number(id);
  const assigneeUserId = 0;
  const columnId = 54736;

  const handleCreate = async () => {
    if (isDisabled) return;
    // 이미지 업로드 부분
    let updateImg: string | undefined;
    if (imageFile) {
      const formData = new FormData();
      formData.append("image", imageFile);

      const uploaded = await uploadCardImage(columnId, formData);
      const direct = (uploaded as { imageUrl?: unknown }).imageUrl;
      const nested = (uploaded as { data?: { imageUrl?: unknown } }).data?.imageUrl;
      const url =
        typeof direct === "string" ? direct : typeof nested === "string" ? nested : undefined;

      updateImg = url;
    } else if (imageUrl && !imageUrl.startsWith("blob:")) {
      updateImg = imageUrl;
    }
    let resolvedId = isActiveCol;
    // 기본컬럼 아이디 0,1,2 카드생성시 api에서 받아오는 컬럼 아이디가 필요함
    if (isActiveCol <= 2) {
      try {
        const { data } = await getColumns(dashboardId);
        const target = data[isActiveCol];
        if (!target?.id) {
          alert("컬럼 아이디 확인 실패");
          return;
        }
        resolvedId = Number(target.id);
      } catch {
        alert("컬럼 생성 오류");
        return;
      }
    }

    try {
      // 카드 생성
      const created = (await createCard({
        assigneeUserId,
        dashboardId,
        columnId: resolvedId,
        title: title.trim(),
        description: description.trim(),
        dueDate,
        tags,
        imageUrl: updateImg,
      })) as CardData | { data: CardData };

      const createdCard: CardData = "data" in created ? created.data : created;

      setColumns((prev) => {
        const hasRealId = prev.some((c) => c.id === resolvedId);
        const targetIdForUI = hasRealId ? resolvedId : isActiveCol;
        return prev.map((col) =>
          col.id === targetIdForUI ? { ...col, cards: [...(col.cards ?? []), createdCard] } : col,
        );
      });

      setIsOpen(false);
    } catch (e) {
      alert((e as Error).message || "카드 생성 오류");
    }
  };

  return (
    <div>
      {isOpen && (
        <Modal open={isOpen} isOpenModal={setIsOpen} size="lg">
          <ModalHeader title="할 일 생성" />
          <ModalContext className="flex flex-col gap-7">
            <Field id="manager" label="담당자">
              <Select options={managerOpt} placeholder="선택하기" />
            </Field>
            <Field id="title" label="제목">
              <Input value={title} onChange={(e) => setTitle(e.currentTarget.value)} />
            </Field>
            <Field id="description" label="설명">
              <Textarea
                className="resize-none"
                value={description}
                onChange={(e) => setDescription(e.currentTarget.value)}
              />
            </Field>
            <Field id="dueDate" label="마감일">
              <DatePicker
                value={dueDate ? new Date(dueDate) : null}
                onChange={(date) =>
                  setDueDate(
                    date
                      ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
                          date.getDate(),
                        ).padStart(2, "0")} ${String(date.getHours()).padStart(2, "0")}:${String(
                          date.getMinutes(),
                        ).padStart(2, "0")}`
                      : "",
                  )
                }
              />
            </Field>
            <Field id="tag" label="태그">
              <TagInput value={tags} onChange={setTags} />
            </Field>
            <Field id="image" label="이미지">
              <ImgUpload
                value={imageUrl}
                onChange={(file, previewUrl) => {
                  setImageFile(file);
                  setImageUrl(previewUrl);
                }}
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
              className="text-brand-gray-100 h-[54px] w-64"
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
