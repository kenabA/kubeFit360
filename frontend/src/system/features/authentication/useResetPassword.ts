import { useToast } from "@/hooks/use-toast";
import useHandleNavigate from "@/hooks/useHandleNavigate";

import { TResetPasswordFormProps } from "@/system/pages/reset-password/types";
import apiResetPassword from "@/system/services/auth/apiResetPassword";

import { useMutation } from "@tanstack/react-query";
import { useParams } from "react-router";

function useResetPassword() {
  const handleNavigate = useHandleNavigate();
  const { token } = useParams();
  const { toast } = useToast();
  const { mutate: resetPassword, isPending } = useMutation({
    mutationFn: (resetPasswordDetails: TResetPasswordFormProps) =>
      apiResetPassword(resetPasswordDetails, token),
    onSuccess: () => {
      toast({
        variant: "success",
        title: "Success",
        description: "Passwords have been reset.",
      });
      handleNavigate("/passwordChanged");
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
  return { resetPassword, isPending };
}

export default useResetPassword;
