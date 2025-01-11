export type TUserStore = {
  user: TUserDetails | null;
  setUser: (user: TUserDetails) => void;
  isAuthenticated: boolean;
};

export type TUserDetails = {
  _id: string;
  name: string;
  email: string;
  phoneNumber: number;
  gender: ["male", "female", "others"];
  role: string;
  joinDate: string;
  status: string;
};
