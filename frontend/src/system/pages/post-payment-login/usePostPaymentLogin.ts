import { ROUTES } from "@/config/appRoutes";
import { useToast } from "@/hooks/use-toast";
import useHandleNavigate from "@/hooks/useHandleNavigate";
import apiMakePostPaymentLogin from "@/system/services/auth/apiMakePostPaymentLogin";

import { useMutation } from "@tanstack/react-query";

function usePostPaymentLogin() {
  const handleNavigate = useHandleNavigate();
  const { toast } = useToast();
  const { mutate: makePostPaymentLogin, isPending } = useMutation({
    mutationFn: (token: string) => apiMakePostPaymentLogin(token),
    onSuccess: async (userData) => {
      console.log(userData);
      handleNavigate(ROUTES.DASHBOARD.MEMBER);
    },
    onError: (err) => {
      toast({
        variant: "error",
        title: err.name,
        description: err.message,
      });
      handleNavigate(ROUTES.LOGIN);
    },
  });
  return { makePostPaymentLogin, isPending };
}

export default usePostPaymentLogin;
