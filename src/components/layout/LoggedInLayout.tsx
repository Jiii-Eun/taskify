"use client";

import { notFound } from "next/navigation";

import Loading from "@/app/Loading";
import { useAuthGuard } from "@/lib/useAuthGuard";

export default function LoggedInLayout({ children }: { children: React.ReactNode }) {
  const { isLoggedIn, hydrated } = useAuthGuard();

  if (!hydrated) {
    return <Loading />;
  }

  // 로그인 안 되어있을 때
  if (!isLoggedIn) {
    notFound();
    return <Loading />;
  }

  // 로그인 되어있을 때
  return <>{children}</>;
}
