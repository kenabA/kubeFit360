import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiPaymentStatus from "./apiPaymentStatus";
import apiGetCurrentUser from "@/system/services/users/apiGetCurrentUser";
import useSignIn from "react-auth-kit/hooks/useSignIn";

function useEsewaPaymentStatus() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const signIn = useSignIn();
  const {
    mutate: verifyPaymentStatus,
    isSuccess,
    isPending,
  } = useMutation({
    mutationFn: (id: string) => {
      return apiPaymentStatus(id);
    },
    onSuccess: async (paymentResponse) => {
      const token = paymentResponse.data.token;
      const data = await apiGetCurrentUser();
      if (
        signIn({
          auth: { token: token, type: "Bearer" },
          userState: data,
        })
      ) {
        localStorage.setItem("user", JSON.stringify(data));
        queryClient.setQueryData(["user"], data);
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
  return { verifyPaymentStatus, isSuccess, isPending };
}

export default useEsewaPaymentStatus;
