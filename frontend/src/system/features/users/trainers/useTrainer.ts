import { TApiResponse } from "@/system/lib/types";

import { useSuspenseQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useSearchParams } from "react-router";

import { TUserDetails } from "@/system/stores/user/types";
import apiGetAllTrainers from "@/system/services/users/trainers/apiGetAllTrainers";

function useTrainers() {
  const [searchParams] = useSearchParams();
  const params = Object.fromEntries(searchParams.entries());

  const {
    isPending,
    data: { data },
    error,
  } = useSuspenseQuery<TApiResponse<TUserDetails[]>, AxiosError>({
    queryFn: () => apiGetAllTrainers(params),
    queryKey: ["trainers", params],
  });

  return { isPending, data, error };
}

export default useTrainers;
