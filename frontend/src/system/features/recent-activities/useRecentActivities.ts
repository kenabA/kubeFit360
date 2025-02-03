import apiGetAllRecentActivities from "@/system/services/recent-activities/apiGetAllRecentActivities";
import { useSuspenseQuery } from "@tanstack/react-query";
import { TRecentActivities } from "./type";
import { AxiosError } from "axios";
import { TApiResponse } from "@/system/lib/types";
import { useSearchParams } from "react-router";

function useRecentActivities() {
  const [searchParams] = useSearchParams();
  const params = Object.fromEntries(searchParams.entries());
  const {
    data: { data },
    error,
  } = useSuspenseQuery<TApiResponse<TRecentActivities[]>, AxiosError>({
    queryFn: () => apiGetAllRecentActivities(params),
    queryKey: ["recentActivities", params],
  });

  return { data, error };
}

export default useRecentActivities;
