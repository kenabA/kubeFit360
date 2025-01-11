import { useToast } from "@/hooks/use-toast";
import useHandleNavigate from "@/hooks/useHandleNavigate";
import { TLoginFormProps } from "@/system/pages/Login/types";
import apiLogin from "@/system/services/apiLogin";
import { TUserDetails } from "@/system/stores/user/types";
import useUserStore from "@/system/stores/user/useUserStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useLogin() {
  const handleNavigate = useHandleNavigate();
  const queryClient = useQueryClient();
  const setUser = useUserStore((state) => state.setUser);
  const { toast } = useToast();
  const { mutate: login, isPending } = useMutation({
    mutationFn: (loginDetails: TLoginFormProps) => apiLogin(loginDetails),
    onSuccess: (userData: TUserDetails) => {
      toast({
        variant: "success",
        title: "Success",
        description: "Logged in successfully",
      });
      setUser(userData);
      queryClient.setQueryData(["user"], userData);
      handleNavigate("/dashboard");
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
