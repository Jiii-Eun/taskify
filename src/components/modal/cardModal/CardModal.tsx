"use client";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

import Chip from "@/components/common/chip/Chip";
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
import { getMembers } from "@/features/members/api";
import { getColorForTag } from "@/lib/utils/tagColor";

type CardModalProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  columns?: ColumnData[];
  setColumns?: React.Dispatch<React.SetStateAction<ColumnData[]>>;
  dashboardId?: number;
  columnId?: number;
  mode?: "create" | "edit";
  cardData?: Card | null;
  cardId?: number;
};

export default function CardModal({
  isOpen,
  setIsOpen,
  setColumns,
  dashboardId,
  columnId,
  columns,
  mode = "create",
  cardData = null,
  cardId,
}: CardModalProps) {
  // 폼 상태
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: null as Date | null,
    tags: [] as Tag[],
    imageFile: null as File | null,
    imageUrl: "",
    assigneeId: null as number | null,
    selectedColumnId: null as number | null,
  });

  const [members, setMembers] = useState<Option[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const isEditMode = mode === "edit";
  const isDisabled = formData.title.trim() === "" || formData.description.trim() === "";

  // 상태 선택 옵션 (수정 모드용)
  const statusOptions =
    columns?.map((col) => ({
      value: String(col.id),
      label: col.title,
      chip: <Chip variant="status" label={col.title} />,
    })) || [];

  // 멤버 목록 로드
  useEffect(() => {
    if (!isOpen || !dashboardId) return;

    const loadMembers = async () => {
      try {
        const res = await getMembers(dashboardId, { page: 1, size: 20 });
        const memberOpts = res.members.map((m) => ({
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
        setMembers(memberOpts);
      } catch (err) {
        console.error("멤버 목록 불러오기 실패:", err);
      }
    };

    loadMembers();
  }, [isOpen, dashboardId]);

  // 카드 데이터로 폼 초기화 (수정 시)
  useEffect(() => {
    if (cardData && isOpen && isEditMode) {
      setFormData({
        title: cardData.title || "",
        description: cardData.description || "",
        dueDate: cardData.dueDate ? new Date(cardData.dueDate) : null,
        tags: (cardData.tags || []).map((t) => ({
          label: t,
          color: getColorForTag(t),
        })),
        imageUrl: cardData.imageUrl || "",
        imageFile: null,
        assigneeId: cardData.assignee?.id || null,
        selectedColumnId: columnId || null,
      });
    } else if (!isEditMode && isOpen) {
      // 생성 모드일 때 초기화
      setFormData({
        title: "",
        description: "",
        dueDate: null,
        tags: [],
        imageFile: null,
        imageUrl: "",
        assigneeId: null,
        selectedColumnId: columnId || null, // undefined를 null로 변환
      });
    }
  }, [cardData, isOpen, isEditMode, columnId]);

  // 폼 데이터 업데이트
  const updateFormData = (updates: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  // 담당자 선택
  const handleAssigneeSelect = (opt: Option) => {
    updateFormData({ assigneeId: Number(opt.value) });
  };

  // 상태 선택 (수정시)
  const handleStatusSelect = (opt: Option) => {
    updateFormData({ selectedColumnId: Number(opt.value) });
  };

  // 이미지 업로드 처리
  const uploadImage = async (): Promise<string | undefined> => {
    if (!formData.imageFile) {
      return formData.imageUrl && !formData.imageUrl.startsWith("blob:")
        ? formData.imageUrl
        : undefined;
    }

    // columnId가 undefined인 경우 에러 처리
    if (!columnId) {
      console.error("columnId가 없습니다.");
      return undefined;
    }

    try {
      const formDataObj = new FormData();
      formDataObj.append("image", formData.imageFile);
      const uploadResult = await uploadCardImage(columnId, formDataObj);

      // 응답 구조에 따른 이미지 URL 추출
      const direct = (uploadResult as { imageUrl?: unknown }).imageUrl;
      const nested = (uploadResult as { data?: { imageUrl?: unknown } }).data?.imageUrl;

      return typeof direct === "string" ? direct : typeof nested === "string" ? nested : undefined;
    } catch (uploadError) {
      console.error("이미지 업로드 실패", uploadError);
      return undefined;
    }
  };

  // 카드 생성/수정 처리
  const handleSubmit = async () => {
    if (isDisabled || isLoading) return;

    if (!formData.assigneeId) {
      alert("담당자를 선택해주세요.");
      return;
    }

    if (isEditMode && !cardId) {
      alert("카드 정보를 찾을 수 없습니다.");
      return;
    }

    // 필수 값 검증
    if (!dashboardId || !columnId) {
      alert("필수 정보가 누락되었습니다.");
      return;
    }

    setIsLoading(true);

    try {
      // 이미지 업로드
      const imageUrl = await uploadImage();

      // 카드 데이터 준비
      const targetColumnId = isEditMode ? formData.selectedColumnId || columnId : columnId;

      const cardPayload = {
        assigneeUserId: formData.assigneeId,
        dashboardId,
        columnId: targetColumnId,
        title: formData.title.trim(),
        description: formData.description.trim(),
        dueDate: formData.dueDate ? dayjs(formData.dueDate).format("YYYY-MM-DD HH:mm") : "",
        tags: formData.tags.map((tag) => tag.label),
        imageUrl,
      };

      if (isEditMode) {
        await handleUpdateCard(cardPayload, targetColumnId);
      } else {
        await handleCreateCard(cardPayload);
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

  // 카드 생성 처리
  const handleCreateCard = async (cardPayload: any) => {
    if (!setColumns) return;

    const createResult = await createCard(cardPayload);

    // API 응답에서 카드 데이터 추출
    let createdCard: Card;
    if (typeof createResult === "object" && createResult !== null && "data" in createResult) {
      createdCard = createResult.data as Card;
    } else {
      createdCard = createResult as Card;
    }

    // Card를 CardData 형식으로 변환
    const cardData = {
      ...createdCard,
      tags: createdCard.tags || [], // undefined인 경우 빈 배열로 처리
    };

    setColumns((prevColumns) =>
      prevColumns.map((col) =>
        col.id === createdCard.columnId
          ? {
              ...col,
              cards: [cardData, ...(col.cards ?? [])],
            }
          : col,
      ),
    );
  };

  // 카드 수정 처리
  const handleUpdateCard = async (cardPayload: any, targetColumnId: number) => {
    if (!setColumns || !cardId) return;

    const updateResult = await updateCard(cardId, cardPayload);

    // API 응답에서 카드 데이터 추출
    let updatedCard: Card;
    if (typeof updateResult === "object" && updateResult !== null && "data" in updateResult) {
      updatedCard = updateResult.data as Card;
    } else {
      updatedCard = updateResult as Card;
    }

    // Card를 CardData 형식으로 변환
    const cardData = {
      ...updatedCard,
      tags: updatedCard.tags || [], // undefined인 경우 빈 배열로 처리
    };

    setColumns((prevColumns) => {
      return prevColumns.map((col) => {
        // 원래 컬럼에서 카드 제거 (컬럼이 변경된 경우)
        if (col.id === columnId && targetColumnId !== columnId) {
          return {
            ...col,
            cards: col.cards?.filter((card) => card.id !== cardId) || [],
          };
        }

        // 새 컬럼에 카드 추가 또는 기존 카드 업데이트
        if (col.id === targetColumnId) {
          if (targetColumnId !== columnId) {
            // 다른 컬럼으로 이동
            return {
              ...col,
              cards: [...(col.cards || []), cardData],
            };
          } else {
            // 같은 컬럼 내에서 업데이트
            return {
              ...col,
              cards: col.cards?.map((card) => (card.id === cardId ? cardData : card)) || [],
            };
          }
        }

        return col;
      });
    });
  };

  // 모달 닫기 및 폼 초기화
  const handleClose = () => {
    setFormData({
      title: "",
      description: "",
      dueDate: null,
      tags: [],
      imageFile: null,
      imageUrl: "",
      assigneeId: null,
      selectedColumnId: null,
    });

    setIsOpen(false);
  };

  // 현재 선택된 상태 값 찾기
  const getCurrentStatusValue = () => {
    if (!formData.selectedColumnId) return undefined;
    return String(formData.selectedColumnId);
  };

  if (!isOpen) return null;

  return (
    <Modal open={isOpen} isOpenModal={setIsOpen} size="lg">
      <ModalHeader title={isEditMode ? "할 일 수정" : "할 일 생성"} />

      <ModalContext className="flex flex-col gap-7">
        <div className="flex gap-8">
          {/* 수정 모드일 때만 상태 선택 표시 */}
          {isEditMode && (
            <Field id="status" label="상태">
              <Select
                options={statusOptions}
                placeholder="상태 선택"
                labelNone={true}
                onSelect={handleStatusSelect}
                value={getCurrentStatusValue()}
              />
            </Field>
          )}

          <Field id="manager" label="담당자">
            <Select
              options={members}
              placeholder="담당자 선택"
              onSelect={handleAssigneeSelect}
              value={formData.assigneeId ? String(formData.assigneeId) : undefined}
            />
          </Field>
        </div>
        <Field id="title" label="제목" essential>
          <Input
            value={formData.title}
            onChange={(e) => updateFormData({ title: e.currentTarget.value })}
            placeholder="제목을 입력해주세요"
          />
        </Field>

        <Field id="description" label="설명" essential>
          <Textarea
            className="resize-none"
            value={formData.description}
            onChange={(e) => updateFormData({ description: e.currentTarget.value })}
            placeholder="설명을 입력해주세요"
          />
        </Field>

        <Field id="dueDate" label="마감일">
          <DatePicker
            value={formData.dueDate}
            onChange={(date) => updateFormData({ dueDate: date })}
          />
        </Field>

        <Field id="tag" label="태그">
          <TagInput
            value={formData.tags}
            onChange={(newTags) =>
              updateFormData({
                tags: newTags.map((t) => ({
                  label: t.label,
                  color: getColorForTag(t.label),
                })),
              })
            }
          />
        </Field>

        <Field id="image" label="이미지">
          <ImgUpload
            value={formData.imageUrl}
            onChange={(file, previewUrl) => {
              updateFormData({
                imageFile: file,
                imageUrl: previewUrl,
              });
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
  );
}
