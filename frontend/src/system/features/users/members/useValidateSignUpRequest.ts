import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { TClientStatus } from "../../authentication/useGetSignUpRequests";
import apiValidateSignUpRequest from "@/system/services/users/members/apiValidateSignUpRequest";

function useValidateSIgnUpRequest() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const {
    mutate: validateSignUpRequest,
    isPending,
    isSuccess,
    error,
  } = useMutation({
    mutationFn: ({
      data,
      selectedId,
    }: {
      data: TClientStatus;
      selectedId: string;
    }) => apiValidateSignUpRequest(data, selectedId),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: ["signupRequests"],
      });

      toast({
        variant: "success",
        title: "Success",
        description: data.message,
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
  return { validateSignUpRequest, isPending, isSuccess, error };
}

export default useValidateSIgnUpRequest;
