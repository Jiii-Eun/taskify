"use client";
import { useState } from "react";

import Chip from "@/components/chip/Chip";
import DatePicker from "@/components/form/DatePicker";
import Field from "@/components/form/Field";
import ImgUpload from "@/components/form/ImgUpload";
import Input from "@/components/form/Input";
import Select from "@/components/form/Select";
import TagInput from "@/components/form/TagInput";
import Textarea from "@/components/form/Textarea";
import Button from "@/components/layout/Button";
import { Modal, ModalHeader, ModalContext, ModalFooter } from "@/components/Modal";
import { updateCard } from "@/features/cards/api";
import { uploadCardImage } from "@/features/columns/api";

type ModalType = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const stateOpt = [
  { value: "1", label: "To Do", chip: <Chip variant="status" label="To Do" /> },
  { value: "2", label: "On Progress", chip: <Chip variant="status" label="On Progress" /> },
  { value: "3", label: "Done", chip: <Chip variant="status" label="Done" /> },
];
const managerOpt = [{ value: "1", label: "사람1" }];

export default function ModifyModal({ isOpen, setIsOpen }: ModalType) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState("");

  // 공백값 체크(필수 표시 붙은것만!)
  const isDisabled = title.trim() === "" || description.trim() === "";

  const cardId = 14060;
  const assigneeUserId = 6204;
  const dashboardId = 16211;
  const columnId = 54736;

  const handleUpdate = async () => {
    if (isDisabled) return;

    try {
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
      // 카드 생성 부분
      await updateCard(cardId, {
        assigneeUserId: assigneeUserId,
        dashboardId: dashboardId,
        columnId: columnId,
        title: title.trim(),
        description: description.trim(),
        dueDate,
        tags,
        imageUrl: updateImg,
      });

      alert("수정 완료");
      setIsOpen(false);
    } catch (e) {
      alert((e as Error).message || "카드 수정 오류");
    }
  };

  return (
    <div>
      {isOpen && (
        <Modal open={isOpen} isOpenModal={setIsOpen} size="lg">
          <ModalHeader title="할 일 수정" />
          <ModalContext className="flex flex-col gap-7">
            <div className="grid grid-cols-2 gap-8">
              <Field id="manager" label="상태">
                <Select options={stateOpt} placeholder="선택하기" labelNone={true} />
              </Field>
              <Field id="manager" label="담당자">
                <Select options={managerOpt} placeholder="선택하기" />
              </Field>
            </div>
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
            <Field id="endDate" label="마감일">
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
              onClick={handleUpdate}
              color="buttonBlue"
            >
              수정
            </Button>
          </ModalFooter>
        </Modal>
      )}
    </div>
  );
}
