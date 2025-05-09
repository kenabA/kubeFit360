import { create } from "zustand";
import { TClientDashboardStats } from "@/system/features/users/members/useGetClientDashboardStats";

type ClientDashboardStore = {
  stats: TClientDashboardStats | null;
  setStats: (data: TClientDashboardStats) => void;
  clearStats: () => void;
};

const useClientDashboardStore = create<ClientDashboardStore>((set) => ({
  stats: null,
  setStats: (data) => set({ stats: data }),
  clearStats: () => set({ stats: null }),
}));

export default useClientDashboardStore;
