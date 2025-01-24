import apiAuth from "@/system/services/auth/apiAuth";
import { useSuspenseQuery } from "@tanstack/react-query";

function useAuth() {
  const { data: authResponse } = useSuspenseQuery({
    queryKey: ["auth"],
    queryFn: () => apiAuth(),
    retry: true,
  });

  return { authResponse };
}

export default useAuth;
