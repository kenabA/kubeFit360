import { create } from "zustand";
import { TUserDetails, TUserStore } from "./types";

const useUserStore = create<TUserStore>()((set) => ({
  user: JSON.parse(localStorage.getItem("user") || "") || null,
  setUser: (user: TUserDetails) => {
    localStorage.setItem("user", JSON.stringify(user));
    set({ user });
  },
}));

export default useUserStore;
