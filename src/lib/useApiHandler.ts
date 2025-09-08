"use client";

import { notFound } from "next/navigation";
import { DependencyList, useCallback, useEffect, useState } from "react";

import { useAuthStore } from "@/features/auth/store";

export function useApiHandler<T>(apiFn: () => Promise<T>, deps: DependencyList = []) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const token = useAuthStore((s) => s.accessToken);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    if (!token) {
      notFound();
      return;
    }

    try {
      const res = await apiFn();
      setData(res);
      return res;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [apiFn, token]);

  useEffect(() => {
    fetchData().catch(() => {});
  }, deps);

  return { data, loading, error, refetch: fetchData };
}
