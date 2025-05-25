// SEGGRAGATE THIS IN TO EDIT ME CUSTOM HOOK

import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import apiEditUser from "@/system/services/users/apiEditUser";

// CHECK THIS WHEN YOU GET HOME
function useEditUser<T>(isEditingCurrentUser?: boolean) {
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
      editUserDetails: T;
      selectedId: string;
    }) => apiEditUser<T>(editUserDetails, selectedId),
    onSuccess: async (data) => {
      queryClient.invalidateQueries({});
      // TAKE THIS IN EDIT ME CUSTOM HOOK AND SET THE QUERY DATA OF THE RESPECTIVE USER HERE!
      if (isEditingCurrentUser) {
        queryClient.setQueryData(["user"], data.data.data);
        localStorage.setItem("user", JSON.stringify(data.data.data));
      }

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
