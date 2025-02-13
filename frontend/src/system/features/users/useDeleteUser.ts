import { useToast } from "@/hooks/use-toast";
import { capitalize } from "@/lib/utils";
import apiDeleteUser from "@/system/services/users/apiDeleteUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useDeleteUser({ role }: { role: string }) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const {
    mutate: deleteUser,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: (userId: string) => apiDeleteUser(userId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [role],
      });
      toast({
        variant: "success",
        title: "Success",
        description: `${capitalize(role)} deleted successfully`,
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
  return { deleteUser, isPending, isSuccess };
}

export default useDeleteUser;
