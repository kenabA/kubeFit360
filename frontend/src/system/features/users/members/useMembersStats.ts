import { TApiResponse } from "@/system/lib/types";

import { useSuspenseQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { TStats } from "./useMembersAnalytics";
import apiMembersStats from "@/system/services/users/members/apiMembersStats";

function useMembersStats() {
  const {
    data: { data },
    error,
  } = useSuspenseQuery<TApiResponse<TStats[]>, AxiosError>({
    queryFn: () => apiMembersStats(),
    queryKey: ["membersStats"],
  });

  return { data, error };
}

export default useMembersStats;
