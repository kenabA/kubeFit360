import { FormModal } from "@/components/formModal/FormModal";
import FloatingInput from "@/system/components/input/auth-input/AuthInput";

import { Button } from "@/components";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Oval } from "react-loader-spinner";
import { TSetPasswordFormProps } from "./types";
import { setPasswordSchema } from "./validator";
import useSetPassword from "./useSetPassword";

export default function SetPasswordModal() {
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<TSetPasswordFormProps>({
    resolver: zodResolver(setPasswordSchema),
  });

  const { setPassword, isPending } = useSetPassword();

  function onSubmit(data: TSetPasswordFormProps) {
    console.log(data);
    setPassword({ passwordDetails: data });
  }

  return (
    <FormModal
      variation="center"
      stuck={true}
      icon={"mdi:password-outline"}
      title="Create New Password"
      subtitle="Enter your new password below to setup your account."
      open={true}
      setOpen={() => null}
      className="gap-3"
      footer={
        <Button
          form="change-password-form"
          type="submit"
          onClick={handleSubmit(onSubmit)}
          className="px-6 shadow-none hover:shadow-none h-10 font-medium w-full"
          variant={"primary"}
          disabled={isPending}
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
            "Change Password"
          )}
        </Button>
      }
    >
      <form
        id="change-password-form"
        className="w-full flex flex-col items-center gap-6"
      >
        <FloatingInput<TSetPasswordFormProps>
          className="h-[48px] "
          register={register}
          name="password"
          label="New Password"
          type="password"
          error={errors.password}
        />
        <FloatingInput<TSetPasswordFormProps>
          register={register}
          className="h-[48px]"
          name="passwordConfirm"
          label="Confirm Password"
          type="password"
          error={errors.passwordConfirm}
        />
      </form>
    </FormModal>
  );
}
