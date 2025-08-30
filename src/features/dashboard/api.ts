import type {
  Dashboard,
  CreateDashboardRequest,
  GetDashboardsResponse,
  DeleteDashboardResponse,
  InvitationRequest,
  Invitation,
  GetInvitationResponse,
  DeleteInvitationResponse,
} from "@/features/dashboard/types";
import { apiRequest } from "@/lib/apiRequest";

// 대시보드 생성
export const createDashboard = (data: CreateDashboardRequest) =>
  apiRequest<Dashboard>("/dashboards", {
    method: "POST",
    data,
    withAuth: true,
  });

// 대시보드 목록 조회
export const getDashboards = (
  navigationMethod: "infiniteScroll" | "pagination",
  {
    cursorId,
    page,
    size,
  }: {
    cursorId?: number;
    page?: number;
    size?: number;
  },
) => {
  let url = `/dashboards?navigationMethod=${navigationMethod}`;
  if (cursorId) url += `&cursorId=${cursorId}`;
  if (page) url += `&page=${page}`;
  if (size) url += `&size=${size}`;

  return apiRequest<GetDashboardsResponse>(url, {
    method: "GET",
    withAuth: true,
  });
};

// 대시보드 상세 조회
export const getDashboardById = (dashboardId: number) =>
  apiRequest<Dashboard>(`/dashboards/${dashboardId}`, {
    method: "GET",
    withAuth: true,
  });

// 대시보드 수정
export const updateDashboard = (dashboardId: number, data: CreateDashboardRequest) =>
  apiRequest<Dashboard>(`/dashboards/${dashboardId}`, {
    method: "PUT",
    data,
    withAuth: true,
  });

// 대시보드 삭제
export const deleteDashboard = (dashboardId: number) =>
  apiRequest<DeleteDashboardResponse>(`/dashboards/${dashboardId}`, {
    method: "DELETE",
    withAuth: true,
  });

// 대시보드 초대하기
export const inviteToDashboard = (dashboardId: number, data: InvitationRequest) =>
  apiRequest<Invitation>(`/dashboards/${dashboardId}/invitations`, {
    method: "POST",
    data,
    withAuth: true,
  });

// 대시보드 초대 불러오기
export const getDashboardInvitations = (
  dashboardId: number,
  { page, size }: { page?: number; size?: number },
) => {
  let url = `/dashboards/${dashboardId}/invitations`;
  if (page) url += `?page=${page}`;
  if (size) url += page ? `&size=${size}` : `?size=${size}`;

  return apiRequest<GetInvitationResponse>(url, {
    method: "GET",
    withAuth: true,
  });
};

// 대시보드 초대 취소
export const cancelDashboardInvitation = (dashboardId: number, invitationId: number) =>
  apiRequest<DeleteInvitationResponse>(`/dashboards/${dashboardId}/invitations/${invitationId}`, {
    method: "DELETE",
    withAuth: true,
  });
