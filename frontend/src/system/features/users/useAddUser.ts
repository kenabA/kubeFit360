import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { TAddMaintainerFormProps } from "./maintainers/add-maintainers/type";
import apiAddUser from "@/system/services/users/apiAddUser";

function useAddUser(role: string) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const {
    mutate: addUser,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: (addUserDetails: TAddMaintainerFormProps) =>
      apiAddUser(addUserDetails),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [role],
      });
      toast({
        variant: "success",
        title: "Success",
        description: `${role.toLocaleUpperCase()} added successfully"`,
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
  return { addUser, isPending, isSuccess };
}

export default useAddUser;
