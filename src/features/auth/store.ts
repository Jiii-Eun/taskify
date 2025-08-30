import { create } from "zustand";

// 토큰 저장
interface AuthState {
  accessToken: string | null;
  setAccessToken: (token: string) => void;
  clearToken: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: typeof window !== "undefined" ? localStorage.getItem("accessToken") : null,
  setAccessToken: (token) => {
    localStorage.setItem("accessToken", token);
    set({ accessToken: token });
  },
  clearToken: () => {
    localStorage.removeItem("accessToken");
    set({ accessToken: null });
  },
}));
