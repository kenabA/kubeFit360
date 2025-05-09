import { TApiResponse } from "@/system/lib/types";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useSearchParams } from "react-router";
import { TNoticeData } from "./type";
import apiGetAllNotices from "@/system/services/notices/apiGetAllNotices";

function useNotices() {
  const [searchParams] = useSearchParams();
  const params = Object.fromEntries(searchParams.entries());

  const { isLoading, isError, data, error } = useQuery<
    TApiResponse<TNoticeData[]>,
    AxiosError
  >({
    queryFn: () => apiGetAllNotices(params),
    queryKey: ["notices", params],
    retry: false,
  });

  return {
    isLoading,
    isError,
    error,
    data: data?.data ?? [], // fallback to empty array if data is undefined
  };
}

export default useNotices;
