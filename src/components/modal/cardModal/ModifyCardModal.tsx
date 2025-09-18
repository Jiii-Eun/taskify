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
import { createCard, updateCard } from "@/features/cards/api";
import { uploadCardImage } from "@/features/columns/api";
import type { Card } from "@/features/cards/types";
import { ColumnData } from "@/features/dashboard/types";
import { Member } from "@/features/members/types";
import { getMembers } from "@/features/members/api";

import { getColorForTag } from "@/lib/utils/tagColor";

type CardWithTags = Card & { tags: Tag[] };

type CardModalProps = {
  isOpen: boolean;
  setIsOpen: () => void | React.Dispatch<React.SetStateAction<boolean>>;
  setColumns: React.Dispatch<React.SetStateAction<ColumnData[]>>;
  dashboardId: number;
  columnId: number;
  mode?: "create" | "edit";
  cardData?: Card | null;
  cardId?: number;
  status?: string | Option[]; // 상태 옵션들
  members?: Member | Option[]; // 멤버 옵션들
};

export default function CardModal({
  isOpen,
  setIsOpen,
  setColumns,
  dashboardId,
  columnId,
  mode = "create",
  cardData = null,
  cardId,
  status,
  members: propMembers,
}: CardModalProps) {
  // 폼 상태
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [tags, setTags] = useState<Tag[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [members, setMembers] = useState<Option[]>([]);
  const [assigneeId, setAssigneeId] = useState<number | null>(null);
  const [selectedColumnId, setSelectedColumnId] = useState<number | null>(null);

  // 편집 모드 여부
  const isEditMode = mode === "edit";

  // 필수 값 체크
  const isDisabled = title.trim() === "" || description.trim() === "";

  // 멤버 목록 로드 (생성 모드일 때만)
  useEffect(() => {
    if (!isOpen || !dashboardId || isEditMode) return;

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
      } catch (err) {
        console.error("멤버 목록 불러오기 실패:", err);
      }
    })();
  }, [isOpen, dashboardId, isEditMode]);

  // 수정 모드일 때 propMembers 사용
  useEffect(() => {
    if (isEditMode && propMembers) {
      if (Array.isArray(propMembers)) {
        setMembers(propMembers);
      }
    }
  }, [isEditMode, propMembers]);

  // 카드 데이터로 폼 초기화 (수정 모드)
  useEffect(() => {
    if (cardData && isOpen && isEditMode) {
      setTitle(cardData.title || "");
      setDescription(cardData.description || "");
      setDueDate(cardData.dueDate ? new Date(cardData.dueDate) : null);

      // string[] → Tag[]
      setTags(
        (cardData.tags || []).map((t) => ({
          label: t,
          color: getColorForTag(t),
        })),
      );

      setImageUrl(cardData.imageUrl || "");
      setImageFile(null);
      setSelectedColumnId(columnId);

      if (cardData.assignee) {
        setAssigneeId(cardData.assignee.id);
      }
    }
  }, [cardData, isOpen, isEditMode, columnId]);

  // 담당자 선택 핸들러
  const handleAssigneeSelect = (opt: Option) => {
    const selectedId = Number(opt.value);
    setAssigneeId(selectedId);
  };

  // 상태(컬럼) 선택 핸들러 (수정 모드용)
  const handleStatusSelect = (opt: Option) => {
    const newColumnId = Number(opt.value);
    setSelectedColumnId(newColumnId);
  };

  // 메인 처리 함수
  const handleSubmit = async () => {
    if (isDisabled || isLoading) return;

    if (!assigneeId) {
      alert("담당자를 선택해주세요.");
      return;
    }

    if (isEditMode && !cardId) {
      alert("카드 확인 실패");
      return;
    }

    if (!isEditMode && !columnId) {
      alert("컬럼 정보가 없습니다.");
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

      // 카드 데이터 준비
      const cardData = {
        assigneeUserId: assigneeId,
        dashboardId,
        columnId: isEditMode ? selectedColumnId || columnId : columnId,
        title: title.trim(),
        description: description.trim(),
        dueDate: dueDate ? dayjs(dueDate).format("YYYY-MM-DD HH:mm") : "",
        tags: tags.map((tag) => tag.label),
        imageUrl: updateImg,
      };

      if (isEditMode) {
        // 수정 모드
        const updateResult = await updateCard(cardId!, cardData);
        const updatedCard =
          "data" in (updateResult as any) ? (updateResult as any).data : updateResult;
        const targetColumnId = selectedColumnId || columnId;

        // 컬럼 상태 업데이트
        setColumns((prevColumns) => {
          return prevColumns.map((col) => {
            if (col.id === columnId && targetColumnId !== columnId) {
              // 기존 컬럼에서 제거
              return {
                ...col,
                cards: col.cards?.filter((card) => (card as any).id !== cardId) || [],
              };
            } else if (col.id === targetColumnId) {
              // 새 컬럼에 추가 or 기존 카드 업데이트
              if (targetColumnId !== columnId) {
                return { ...col, cards: [...(col.cards || []), updatedCard] };
              } else {
                return {
                  ...col,
                  cards:
                    col.cards?.map((card) => ((card as any).id === cardId ? updatedCard : card)) ||
                    [],
                };
              }
            }
            return col;
          });
        });

        alert("수정되었습니다.");
        if (onModifyComplete) {
          onModifyComplete();
        }
      } else {
        // 생성 모드
        const createResult = await createCard(cardData);
        const createdCard: Card =
          "data" in (createResult as any) ? (createResult as any).data : createResult;
        const createColumnId = createdCard.columnId;

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
      }

      handleClose();
    } catch (error) {
      console.error(`카드 ${isEditMode ? "수정" : "생성"} 오류:`, error);
      alert(
        (error as Error).message || `카드 ${isEditMode ? "수정" : "생성"} 중 오류가 발생했습니다.`,
      );
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
    setSelectedColumnId(null);

    // 모달 닫기
    if (typeof setIsOpen === "function") {
      if (isEditMode) {
        (setIsOpen as React.Dispatch<React.SetStateAction<boolean>>)(false);
      } else {
        (setIsOpen as () => void)();
      }
    }
  };

  return (
    <>
      {isOpen && (
        <Modal open={isOpen} isOpenModal={setIsOpen} size="lg">
          <ModalHeader title={isEditMode ? "할 일 수정" : "할 일 생성"} />
          <ModalContext className="flex flex-col gap-7">
            {/* 수정 모드일 때만 상태 선택 표시 */}
            {isEditMode && (
              <div className="grid grid-cols-2 gap-8">
                <Field id="status" label="상태">
                  <Select
                    options={status as Option[]}
                    placeholder="선택하기"
                    labelNone={true}
                    onSelect={handleStatusSelect}
                    value={selectedColumnId ? String(selectedColumnId) : undefined}
                  />
                </Field>
                <Field id="manager" label="담당자">
                  <Select
                    options={members}
                    placeholder="선택하기"
                    onSelect={handleAssigneeSelect}
                    value={assigneeId ? String(assigneeId) : undefined}
                  />
                </Field>
              </div>
            )}

            {/* 생성 모드일 때는 담당자만 표시 */}
            {!isEditMode && (
              <Field id="manager" label="담당자">
                <Select options={members} placeholder="선택하기" onSelect={handleAssigneeSelect} />
              </Field>
            )}

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
              onClick={handleSubmit}
              color={isDisabled ? "buttonGrey" : "buttonBlue"}
              disabled={isDisabled || isLoading}
            >
              {isLoading ? `${isEditMode ? "수정" : "생성"} 중...` : isEditMode ? "수정" : "생성"}
            </Button>
          </ModalFooter>
        </Modal>
      )}
    </>
  );
}
