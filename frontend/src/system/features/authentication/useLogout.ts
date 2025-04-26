import { ROUTES } from "@/config/appRoutes";
import { useToast } from "@/hooks/use-toast";
import apiLogout from "@/system/services/auth/apiLogout";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import { useNavigate } from "react-router";

function useLogout() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const signOut = useSignOut();

  const { mutate: logoutUser, isPending } = useMutation({
    mutationFn: () => apiLogout(),

    onSuccess: () => {
      toast({
        variant: "success",
        title: "Success",
        description: "Logged out successfully",
      });
      queryClient.removeQueries();
      signOut();
      navigate(ROUTES.LOGIN, { replace: true });
    },
    onError: (err: AxiosError) => {
      toast({
        variant: "error",
        title: "Fail",
        description: err.message,
      });
    },
  });

  return { logoutUser, isPending };
}

export default useLogout;
