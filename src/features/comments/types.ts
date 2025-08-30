// POST: 댓글 생성
export interface CreateCommentRequest {
  content: string;
  cardId: number;
  columnId: number;
  dashboardId: number;
}

// 댓글 목록(응답)
export interface Comment {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  cardId: number;
  author: {
    id: number;
    nickname: string;
    profileImageUrl: string;
  };
}

// GET: 댓글 목록 조회(응답)
export interface GetCommentsResponse {
  cursorId: number | null;
  comments: Comment[];
}

// PUT(id): 댓글 수정
export interface UpdateCommentRequest {
  content: string;
}

// DELETE(id): 댓글 삭제
export type DeleteCommentResponse = void;
