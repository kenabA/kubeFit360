import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";

import { TSignupFormProps } from "@/system/pages/SignUp/types";
import apiCreateSignUpRequest from "@/system/services/auth/apiSignUpRequest";

function useSignUpRequest() {
  const { toast } = useToast();
  const {
    mutate: createSignInRequest,
    isPending,
    isSuccess,
    error,
  } = useMutation({
    mutationFn: (data: TSignupFormProps) => apiCreateSignUpRequest(data),
    onSuccess: async () => {
      toast({
        variant: "success",
        title: "Request Submitted",
        description: "Check your email for further instructions.",
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
  return { createSignInRequest, isPending, isSuccess, error };
}

export default useSignUpRequest;
