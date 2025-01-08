import { TLoginFormProps } from "@/system/pages/Login/types";
import apiLogin from "@/system/services/apiLogin";
import { useMutation } from "@tanstack/react-query";

function useLogin() {
  const { mutate: login, isPending } = useMutation({
    mutationFn: (loginDetails: TLoginFormProps) => apiLogin(loginDetails),
    onSuccess: () => {
      console.log("yeii");
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
