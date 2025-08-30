// POST: 로그인
export interface LoginRequest {
  email: string;
  password: string;
}

// POST: 로그인(응답)
export interface LogRequest {
  user: {
    id: number;
    email: string;
    nickname: string;
    profileImageUrl: string;
    createdAt: string;
    updatedAt: string;
  };
  accessToken: string;
}

// PUT: 비밀번호 변경
export interface NewPasswordRequest {
  password: string;
  newPassword: string;
}

// PUT: 비밀번호 변경(응답)
export type ChangePasswordResponse = void;
