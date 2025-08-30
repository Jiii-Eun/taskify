import type {
  LoginRequest,
  LogRequest,
  NewPasswordRequest,
  ChangePasswordResponse,
} from "@/features/auth/types";
import { apiRequest } from "@/lib/apiRequest";

import { useAuthStore } from "./store";

// 로그인
export const login = async (data: LoginRequest) => {
  const res = await apiRequest<LogRequest>("/auth/login", {
    method: "POST",
    data,
  });

  useAuthStore.getState().setAccessToken(res.accessToken);

  return res;
};

// 비밀번호 변경
export const changePassword = (data: NewPasswordRequest) =>
  apiRequest<ChangePasswordResponse>("/auth/password", {
    method: "PUT",
    data,
    withAuth: true, //토큰 필요
  });
