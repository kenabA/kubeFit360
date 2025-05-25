import { create } from "zustand";
import { TUserDetails, TUserStore } from "./types";

const useUserStore = create<TUserStore>()((set) => ({
  isNewUser: null,
  subscriptionExpired: false,
  setIsNewUser: (state) => set({ isNewUser: state }),
  setSubscriptionExpired: (state) => set({ subscriptionExpired: state }),
  user: (() => {
    const storedUser = localStorage.getItem("user");
    try {
      return storedUser ? JSON.parse(storedUser) : null;
    } catch {
      return null;
    }
  })(),
  setUser: (user: TUserDetails) => {
    localStorage.setItem("user", JSON.stringify(user));
    set({ user });
  },
}));

export default useUserStore;
