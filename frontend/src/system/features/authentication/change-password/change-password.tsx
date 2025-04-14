import { FormModal } from "@/components/formModal/FormModal";
import FloatingInput from "@/system/components/input/auth-input/AuthInput";
import { TChangePasswordFormProps, TChangePasswordProps } from "./types";
import { Button } from "@/components";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { changePasswordSchema } from "./validator";

export default function ChangePasswordModal({
  isDialogOpen,
  setIsDialogOpen,
}: TChangePasswordProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TChangePasswordFormProps>({
    resolver: zodResolver(changePasswordSchema),
  });

  function onSubmit(data: TChangePasswordFormProps) {
    console.log(data);
  }

  function handleCancel() {
    setIsDialogOpen(false);
    reset();
  }

  return (
    <FormModal
      icon={"mdi:password-outline"}
      title="Change Password | Check for api"
      subtitle="Fill in the fields to change your password"
      open={isDialogOpen}
      setOpen={setIsDialogOpen}
      footer={
        <>
          <Button
            // disabled={isPending}
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
            // disabled={isPending}
          >
            {/* {isPending ? (
              <Oval
                height="280"
                strokeWidth={8}
                secondaryColor="white"
                width="280"
                color="white"
                wrapperStyle={{}}
              />
            ) : (
              "Add"
            )} */}
            Change Password
          </Button>
        </>
      }
    >
      <form
        id="change-password-form"
        className="w-full flex flex-col items-center gap-6"
      >
        <FloatingInput<TChangePasswordFormProps>
          register={register}
          name="oldPassword"
          label="Old Password"
          type="password"
          error={errors.oldPassword}
        />
        <FloatingInput<TChangePasswordFormProps>
          register={register}
          name="newPassword"
          label="New Password"
          type="password"
          error={errors.newPassword}
        />
        <FloatingInput<TChangePasswordFormProps>
          register={register}
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          error={errors.confirmPassword}
        />
      </form>
    </FormModal>
  );
}
