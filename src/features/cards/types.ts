// POST: 카드 생성, Put(id): 카드 수정
export interface CardRequest {
  assigneeUserId: number;
  dashboardId: number;
  columnId: number;
  title: string;
  description: string;
  dueDate: string;
  tags?: string[];
  imageUrl?: string;
}

// 카드 목록(응답)
export interface Card {
  id: number;
  title: string;
  description: string;
  tags?: string[];
  dueDate: string;
  assignee?: {
    id: number;
    nickname: string;
    profileImageUrl: string;
  };
  imageUrl?: string;
  teamId: string;
  columnId: number;
  createdAt: string;
  updatedAt: string;
}

// GET: 카드 목록 조회(응답)
export interface GetCardsResponse {
  cursorId: number | null;
  totalCount: number;
  cards: Card[];
}

// DELETE(id): 카드 삭제
export type DeleteCardResponse = void;
