import { TApiResponse } from "@/system/lib/types";

import { useSuspenseQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useSearchParams } from "react-router";

import { TClientDetails } from "@/system/stores/user/types";
import apiGetAllMembers from "@/system/services/users/members/apiGetAllMembers";

function useMembers() {
  const [searchParams] = useSearchParams();
  const params = Object.fromEntries(searchParams.entries());

  const {
    isPending,
    data: { data },
    error,
  } = useSuspenseQuery<TApiResponse<TClientDetails[]>, AxiosError>({
    queryFn: () => apiGetAllMembers(params),
    queryKey: ["members", params],
  });

  return { isPending, data, error };
}

export default useMembers;
