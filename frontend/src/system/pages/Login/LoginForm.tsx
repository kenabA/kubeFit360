import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components";
import FloatingInput from "@/system/components/input/AuthInput";
import { Link } from "react-router";
import { TLoginFormProps } from "./types";
import { loginSchema } from "./validator";
import { useToast } from "@/hooks/use-toast";

export function LoginForm() {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginFormProps>({ resolver: zodResolver(loginSchema) });

  function onSubmit(data: TLoginFormProps) {
    console.log(data);
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
        onClick={() =>
          toast({
            variant: "success",
            title: "Successfull",
            description: "Backend not integrated yet.",
          })
        }
        type="submit"
        className="w-full py-3"
        variant={"primary"}
      >
        login
      </Button>
    </form>
  );
}
