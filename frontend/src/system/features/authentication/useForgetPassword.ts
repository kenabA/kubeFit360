import { useToast } from "@/hooks/use-toast";
import { TForgotPasswordFormProps } from "@/system/pages/ForgotPassword/types";
import apiForgotPassword from "@/system/services/apiForgotPassword";
import { useMutation } from "@tanstack/react-query";

function useForgotPassword() {
  const { toast } = useToast();
  const { mutate: forgotPassword, isPending } = useMutation({
    mutationFn: (forgotPasswordDetails: TForgotPasswordFormProps) =>
      apiForgotPassword(forgotPasswordDetails),
    onSuccess: () => {
      toast({
        variant: "success",
        title: "Success",
        description: "Reset link sent to your email.",
      });
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
  return { forgotPassword, isPending };
}

export default useForgotPassword;

// 1. Request ForgotPassword
// 2. Set the token in the local storage
// 3. Fetch the user profile
//   1. Get the token from the local storage
//   2. Set the token in the headers
//   3. Fetch the user again
// 4. Set the user in the global state
