export type TApiResponse<T> = {
  data: { count?: number; data: T };
  status: string;
};
