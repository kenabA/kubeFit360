export type TBaseApiResponse<T> = {
  data: { count?: number; data: T };
  status: string;
  message: string;
};

export type TApiResponse<T> = TBaseApiResponse<T>;

export type TAuthApiResponse<T> = TBaseApiResponse<T> & {
  token: string;
};

export type TRole = "admin" | "maintainer" | "member" | "trainer";
