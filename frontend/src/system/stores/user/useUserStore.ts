import { create } from "zustand";
import { TUserDetails, TUserStore } from "./types";

const useUserStore = create<TUserStore>()((set) => ({
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") as string)
    : null,

  isAuthenticated: false,

  setUser: (user: TUserDetails) => {
    set({ user });
    localStorage.setItem("user", JSON.stringify(user));
    set({ isAuthenticated: true });
  },
}));

export default useUserStore;
