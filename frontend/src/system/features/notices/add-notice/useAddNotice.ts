import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { TAddNoticeFormProps } from "./types";
import apiAddNotice from "@/system/services/notices/apiAddNotice";

function useAddNotice() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const {
    mutate: addNotice,
    isPending,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: (addNoticeDetails: TAddNoticeFormProps) =>
      apiAddNotice(addNoticeDetails),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["notices"],
      });
      toast({
        variant: "success",
        title: "Success",
        description: "Notice added successfully",
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
  return { addNotice, isPending, isSuccess, error };
}

export default useAddNotice;
