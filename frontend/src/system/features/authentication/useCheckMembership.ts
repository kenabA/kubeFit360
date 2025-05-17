import apiCheckMembership from "@/system/services/users/apiCheckMembership";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

function useCheckMembership() {
  const { isPending, data, error } = useQuery<
    { membershipExpired: boolean },
    AxiosError
  >({
    queryFn: () => apiCheckMembership(),
    queryKey: ["membershipStatus"],
    enabled: true,
  });

  return { isPending, data, error };
}

export default useCheckMembership;
