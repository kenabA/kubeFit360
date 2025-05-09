export type TUserStore = {
  subscriptionStatus: boolean;
  setSubscriptionStatus: (state: boolean) => void;
  isNewUser: boolean | null;
  setIsNewUser: (state: boolean) => void;
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

export type TClientDetails = TUserDetails & {
  membershipType: "basic" | "enterprise";
  renewalDate: string;
  active: boolean;
};
