import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components";
import FloatingInput from "@/system/components/input/AuthInput";
import { Link } from "react-router";
import { TLoginFormProps } from "./types";
import { loginSchema } from "./validator";
import useLogin from "@/system/features/authentication/useLogin";
import { Oval } from "react-loader-spinner";

export function LoginForm() {
  const { login, isPending } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginFormProps>({ resolver: zodResolver(loginSchema) });

  function onSubmit(data: TLoginFormProps) {
    login(data);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col items-center gap-8 max-w-[480px]"
    >
      <FloatingInput<TLoginFormProps>
        register={register}
        name="email"
        label="Email"
        type="email"
        error={errors.email}
      />
      <div className="w-full flex flex-col gap-4 items-center">
        <FloatingInput
          register={register}
          name="password"
          label="Password"
          type="password"
          error={errors.password}
        />
        <Link to={"/forgotPassword"} className="self-end text-sm text-primary">
          Forgot Password?
        </Link>
      </div>
      <Button
        type="submit"
        className="w-full h-11 md:h-12 py-3"
        variant={"primary"}
      >
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
          "login"
        )}
      </Button>
    </form>
  );
}
