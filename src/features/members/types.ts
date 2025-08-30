// GET: 대시보드 멤버 목록 조회(응답)
export interface Member {
  id: number;
  userId: number;
  email: string;
  nickname: string;
  profileImageUrl?: string;
  createdAt: string;
  updatedAt: string;
  isOwner: boolean;
}

// GET: 대시보드 멤버 목록 조회(응답)
export interface GetMembersResponse {
  members: Member[];
  totalCount: number;
}

// DELETE(id): 대시보드 멤버 삭제
export type DeleteMemberResponse = void;
