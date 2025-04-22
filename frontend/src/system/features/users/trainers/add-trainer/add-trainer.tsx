import { Button } from "@/components";
import { FormModal } from "@/components/formModal/FormModal";
import { zodResolver } from "@hookform/resolvers/zod";

import { Controller, useForm } from "react-hook-form";

import BaseInput from "@/system/components/input/base-input/BaseInput";
import { useEffect, useState } from "react";

import { Oval } from "react-loader-spinner";
import BaseImageInput from "@/system/components/input/base-image-input/BaseImageInput";
import { handleFileChange, uploadImage } from "@/system/lib/helpers";

import { genderOptions } from "@/system/lib/data";
import FormSelect from "@/system/components/select/form-select/FormSelect";
import useAddUser from "../../useAddUser";
import { TAddTrainerFormProps, TAddTrainerProps } from "./type";
import { trainerSchema } from "./validator";

export default function AddTrainer({
  isDialogOpen,
  setIsDialogOpen,
}: TAddTrainerProps) {
  const [localImage, setLocalImage] = useState<File | string | undefined>();
  const [isPending, setIsPending] = useState<boolean>(false);
  const {
    register,
    control,
    reset,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TAddTrainerFormProps>({
    // TODO : The default password will be the role and after adding user, a mail should go stating that the default password is 'trainer' suggesting user to change it
    defaultValues: {
      role: "trainer",
      password: "asdasdasd",
      passwordConfirm: "asdasdasd",
    },
    resolver: zodResolver(trainerSchema),
  });

  const { isSuccess, addUser, error } = useAddUser("trainers");

  useEffect(() => {
    if (isSuccess) {
      setIsPending(false);
      setIsDialogOpen(false);
      setLocalImage(undefined);
      reset();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (error) {
      setIsPending(false);
    }
  }, [error]);

  async function onSubmit(data: TAddTrainerFormProps) {
    setIsPending(true);
    if (localImage) {
      const maintainerImageUrl = await uploadImage(localImage as File);
      setValue("userImage", maintainerImageUrl);
      data = { ...data, userImage: maintainerImageUrl };
    }
    addUser(data);
  }

  const handleLocalFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    handleFileChange<TAddTrainerFormProps>(
      "userImage",
      event,
      setLocalImage,
      setValue
    );
  };

  function handleCancel() {
    setIsDialogOpen(false);
    setLocalImage(undefined);
    reset();
  }

  return (
    <FormModal
      icon="mdi:teach-poll"
      title="Add Trainer"
      subtitle="Fill in the form to add a trainer"
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
            form="trainer-form"
            type="submit"
            onClick={handleSubmit(onSubmit)}
            className="px-6 shadow-none hover:shadow-none h-10 w-20"
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
              "Add"
            )}
          </Button>
        </>
      }
    >
      <form
        id="trainer-form"
        className="w-full flex flex-col items-center gap-4"
      >
        <div className="flex gap-4 items-start w-full">
          <BaseInput
            error={errors.name}
            label="Full Name"
            name="name"
            type="text"
            placeholder="Enter the full name"
            register={register}
          />
          <BaseInput
            error={errors.email}
            label="Email"
            name="email"
            type="email"
            placeholder="Enter the email"
            register={register}
          />
        </div>
        <div className="flex gap-4 items-start w-full">
          <BaseInput
            error={errors.phoneNumber}
            label="Phone Number"
            name="phoneNumber"
            type="phone"
            placeholder="Enter the phone number"
            register={register}
          />
          <BaseInput
            error={errors.birthDate}
            label="Date of Birth"
            name="birthDate"
            type="date"
            placeholder="Enter date of birth"
            register={register}
          />
        </div>
        <div className="flex gap-4 items-start w-full">
          <BaseInput
            error={errors.address}
            label="Address"
            name="address"
            type="text"
            placeholder="Enter the address"
            register={register}
          />
          <div className="w-full">
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <FormSelect
                  error={errors.gender}
                  placeholder="Select a gender"
                  label={field.name}
                  field={field}
                  options={genderOptions}
                />
              )}
            />
          </div>
        </div>
        <BaseImageInput
          handleFileChange={handleLocalFileChange}
          handleRemove={() => setLocalImage(undefined)}
          localImage={localImage}
          setLocalImage={setLocalImage}
          error={errors.userImage}
          label="Trainer's Image"
          name="userImage"
          type="file"
        />
      </form>
    </FormModal>
  );
}
