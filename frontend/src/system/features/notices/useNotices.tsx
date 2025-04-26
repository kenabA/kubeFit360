import { TApiResponse } from "@/system/lib/types";
import { useSuspenseQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useSearchParams } from "react-router";
import { TNoticeData } from "./type";
import apiGetAllNotices from "@/system/services/notices/apiGetAllNotices";

function useNotices() {
  const [searchParams] = useSearchParams();
  const params = Object.fromEntries(searchParams.entries());

  const {
    isPending,
    data: { data },
    error,
  } = useSuspenseQuery<TApiResponse<TNoticeData[]>, AxiosError>({
    queryFn: () => apiGetAllNotices(params),
    queryKey: ["notices", params],
  });

  return { isPending, data, error };
}

export default useNotices;
