import { useToast } from "@/hooks/use-toast";
import apiExtendClientMembership from "@/system/services/users/members/apiExtendClientMembership";
import { useMutation } from "@tanstack/react-query";

function useExtendClientMembership() {
  const { toast } = useToast();
  const {
    mutate: extendMembership,
    isPending,
    isSuccess,
    error,
  } = useMutation({
    mutationFn: ({
      membershipType,
      selectedId,
    }: {
      membershipType: string;
      selectedId: string;
    }) => apiExtendClientMembership(membershipType, selectedId),
    onSuccess: async (data) => {
      toast({
        variant: "success",
        title: "Success",
        description: data.message,
      });
    },
    onError: (err) => {
      console.log(err.message);
      toast({
        variant: "warning",
        title: err.name,
        description: err.message,
      });
    },
  });
  return { extendMembership, isPending, isSuccess, error };
}

export default useExtendClientMembership;
