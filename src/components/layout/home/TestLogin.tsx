"use client";

import { useState } from "react";

import { login } from "@/features/auth/api";
import { useAuthStore, useIsLoggedIn } from "@/features/auth/store";

export default function TestLogin() {
  const [loading, setLoading] = useState(false);
  const isLoggedIn = useIsLoggedIn();
  const clearToken = useAuthStore((s) => s.clearToken);

  const handleLogin = async () => {
    setLoading(true);
    try {
      await login({
        email: "example@email.com",
        password: "12345678",
      });
      alert("로그인 성공!");
    } catch (err) {
      console.error(err);
      alert("로그인 실패!");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    clearToken();
    alert("로그아웃 완료!");
  };
  return (
    <>
      {/* 테스트 로그인용 */}
      <button
        onClick={isLoggedIn ? handleLogout : handleLogin}
        disabled={loading}
        className="bg-brand-blue-500 hover:bg-brand-blue-600 m-4 rounded px-4 py-2 text-white disabled:opacity-50"
      >
        {loading ? "처리 중..." : isLoggedIn ? "로그아웃" : "로그인"}
      </button>
    </>
  );
}
