import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components";
import FloatingInput from "@/system/components/input/AuthInput";
import { TResetPasswordFormProps } from "./types";
import { resetPasswordSchema } from "./validator";
import useResetPassword from "@/system/features/authentication/useResetPassword";
import { Oval } from "react-loader-spinner";

export function ResetPasswordForm() {
  const { isPending, resetPassword } = useResetPassword();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TResetPasswordFormProps>({
    resolver: zodResolver(resetPasswordSchema),
  });

  function onSubmit(data: TResetPasswordFormProps) {
    resetPassword(data);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col items-center gap-8 max-w-[480px]"
    >
      <FloatingInput<TResetPasswordFormProps>
        register={register}
        name="password"
        label="New Password"
        type="password"
        error={errors.password}
      />
      <FloatingInput<TResetPasswordFormProps>
        register={register}
        name="passwordConfirm"
        label="Confirm Password"
        type="password"
        error={errors.passwordConfirm}
      />
      <Button type="submit" className="w-full h-11 md:h-12" variant={"primary"}>
        {isPending ? (
          <Oval
            height="280"
            strokeWidth={8}
            secondaryColor="white"
            width="280"
            color="white"
            wrapperStyle={{}}
          />
        ) : (
          "reset password"
        )}
      </Button>
    </form>
  );
}
