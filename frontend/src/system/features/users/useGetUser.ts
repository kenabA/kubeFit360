import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { TUserDetails } from "@/system/stores/user/types";
import apiGetUser from "@/system/services/users/apiGetUser";

type TGetUser = {
  selectedId: string;
  enabled?: boolean;
};

function useGetUser({ selectedId, enabled = true }: TGetUser) {
  const { isPending, data, error } = useQuery<TUserDetails, AxiosError>({
    queryFn: () => apiGetUser(selectedId),
    // MIGHT NEED CHANGE HERE
    queryKey: ["maintainer", selectedId],
    enabled: enabled && !!selectedId,
  });

  return { isPending, data, error };
}

export default useGetUser;
