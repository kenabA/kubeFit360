import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components";
import FloatingInput from "@/system/components/input/AuthInput";
import { TForgotPasswordFormProps } from "./types";
import { forgotPasswordSchema } from "./validator";

export function ForgotPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TForgotPasswordFormProps>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  function onSubmit(data: TForgotPasswordFormProps) {
    console.log(data);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col items-center gap-8 max-w-[480px]"
    >
      <FloatingInput<TForgotPasswordFormProps>
        register={register}
        name="email"
        label="Email"
        type="email"
        error={errors.email}
      />
      <Button type="submit" className="w-full py-3" variant={"primary"}>
        Send Link
      </Button>
    </form>
  );
}
