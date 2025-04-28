import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import apiPaymentStatus from "./apiPaymentStatus";

function useEsewaPaymentStatus() {
  const { toast } = useToast();
  const {
    mutate: verifyPaymentStatus,
    isSuccess,
    isPending,
  } = useMutation({
    mutationFn: (id: string) => {
      return apiPaymentStatus(id);
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
