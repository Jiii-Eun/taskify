import type { InvitationsResponse, Invitation } from "@/features/invitations/types";
import { apiRequest } from "@/lib/apiRequest";

// 내가 받은 초대 목록 조회
export const getInvitations = ({
  cursorId,
  size,
  title,
}: {
  cursorId?: number;
  size?: number;
  title?: string;
}) => {
  let url = `/invitations`;
  if (cursorId) url += `?cursorId=${cursorId}`;
  if (size) url += cursorId ? `&size=${size}` : `?size=${size}`;
  if (title) url += size ? `&title=${title}` : `?title=${title}`;

  return apiRequest<InvitationsResponse>(url, {
    method: "GET",
    withAuth: true,
  });
};

// 초대 응답
export const respondInvitation = (invitationId: number, inviteAccepted: boolean) =>
  apiRequest<Invitation>(`/invitations/${invitationId}`, {
    method: "PUT",
    data: { inviteAccepted },
    withAuth: true,
  });
