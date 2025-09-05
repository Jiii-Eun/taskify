import { create } from "zustand";

import { getDashboards } from "./api";
import { Dashboard } from "./types";

interface Pagination {
  dashboards: Dashboard[];
  totalPages: number;
  page: number;
  size: number;
  setPage: (page: number) => void;
  setSize: (size: number) => void;
  fetchPagination: (customSize?: number) => Promise<void>;
}

export const usePagination = create<Pagination>((set, get) => ({
  dashboards: [],
  totalPages: 1,
  page: 1,
  size: 15,
  setPage: (page) => set({ page }),
  setSize: (size) => set({ size }),
  fetchPagination: async (customSize) => {
    const { page, size } = get();
    const limit = customSize ?? size;
    const data = await getDashboards("pagination", { page, size: limit });

    set({
      dashboards: data?.dashboards || [],
      totalPages: Math.ceil(data?.totalCount / limit) ?? 1,
      size: limit,
    });
  },
}));
