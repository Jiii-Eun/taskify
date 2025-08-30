// POST: 컬럼 생성
export interface CreateColumnRequest {
  title: string;
  dashboardId: number;
}

// 컬럼 목록(응답)
export interface Column {
  id: number;
  title: string;
  teamId: string;
  createdAt: string;
  updatedAt: string;
}

// GET: 컬럼 목록 조회(응답)
export interface GetColumnsResponse {
  result: "SUCCESS";
  data: Column[];
}

// PUT(id): 컬럼수정
export interface UpdateColumnRequest {
  title: string;
}

//  DELETE(id): 컬럼 삭제
export type DeleteColumnResponse = void;

// POST(id/card-image): 카드 이미지 업로드
export interface UploadCardImageResponse {
  imageUrl: string;
}
