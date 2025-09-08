"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Home from "@/components/home/Home";
import { useIsLoggedIn } from "@/features/auth/store";

import Loading from "./loading";

export default function Page() {
  // zustand활용했지만 리다이렉트 할 때는 쿠키사용이 좋아보인다.
  const router = useRouter();
  const isLoggedIn = useIsLoggedIn();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated && isLoggedIn) {
      router.replace("/mydashboard");
    }
  }, [hydrated, isLoggedIn, router]);

  if (!hydrated) {
    return <Loading />;
  }

  if (isLoggedIn) {
    return <Loading />;
  }

  return <Home />;
}
