import { create } from "zustand";

interface ShowState {
  show: boolean;
  toggleShow: () => void;
  resetShow: () => void;
}

export const useShowStore = create<ShowState>((set) => ({
  show: true,
  resetShow: () => set(() => ({ show: true })),
  toggleShow: () => set((state) => ({ show: !state.show })),
}));
