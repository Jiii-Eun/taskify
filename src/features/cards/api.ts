import type {
  CardRequest,
  Card,
  GetCardsResponse,
  DeleteCardResponse,
} from "@/features/cards/types";
import { apiRequest } from "@/lib/apiRequest";

// 카드 생성
export const createCard = (data: CardRequest) =>
  apiRequest<Card>("/cards", {
    method: "POST",
    data,
    withAuth: true,
  });

// 카드 목록 조회
export const getCards = (
  columnId: number,
  {
    size,
    cursorId,
  }: {
    size?: number;
    cursorId?: number;
  },
) =>
  apiRequest<GetCardsResponse>(
    `/cards?columnId=${columnId}&size=${size}${cursorId ? `&cursorId=${cursorId}` : ""}`,
    {
      method: "GET",
      withAuth: true,
    },
  );

// 카드 상세 조회
export const getCard = (id: number) =>
  apiRequest<Card>(`/cards/${id}`, {
    method: "GET",
    withAuth: true,
  });

// 카드 수정
export const updateCard = (id: number, data: CardRequest) =>
  apiRequest<Card>(`/cards/${id}`, {
    method: "PUT",
    data,
    withAuth: true,
  });

// 카드 삭제
export const deleteCard = (id: number) =>
  apiRequest<DeleteCardResponse>(`/cards/${id}`, {
    method: "DELETE",
    withAuth: true,
  });
