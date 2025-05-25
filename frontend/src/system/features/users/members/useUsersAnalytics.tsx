import { TApiResponse } from "@/system/lib/types";

import { useSuspenseQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import apiGetUsersAnalytics from "@/system/services/users/maintainers/apiGetUsersAnalytics";

function useUsersAnalytics() {
  const {
    isPending,
    data: { data },
    error,
  } = useSuspenseQuery<
    TApiResponse<{ total: number; role: string }[]>,
    AxiosError
  >({
    queryFn: () => apiGetUsersAnalytics(),
    queryKey: ["usersAnalytics"],
  });

  return { isPending, data, error };
}

export default useUsersAnalytics;
