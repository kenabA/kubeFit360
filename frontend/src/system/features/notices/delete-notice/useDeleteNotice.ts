import { useToast } from "@/hooks/use-toast";
import apiDeleteNotice from "@/system/services/notices/apiDeleteNotice";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useDeleteNotice() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const {
    mutate: deleteNotice,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: (noticeId: string) => apiDeleteNotice(noticeId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["notices"],
      });
      toast({
        variant: "success",
        title: "Success",
        description: "Notice deleted successfully",
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
  return { deleteNotice, isPending, isSuccess };
}

export default useDeleteNotice;
