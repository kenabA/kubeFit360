import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components";
import FloatingInput from "@/system/components/input/AuthInput";
import { TForgotPasswordFormProps } from "./types";
import { forgotPasswordSchema } from "./validator";
import useForgotPassword from "@/system/features/authentication/useForgetPassword";
import { Oval } from "react-loader-spinner";

export function ForgotPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TForgotPasswordFormProps>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const { forgotPassword, isPending } = useForgotPassword();

  function onSubmit(data: TForgotPasswordFormProps) {
    forgotPassword(data);
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
          "send link"
        )}
      </Button>
    </form>
  );
}
