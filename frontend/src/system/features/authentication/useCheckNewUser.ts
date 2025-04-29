import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import apiCheckNewUser from "@/system/services/users/apiCheckNewUser";

function useCheckNewUser() {
  const { isPending, data, error } = useQuery<
    { passwordSet: boolean },
    AxiosError
  >({
    queryFn: () => apiCheckNewUser(),
    queryKey: ["currentUser"],
    enabled: true,
  });

  return { isPending, data, error };
}

export default useCheckNewUser;
