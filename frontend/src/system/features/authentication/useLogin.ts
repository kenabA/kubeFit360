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
        queryClient.setQueryData(["user"], userData);

        switch (userData.data.data.role) {
          case "maintainer":
            handleNavigate("/maintainer-dashboard");
            break;
          case "admin":
            handleNavigate("/admin-dashboard");
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

// 1. Request Login
// 2. Set the token in the local storage
// 3. Fetch the user profile
//   1. Get the token from the local storage
//   2. Set the token in the headers
//   3. Fetch the user again
// 4. Set the user in the global state
