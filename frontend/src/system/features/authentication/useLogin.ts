import { ROUTES } from "@/config/appRoutes";
import { useToast } from "@/hooks/use-toast";
import useHandleNavigate from "@/hooks/useHandleNavigate";
import { TLoginFormProps } from "@/system/pages/Login/types";
import apiLogin from "@/system/services/auth/apiLogin";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useSignIn from "react-auth-kit/hooks/useSignIn";

function useLogin() {
  const handleNavigate = useHandleNavigate();
  const signIn = useSignIn();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { mutate: login, isPending } = useMutation({
    mutationFn: (loginDetails: TLoginFormProps) => apiLogin(loginDetails),
    onSuccess: async (userData) => {
      if (
        signIn({
          auth: { token: userData.token, type: "Bearer" },
          userState: userData.data.data,
        })
      ) {
        toast({
          variant: "success",
          title: "Success",
          description: "Logged in successfully",
        });
        // After successful login
        console.log(userData);
        localStorage.setItem("user", JSON.stringify(userData.data.data));
        queryClient.setQueryData(["user"], userData.data.data);

        switch (userData.data.data.role) {
          case "maintainer":
            handleNavigate(ROUTES.DASHBOARD.MAINTAINER);
            break;
          case "admin":
            handleNavigate(ROUTES.DASHBOARD.ADMIN);
            break;
          case "member":
            handleNavigate(ROUTES.CLIENT_WORKOUT_PLAN);
            break;
          case "trainer":
            handleNavigate(ROUTES.DASHBOARD.TRAINER);
            break;
        }
      }
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
  return { login, isPending };
}

export default useLogin;
