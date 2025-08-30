import type {
  Comment,
  CreateCommentRequest,
  GetCommentsResponse,
  UpdateCommentRequest,
  DeleteCommentResponse,
} from "@/features/comments/types";
import { apiRequest } from "@/lib/apiRequest";

// 댓글 생성
export const createComment = (data: CreateCommentRequest) =>
  apiRequest<Comment>("/comments", {
    method: "POST",
    data,
    withAuth: true,
  });

// 댓글 목록 조회
export const getComments = (
  cardId: number,
  {
    cursorId,
    size,
  }: {
    cursorId?: number;
    size?: number;
  },
) => {
  // 스크롤 시 추가되게끔
  let url = `/comments?cardId=${cardId}`;
  if (cursorId) url += `&cursorId=${cursorId}`;
  if (size) url += `&size=${size}`;

  return apiRequest<GetCommentsResponse>(url, {
    method: "GET",
    withAuth: true,
  });
};

// 댓글 수정
export const updateComment = (commentId: number, data: UpdateCommentRequest) =>
  apiRequest<Comment>(`/comments/${commentId}`, {
    method: "PUT",
    data,
    withAuth: true,
  });

// 댓글 삭제
export const deleteComment = (commentId: number) =>
  apiRequest<DeleteCommentResponse>(`/comments/${commentId}`, {
    method: "DELETE",
    withAuth: true,
  });
