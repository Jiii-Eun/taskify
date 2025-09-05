import Image from "next/image";

import Chip from "@/components/chip/Chip";

interface CardProps {
  title: string;
  tags: string[];
  date: string;
  image?: string;
}

export default function Card({ title, tags, date, image }: CardProps) {
  return (
    <div className="w-[314px] rounded-md border border-[#D9D9D9] bg-white px-5 py-4">
      {/* 이미지 영역 */}
      {image && (
        <Image
          src={image}
          alt={title}
          width={274}
          height={160}
          className="mb-[13px] rounded-md object-cover"
        />
      )}

      {/* 제목 */}
      <h3 className="mb-[10px] text-base font-medium text-[#000000]">{title}</h3>

      {/* 태그 영역 */}
      <div className="mb-[13px] flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Chip key={tag} variant="category" label={tag} />
        ))}
      </div>

      {/* 날짜 + 작성자 */}
      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <Image src="/icons/icon-calender.svg" alt="calendar" width={18} height={18} />
          <span>{date}</span>
        </div>
        <div className="flex h-6 w-6 rounded-full bg-[#A3C4A2] font-bold"></div>
      </div>
    </div>
  );
}
