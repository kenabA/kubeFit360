import { create } from "zustand";
import { TUserDetails, TUserStore } from "./types";

const useUserStore = create<TUserStore>()((set) => ({
  user: null,
  setUser: (user: TUserDetails) => {
    set({ user });
  },
}));

export default useUserStore;
