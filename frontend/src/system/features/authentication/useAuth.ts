import apiAuth from "@/system/services/auth/apiAuth";
import { useQuery } from "@tanstack/react-query";

function useAuth() {
  const { data: authResponse, isLoading } = useQuery({
    queryKey: ["auth"],
    queryFn: () => apiAuth(),
    retry: false,
  });

  return { authResponse, isLoading };
}

export default useAuth;
