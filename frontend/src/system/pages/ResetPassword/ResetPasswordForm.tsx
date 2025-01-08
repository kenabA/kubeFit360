import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components";
import FloatingInput from "@/system/components/input/AuthInput";
import { TResetPasswordFormProps } from "./types";
import { resetPasswordSchema } from "./validator";

export function ResetPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TResetPasswordFormProps>({
    resolver: zodResolver(resetPasswordSchema),
  });

  function onSubmit(data: TResetPasswordFormProps) {
    console.log(data);
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
      <Button type="submit" className="w-full py-3" variant={"primary"}>
        Reset Password
      </Button>
    </form>
  );
}
