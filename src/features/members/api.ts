import type { GetMembersResponse, DeleteMemberResponse } from "@/features/members/types";
import { apiRequest } from "@/lib/apiRequest";

// 대시보드 멤버 목록 조회
export const getMembers = (
  dashboardId: number,
  { page, size }: { page?: number; size?: number },
) => {
  let url = `/members?dashboardId=${dashboardId}`;
  if (page) url += `&page=${page}`;
  if (size) url += `&size=${size}`;

  return apiRequest<GetMembersResponse>(url, {
    method: "GET",
    withAuth: true,
  });
};

// 대시보드 멤버 삭제
export const deleteMember = (memberId: number) =>
  apiRequest<DeleteMemberResponse>(`/members/${memberId}`, {
    method: "DELETE",
    withAuth: true,
  });
