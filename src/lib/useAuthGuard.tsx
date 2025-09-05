"use client";

import { useEffect, useState } from "react";

import { useIsLoggedIn } from "@/features/auth/store";

export function useAuthGuard() {
  const isLoggedIn = useIsLoggedIn();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return { isLoggedIn, hydrated };
}
