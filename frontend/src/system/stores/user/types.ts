export type TUserStore = {
  user: TUserDetails | null;
  setUser: (user: TUserDetails) => void;
};

export type TUserDetails = {
  _id: string;
  address: string;
  birthDate: string;
  name: string;
  email: string;
  phoneNumber: string;
  gender: string;
  role: "maintainer" | "admin" | "trainer" | "member";
  joinDate: string;
  status: string;
  userImage: string;
  createdAt: string;
};
