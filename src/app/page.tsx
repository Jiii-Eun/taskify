"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Home from "@/components/home/Home";
import { useIsLoggedIn } from "@/features/auth/store";

import Loading from "./Loading";

export default function Page() {
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
