"use client";
import dayjs from "dayjs";
import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";

import DetailCardModal from "@/components/modal/cardModal/DetailCardModal";
import Chip from "@/components/common/chip/Chip";
import { CardData, ColumnData } from "@/features/dashboard/types";
import { getColorForTag } from "@/lib/utils/tagColor";

type TagType = string | { label: string; color?: { bg: string; text: string } };

type CardWithAssignee = Omit<CardData, "tags"> & {
  tags?: TagType[];
  assignee?: {
    id: number;
    nickname: string;
    profileImageUrl?: string;
  };
  setColumns?: React.Dispatch<React.SetStateAction<ColumnData[]>>;
  dashboardId?: number;
  columnId?: number;
  cardId?: number;
  status: string;
};

export default function Card({
  title,
  tags,
  dueDate,
  imageUrl,
  assignee,
  setColumns,
  dashboardId,
  columnId,
  cardId,
  status,
  columns,
}: CardWithAssignee) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={clsx(
        "relative",
        // 기본 (mobile)
        "border-brand-gray-300 flex w-full cursor-pointer flex-col gap-4 rounded-md border bg-white p-5",

        // tablet
        "tablet:w-full tablet:h-[112px] tablet:flex-row tablet:items-start tablet:gap-4 tablet:px-5",

        // pc
        "pc:w-[314px] pc:flex-col pc:h-auto pc:py-4",
      )}
      onClick={() => {
        setIsOpen(!isOpen);
      }}
    >
      {/* 이미지 영역 */}
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={title}
          width={274}
          height={160}
          className={clsx(
            "rounded-md object-cover",
            // 기본 (mobile)
            "h-auto max-h-50 w-full object-cover",

            // tablet
            "tablet:h-full tablet:w-25",

            // pc
            "pc:h-[160px] pc:w-[274px]",
          )}
        />
      )}

      <div className="tablet:gap-4 pc:gap-2 flex w-full flex-1 flex-col items-start gap-2 bg-transparent">
        {/* 제목 */}
        <h3 className="text-brand-gray-700 w-full overflow-hidden text-base font-medium text-ellipsis">
          {title}
        </h3>

        <div
          className={clsx(
            // 기본 (mobile)
            "flex w-full flex-col gap-3",

            // tablet
            "tablet:flex-row tablet:items-center tablet:justify-between",

            // pc
            "pc:flex-col pc:items-start pc:gap-3",
          )}
        >
          {/* 태그 영역 */}
          <div className="flex min-h-[24px] flex-wrap gap-2">
            {tags &&
              tags.length > 0 &&
              tags.map((tag, index) => {
                const label = typeof tag === "string" ? tag : tag.label;
                const color = getColorForTag(label);

                return <Chip key={index} variant="category" label={label} color={color} />;
              })}
          </div>

          {/* 날짜 + 작성자 */}
          <div className="tablet:justify-start tablet:gap-4 pc:justify-between pc:w-full flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Image src="/icons/icon-calender.svg" alt="calendar" width={18} height={18} />
              <span>{dayjs(dueDate).format("YYYY.MM.DD")}</span>
            </div>

            {assignee?.profileImageUrl ? (
              <img
                src={assignee.profileImageUrl}
                alt={assignee.nickname}
                className="h-6 w-6 rounded-full object-cover"
              />
            ) : (
              <img
                src="/images/img-profile-sample.svg"
                alt="기본 프로필"
                className="h-6 w-6 rounded-full object-cover"
              />
            )}
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute top-0 left-0 z-50">
          <DetailCardModal
            isOpen
            setIsOpen={setIsOpen}
            setColumns={setColumns}
            dashboardId={dashboardId}
            columnId={columnId}
            cardId={cardId}
            status={status}
            columns={columns}
          />
        </div>
      )}
    </div>
  );
}
