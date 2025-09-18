"use client";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

import DatePicker from "@/components/form/DatePicker";
import Field from "@/components/form/Field";
import ImgUpload from "@/components/form/ImgUpload";
import Input from "@/components/form/Input";
import Select, { Option } from "@/components/form/Select";
import TagInput, { Tag } from "@/components/form/TagInput";
import Textarea from "@/components/form/Textarea";
import Button from "@/components/common/Button";
import { Modal, ModalHeader, ModalContext, ModalFooter } from "@/components/modal/Modal";
import { createCard } from "@/features/cards/api";
import { uploadCardImage } from "@/features/columns/api";
import type { Card } from "@/features/cards/types";
import { ColumnData } from "@/features/dashboard/types";
import { getMembers } from "@/features/members/api";

import { getColorForTag } from "@/lib/utils/tagColor";

type CardWithTags = Card & { tags: Tag[] };

type ModalType = {
  isOpen: boolean;
  setIsOpen: () => void;
  setColumns: React.Dispatch<React.SetStateAction<ColumnData[]>>;
  onCardCreated?: () => void;
  dashboardId: number;
  columnId: number;
};

export default function CreateCardModal({
  isOpen,
  setIsOpen,
  setColumns,
  onCardCreated,
  dashboardId,
  columnId,
}: ModalType) {
  // input 값들
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [tags, setTags] = useState<Tag[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [members, setMembers] = useState<Option[]>([]);
  const [assigneeId, setAssigneeId] = useState<number | null>(null);

  // 필수 값 체크
  const isDisabled = title.trim() === "" || description.trim() === "";

  useEffect(() => {
    if (!isOpen || !dashboardId) return;

    (async () => {
      try {
        const res = await getMembers(dashboardId, { page: 1, size: 20 });

        const opts = res.members.map((m) => ({
          value: String(m.userId),
          label: m.nickname,
          chip: (
            <img
              src={m.profileImageUrl}
              alt={m.nickname}
              className="h-[26px] w-[26px] rounded-full object-cover"
            />
          ),
        }));

        setMembers(opts);
        // 모든 멤버를 저장하지 말고, 선택된 담당자만 저장하도록 변경
      } catch (err) {
        console.error("멤버 목록 불러오기 실패:", err);
      }
    })();
  }, [isOpen, dashboardId]);

  // 담당자 선택 시 호출되는 함수
  const handleAssigneeSelect = (opt: Option) => {
    const selectedId = Number(opt.value);
    setAssigneeId(selectedId);
  };

  const handleCreate = async () => {
    if (isDisabled || isLoading) return;
    if (!columnId) {
      alert("컬럼 정보가 없습니다.");
      return;
    }
    if (!assigneeId) {
      alert("담당자를 선택해주세요.");
      return;
    }

    setIsLoading(true);

    try {
      // 이미지 업로드 처리
      let updateImg: string | undefined;

      if (imageFile) {
        try {
          const formData = new FormData();
          formData.append("image", imageFile);

          const uploadResult = await uploadCardImage(columnId, formData);

          // API 응답 구조에 따른 처리
          const direct = (uploadResult as { imageUrl?: unknown }).imageUrl;
          const nested = (uploadResult as { data?: { imageUrl?: unknown } }).data?.imageUrl;
          const url =
            typeof direct === "string" ? direct : typeof nested === "string" ? nested : undefined;

          updateImg = url;
        } catch (uploadError) {
          console.error("이미지 업로드 실패", uploadError);
        }
      } else if (imageUrl && !imageUrl.startsWith("blob:")) {
        updateImg = imageUrl;
      }

      // 카드 생성 데이터
      const cardData = {
        assigneeUserId: assigneeId,
        dashboardId,
        columnId,
        title: title.trim(),
        description: description.trim(),
        dueDate: dueDate ? dayjs(dueDate).format("YYYY-MM-DD HH:mm") : "",
        tags: tags.map((tag) => tag.label),
        imageUrl: updateImg,
      };

      console.log("카드 생성 요청 데이터:", cardData);

      // 카드 생성 API 호출
      const createResult = await createCard(cardData);

      // API 응답 구조에 따른 처리
      const createdCard: Card =
        "data" in (createResult as any) ? (createResult as any).data : createResult;
      const createColumnId = createdCard.columnId;
      // const createdCardId = createdCard as Card & { id: number };
      // if (createdCardId.id) {
      //   setCardId(createdCardId.id);
      //   setUserId(assigneeId);
      // }

      // 컬럼 상태 업데이트
      setColumns((prevColumns) =>
        prevColumns.map((col) =>
          col.id === createColumnId
            ? {
                ...col,
                cards: [{ ...createdCard, tags } as CardWithTags, ...(col.cards ?? [])],
              }
            : col,
        ),
      );

      if (onCardCreated) {
        onCardCreated();
      }

      // 성공 시 모달 닫기 및 폼 초기화
      handleClose();
    } catch (error) {
      console.error("카드 생성 오류:", error);
      alert((error as Error).message || "카드 생성 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    // 폼 초기화
    setTitle("");
    setDescription("");
    setDueDate(null);
    setTags([]);
    setImageFile(null);
    setImageUrl("");
    setAssigneeId(null);

    // 모달 닫기
    setIsOpen();
  };

  return (
    <>
      {isOpen && (
        <Modal open={isOpen} isOpenModal={setIsOpen} size="lg">
          <ModalHeader title="할 일 생성" />
          <ModalContext className="flex flex-col gap-7">
            <Field id="manager" label="담당자">
              <Select options={members} placeholder="선택하기" onSelect={handleAssigneeSelect} />
            </Field>

            <Field id="title" label="제목" essential>
              <Input
                value={title}
                onChange={(e) => setTitle(e.currentTarget.value)}
                placeholder="제목을 입력해주세요"
              />
            </Field>

            <Field id="description" label="설명" essential>
              <Textarea
                className="resize-none"
                value={description}
                onChange={(e) => setDescription(e.currentTarget.value)}
                placeholder="설명을 입력해주세요"
              />
            </Field>

            <Field id="dueDate" label="마감일">
              <DatePicker value={dueDate} onChange={(date) => setDueDate(date)} />
            </Field>

            <Field id="tag" label="태그">
              <TagInput
                value={tags}
                onChange={(newTags) =>
                  setTags(
                    newTags.map((t) => ({
                      label: t.label,
                      color: getColorForTag(t.label),
                    })),
                  )
                }
              />
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
            <Button className="h-[54px] w-64" onClick={handleClose} disabled={isLoading}>
              취소
            </Button>
            <Button
              className="h-[54px] w-64"
              onClick={handleCreate}
              color={isDisabled ? "buttonGrey" : "buttonBlue"}
              disabled={isDisabled || isLoading}
            >
              {isLoading ? "생성 중..." : "생성"}
            </Button>
          </ModalFooter>
        </Modal>
      )}
    </>
  );
}
