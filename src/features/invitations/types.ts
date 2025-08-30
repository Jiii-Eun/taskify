// 초대 목록 조회(응답)
export interface Invitation {
  id: number;
  inviter: {
    id: number;
    email: string;
    nickname: string;
  };
  teamId: string;
  dashboard: {
    id: number;
    title: string;
  };
  invitee: {
    id: number;
    email: string;
    nickname: string;
  };
  inviteAccepted: boolean;
  createdAt: string;
  updatedAt: string;
}

// GET: 내가 받은 초대 목록 조회(응답)
export interface InvitationsResponse {
  cursorId: number | null;
  invitations: Invitation[];
}

// PUT(id): 초대 응답
export interface RespondInvitationRequest {
  inviteAccepted: boolean;
}
