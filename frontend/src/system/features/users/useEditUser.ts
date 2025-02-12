import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { TEditMaintainerFormProps } from "./maintainers/edit-maintainers/type";
import apiEditUser from "@/system/services/users/apiEditUser";

function useEditUser(role: string) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const {
    mutate: editMaintainer,
    isPending,
    isSuccess,
    error,
  } = useMutation({
    mutationFn: ({
      editMaintainerDetails,
      selectedId,
    }: {
      editMaintainerDetails: TEditMaintainerFormProps;
      selectedId: string;
    }) => apiEditUser(editMaintainerDetails, selectedId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [role],
      });
      toast({
        variant: "success",
        title: "Success",
        description: "Maintainer's data edited successfully",
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
  return { editMaintainer, isPending, isSuccess, error };
}

export default useEditUser;
