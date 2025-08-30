// POST: 회원가입
export interface SignupRequest {
  email: string;
  nickname: string;
  password: string;
}

// POST: 회원가입(응답), GET(/me): 내 정보 조회(응답)
export interface SignupResponse {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

// PUT(/me): 내 정보 수정
export interface UpdateUserRequest {
  nickname: string;
  profileImageUrl?: string;
}

// POST(/me/image): 프로필 이미지 업로드
export interface UploadProfileImageResponse {
  profileImageUrl?: string;
}
