import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { TEditMaintainerFormProps } from "./maintainers/edit-maintainers/type";
import apiEditUser from "@/system/services/users/apiEditUser";

function useEditUser(role: string) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const {
    mutate: editUser,
    isPending,
    isSuccess,
    error,
  } = useMutation({
    mutationFn: ({
      editUserDetails,
      selectedId,
    }: {
      editUserDetails: TEditMaintainerFormProps;
      selectedId: string;
    }) => apiEditUser(editUserDetails, selectedId),
    onSuccess: async (data) => {
      queryClient.invalidateQueries({});
      queryClient.setQueryData(["user"], data.data.data);
      localStorage.setItem("user", JSON.stringify(data.data.data));
      toast({
        variant: "success",
        title: "Success",
        description: `User's data edited successfully`,
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
  return { editUser, isPending, isSuccess, error };
}

export default useEditUser;
