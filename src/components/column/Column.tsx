import Card from "@/components/card/Card";
import Chip from "@/components/chip/Chip";
import MyButton from "@/components/layout/Button";

interface CardData {
  title: string;
  tags: string[];
  date: string;
  image?: string;
  author?: string;
}

interface ColumnProps {
  status: string;
  count: number;
  cards: CardData[];
  onAddCard?: () => void;
}

export default function Column({ status, count, cards, onAddCard }: ColumnProps) {
  return (
    <div className="border-r-brand-gray-300 bg-brand-gray-100 w-[354px] border-r p-5">
      {/* 컬럼 헤더 */}
      <div className="mb-[21px] flex items-center justify-between">
        <div className="flex items-center gap-[12px]">
          {/* 컬럼 이름 */}
          <span className="flex items-center gap-2">
            <span className="bg-brand-blue-500 h-2 w-2 rounded-full" />
            <h2 className="text-2lg font-bold text-black">{status}</h2>
          </span>
          {/* 숫자 칩 */}
          <Chip variant="badge" label={count.toString()} />
        </div>
        {/* 설정 버튼 */}
        <button type="button">
          <img src="/icons/icon-settings.svg" alt="설정" className="h-6 w-6" />
        </button>
      </div>

      {/* 카드 추가 버튼 */}
      <div className="mb-4">
        <MyButton
          onClick={onAddCard ?? (() => {})}
          color="buttonBasic"
          className="flex h-10 w-full items-center justify-center"
        >
          <Chip variant="add" />
        </MyButton>
      </div>

      {/* 카드 리스트 */}
      <div className="flex flex-col gap-[15px]">
        {cards.map((card, index) => (
          <Card key={index} {...card} />
        ))}
      </div>
    </div>
  );
}
