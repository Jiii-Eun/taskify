import { create } from "zustand";

import type { Member } from "@/features/members/types";

type State = {
  membersByDashboard: Record<number, Member[]>;
  setMembers: (dashboardId: number, members: Member[]) => void;
  clearMembers: (dashboardId?: number) => void;
};

export const useDashboardMembersStore = create<State>((set) => ({
  membersByDashboard: {},
  setMembers: (dashboardId, members) =>
    set((s) => ({
      membersByDashboard: { ...s.membersByDashboard, [dashboardId]: members },
    })),
  clearMembers: (dashboardId) =>
    set((s) =>
      dashboardId == null
        ? { membersByDashboard: {} }
        : {
            membersByDashboard: Object.fromEntries(
              Object.entries(s.membersByDashboard).filter(([k]) => Number(k) !== dashboardId),
            ),
          },
    ),
}));
