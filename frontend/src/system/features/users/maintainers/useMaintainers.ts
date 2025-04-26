import { TApiResponse } from "@/system/lib/types";

import { useSuspenseQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useSearchParams } from "react-router";

import apiGetAllMaintainers from "@/system/services/users/maintainers/apiGetAllMaintainers";
import { TUserDetails } from "@/system/stores/user/types";

function useMaintainers() {
  const [searchParams] = useSearchParams();
  const params = Object.fromEntries(searchParams.entries());

  const {
    isPending,
    data: { data },
    error,
  } = useSuspenseQuery<TApiResponse<TUserDetails[]>, AxiosError>({
    queryFn: () => apiGetAllMaintainers(params),
    queryKey: ["maintainers", params],
  });

  return { isPending, data, error };
}

export default useMaintainers;
