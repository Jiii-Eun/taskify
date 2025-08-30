import type {
  SignupRequest,
  SignupResponse,
  UpdateUserRequest,
  UploadProfileImageResponse,
} from "@/features/users/types";
import { apiRequest } from "@/lib/apiRequest";

// 회원가입
export const signup = (data: SignupRequest) =>
  apiRequest<SignupResponse>("/users", {
    method: "POST",
    data,
  });

// 내 정보 조회
export const getMe = () =>
  apiRequest<SignupResponse>("/users/me", {
    method: "GET",
    withAuth: true,
  });

// 내 정보 수정
export const updateMe = (data: UpdateUserRequest) =>
  apiRequest<SignupResponse>("/users/me", {
    method: "PUT",
    data,
    withAuth: true,
  });

// 프로필 이미지 업로드
export const uploadProfileImage = (data: FormData) =>
  apiRequest<UploadProfileImageResponse>("/users/me/image", {
    method: "POST",
    data,
    isFormData: true,
    withAuth: true,
  });
