import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useNavigate } from "react-router";
import { ROUTES } from "@/config/appRoutes";
import { TSetPasswordFormProps } from "./types";
import apiSetPassword from "@/system/services/users/apiSetPassword";
import useSignOut from "react-auth-kit/hooks/useSignOut";

function useSetPassword() {
  const signOut = useSignOut();
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const {
    mutate: setPassword,
    isPending,
    isSuccess,
    error,
  } = useMutation({
    mutationFn: ({
      passwordDetails,
    }: {
      passwordDetails: TSetPasswordFormProps;
    }) => apiSetPassword(passwordDetails),
    onSuccess: async () => {
      toast({
        variant: "success",
        title: "Success",
        description: `User's password set successfully`,
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
  return { setPassword, isPending, isSuccess, error };
}

export default useSetPassword;
