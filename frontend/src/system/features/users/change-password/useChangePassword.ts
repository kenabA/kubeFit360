import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TChangePasswordFormProps } from "./types";
import apiChangePassword from "@/system/services/users/apiChangePassword";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import { useNavigate } from "react-router";
import { ROUTES } from "@/config/appRoutes";

function useChangePassword() {
  const signOut = useSignOut();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const {
    mutate: changePassword,
    isPending,
    isSuccess,
    error,
  } = useMutation({
    mutationFn: ({
      passwordDetails,
    }: {
      passwordDetails: TChangePasswordFormProps;
      selectedId: string;
    }) => apiChangePassword(passwordDetails),
    onSuccess: async () => {
      toast({
        variant: "success",
        title: "Success",
        description: `User's password changed successfully`,
      });
      queryClient.removeQueries();
      localStorage.clear();
      signOut();
      navigate(ROUTES.LOGIN, { replace: true });
    },
    onError: (err) => {
      console.log(err.message);
      toast({
        variant: "error",
        title: err.name,
        description: err.message,
      });
    },
  });
  return { changePassword, isPending, isSuccess, error };
}

export default useChangePassword;
