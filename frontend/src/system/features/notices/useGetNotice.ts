import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { TNoticeData } from "./type";
import apiGetNotice from "@/system/services/notices/apiGetNotice";

type TGetNotice = {
  selectedId: string;
  enabled?: boolean;
};

function useGetNotice({ selectedId, enabled = true }: TGetNotice) {
  const { isPending, data, error } = useQuery<TNoticeData, AxiosError>({
    queryFn: () => apiGetNotice(selectedId),
    queryKey: ["notice", selectedId],
    enabled: enabled && !!selectedId,
  });

  return { isPending, data, error };
}

export default useGetNotice;
