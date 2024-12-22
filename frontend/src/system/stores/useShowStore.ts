import { create } from "zustand";

interface ShowState {
  show: boolean;
  toggleShow: () => void;
}

export const useShowStore = create<ShowState>((set) => ({
  show: true,
  toggleShow: () => set((state) => ({ show: !state.show })),
}));
