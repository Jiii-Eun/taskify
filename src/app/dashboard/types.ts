// 카드 데이터 타입
export interface CardData {
  title: string;
  description: string;
  dueDate: string;
  tags: string[];
  imageUrl?: string;
  author?: string;
}
// 컬럼 타입
export interface ColumnData {
  id: number;
  title: string;
  cards?: CardData[];
}
// 컬럼 컴포넌트 타입
export interface ColumnProps {
  status: string;
  cards: CardData[];
  onAddCard?: () => void;
  kebabIndex: boolean;
  isKebabOpen?: () => void;
  columnId: number;
  setColumns: React.Dispatch<React.SetStateAction<ColumnData[]>>;
}
