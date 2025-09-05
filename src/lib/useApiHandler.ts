"use client";

import { notFound } from "next/navigation";
import { DependencyList, useEffect, useState } from "react";

import { useAuthStore } from "@/features/auth/store";

export function useApiHandler<T>(apiFn: () => Promise<T>, deps: DependencyList = []) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const token = useAuthStore((s) => s.accessToken);

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      setLoading(true);
      setError(null);

      if (!token) {
        notFound();
        return;
      }

      try {
        const res = await apiFn();
        if (isMounted) setData(res);
      } catch (err) {
        if (isMounted) setError(err as Error);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchData();

    return () => {
      isMounted = false;
    };
  }, deps);

  return { data, loading, error };
}
