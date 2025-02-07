import { TApiResponse } from "@/system/lib/types";

import { useSuspenseQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { TMembersStats } from "./useMembersAnalytics";
import apiMembersStats from "@/system/services/users/members/apiMembersStats";

function useMembersStats() {
  const {
    data: { data },
    error,
  } = useSuspenseQuery<TApiResponse<TMembersStats[]>, AxiosError>({
    queryFn: () => apiMembersStats(),
    queryKey: ["membersStats"],
  });

  return { data, error };
}

export default useMembersStats;
