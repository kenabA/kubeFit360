import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TEditNoticeFormProps } from "./types";
import apiEditNotice from "@/system/services/notices/apiEditNotice";

function useEditNotice() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const {
    mutate: editNotice,
    isPending,
    isSuccess,
    error,
  } = useMutation({
    mutationFn: ({
      editNoticeDetails,
      selectedId,
    }: {
      editNoticeDetails: TEditNoticeFormProps;
      selectedId: string;
    }) => apiEditNotice(editNoticeDetails, selectedId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["notices"],
      });
      toast({
        variant: "success",
        title: "Success",
        description: "Notice edited successfully",
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
  return { editNotice, isPending, isSuccess, error };
}

export default useEditNotice;
