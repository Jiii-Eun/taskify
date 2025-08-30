import type {
  Column,
  CreateColumnRequest,
  UpdateColumnRequest,
  DeleteColumnResponse,
  UploadCardImageResponse,
  GetColumnsResponse,
} from "@/features/columns/types";
import { apiRequest } from "@/lib/apiRequest";

// 컬럼 생성
export const createColumn = (data: CreateColumnRequest) =>
  apiRequest<Column>("/columns", {
    method: "POST",
    data,
    withAuth: true,
  });

// 컬럼 목록 조회
export const getColumns = (dashboardId: number) =>
  apiRequest<GetColumnsResponse>(`/columns?dashboardId=${dashboardId}`, {
    method: "GET",
    withAuth: true,
  });

// 컬럼 수정
export const updateColumn = (columnId: number, data: UpdateColumnRequest) =>
  apiRequest<Column>(`/columns/${columnId}`, {
    method: "PUT",
    data,
    withAuth: true,
  });

// 컬럼 삭제
export const deleteColumn = (columnId: number) =>
  apiRequest<DeleteColumnResponse>(`/columns/${columnId}`, {
    method: "DELETE",
    withAuth: true,
  });

// 카드 이미지 업로드
export const uploadCardImage = (columnId: number, data: FormData) =>
  apiRequest<UploadCardImageResponse>(`/columns/${columnId}/card-image`, {
    method: "POST",
    data,
    isFormData: true,
    withAuth: true,
  });
