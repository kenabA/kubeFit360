import apiGetAllRecentActivities from "@/system/services/recent-activities/apiGetAllRecentActivities";
import { useSuspenseQuery } from "@tanstack/react-query";
import { TRecentActivities } from "./type";
import { AxiosError } from "axios";
import { TApiResponse } from "@/system/global/types";

function useRecentActivities() {
  const {
    data: { data },
    error,
  } = useSuspenseQuery<TApiResponse<TRecentActivities[]>, AxiosError>({
    queryFn: apiGetAllRecentActivities,
    queryKey: ["recentActivities"],
  });

  return { data, error };
}

export default useRecentActivities;
