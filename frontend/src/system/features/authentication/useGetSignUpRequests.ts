import { TApiResponse, TRole } from "@/system/lib/types";
import apiGetSignUpRequests from "@/system/services/auth/apiGetSignUpRequests";

import { useSuspenseQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useSearchParams } from "react-router";

export type TClientStatus =
  | "pending"
  | "approved"
  | "rejected"
  | "active"
  | "inactive";
type TMembershipType = "basic" | "enterprise";

export type TSignUpRequests = {
  _id: string;
  name: string;
  email: string;
  phoneNumber: number;
  role: TRole;
  status: TClientStatus;
  membershipType: TMembershipType;
  active: boolean;
  createdAt: string;
};

function useGetSignUpRequests() {
  const [searchParams] = useSearchParams();
  const params = Object.fromEntries(searchParams.entries());

  const {
    isPending,
    data: { data },
    error,
  } = useSuspenseQuery<TApiResponse<TSignUpRequests[]>, AxiosError>({
    queryFn: () => apiGetSignUpRequests(params),
    queryKey: ["signupRequests", params],
  });
  return { isPending, data, error };
}

export default useGetSignUpRequests;
