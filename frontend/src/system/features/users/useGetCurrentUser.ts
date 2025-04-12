import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { TUserDetails } from "@/system/stores/user/types";
import apiGetCurrentUser from "@/system/services/users/apiGetCurrentUser";

function useGetCurrentUser() {
  const { isPending, data, error } = useQuery<TUserDetails, AxiosError>({
    queryFn: () => apiGetCurrentUser(),
    queryKey: ["test"],
    enabled: true,
  });

  return { isPending, data, error };
}

export default useGetCurrentUser;
