export type TApiResponse<T> = {
  data: { count?: number; data: T };
  status: string;
};

export type TRole = "admin" | "maintainer" | "member" | "trainer";
