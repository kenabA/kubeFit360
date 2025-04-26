import { FormModal } from "@/components/formModal/FormModal";
import FloatingInput from "@/system/components/input/auth-input/AuthInput";
import { TChangePasswordFormProps, TChangePasswordProps } from "./types";
import { Button } from "@/components";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { changePasswordSchema } from "./validator";
import useChangePassword from "./useChangePassword";
import { Oval } from "react-loader-spinner";

export default function ChangePasswordModal({
  isDialogOpen,
  setIsDialogOpen,
  userId,
}: TChangePasswordProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TChangePasswordFormProps>({
    resolver: zodResolver(changePasswordSchema),
  });

  const { changePassword, isPending } = useChangePassword();

  function onSubmit(data: TChangePasswordFormProps) {
    changePassword({ passwordDetails: data, selectedId: userId });
  }

  function handleCancel() {
    setIsDialogOpen(false);
    reset();
  }

  return (
    <FormModal
      icon={"mdi:password-outline"}
      title="Change Password"
      subtitle="Fill in the fields to change your password"
      open={isDialogOpen}
      setOpen={setIsDialogOpen}
      footer={
        <>
          <Button
            disabled={isPending}
            className="shadow-none hover:shadow-none h-10"
            variant={"primaryReverse"}
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            form="change-password-form"
            type="submit"
            onClick={handleSubmit(onSubmit)}
            className="px-6 shadow-none hover:shadow-none h-10 w-44"
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
        </>
      }
    >
      <form
        id="change-password-form"
        className="w-full flex flex-col items-center gap-4"
      >
        <FloatingInput<TChangePasswordFormProps>
          register={register}
          name="passwordCurrent"
          label="Old Password"
          type="password"
          error={errors.passwordCurrent}
        />
        <FloatingInput<TChangePasswordFormProps>
          register={register}
          name="password"
          label="New Password"
          type="password"
          error={errors.password}
        />
        <FloatingInput<TChangePasswordFormProps>
          register={register}
          name="passwordConfirm"
          label="Confirm Password"
          type="password"
          error={errors.passwordConfirm}
        />
      </form>
    </FormModal>
  );
}
