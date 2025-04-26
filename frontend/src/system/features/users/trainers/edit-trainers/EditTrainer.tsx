import { Button } from "@/components";
import { FormModal } from "@/components/formModal/FormModal";
import { zodResolver } from "@hookform/resolvers/zod";

import { Controller, useForm } from "react-hook-form";

import BaseInput from "@/system/components/input/base-input/BaseInput";

import { useEffect, useState } from "react";

import { genderOptions, trainerStatusOptions } from "@/system/lib/data";

import { Oval } from "react-loader-spinner";
import BaseImageInput from "@/system/components/input/base-image-input/BaseImageInput";
import { handleFileChange, uploadImage } from "@/system/lib/helpers";
import FormSelect from "@/system/components/select/form-select/FormSelect";
import useEditUser from "../../useEditUser";
import { useSearchParams } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import { TUserDetails } from "@/system/stores/user/types";
import { TApiResponse } from "@/system/lib/types";
import { ThemedDialog } from "@/components/dialog/Dialog";
import { TEditTrainerFormProps, TEditTrainerProps } from "./type";
import { trainerSchema } from "./validator";

export default function EditTrainer({
  selectedId,
  isDialogOpen,
  setIsDialogOpen,
}: TEditTrainerProps) {
  const [localImage, setLocalImage] = useState<File | string | undefined>();
  const [isPending, setIsPending] = useState<boolean>(false);
  const [searchParams] = useSearchParams();
  const filters = Object.fromEntries(searchParams.entries());
  const queryClient = useQueryClient();
  const [openDelete, setOpenDelete] = useState<boolean>(false);

  const allTrainers = queryClient.getQueryData<TApiResponse<TUserDetails[]>>([
    "trainers",
    filters,
  ]);

  const trainer = allTrainers?.data.data?.find((e) => e._id === selectedId);

  const { editUser, isSuccess, error } = useEditUser("trainers");

  const {
    register,
    setValue,
    control,
    reset,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<TEditTrainerFormProps>({
    resolver: zodResolver(trainerSchema),
  });

  useEffect(() => {
    if (isSuccess) {
      setIsPending(false);
      setIsDialogOpen(false);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (!trainer) return;
    reset({
      name: trainer?.name,
      address: trainer?.address,
      birthDate: trainer?.birthDate.slice(0, 10),
      email: trainer?.email,

      gender: trainer?.gender,
      userImage: trainer?.userImage,
      status: trainer?.status,
      phoneNumber: String(trainer?.phoneNumber),
    });

    if (trainer.userImage) {
      setLocalImage(trainer.userImage);
    } else {
      setLocalImage(undefined);
    }
  }, [reset, trainer]);

  useEffect(() => {
    if (error) {
      setIsPending(false);
    }
  }, [error]);

  async function onSubmit(data: TEditTrainerFormProps) {
    setIsPending(true);
    if (localImage) {
      // TODO : Replace the current image with the new one
      const trainerImageUrl = await uploadImage(localImage as File);
      setValue("userImage", trainerImageUrl, { shouldDirty: true });
      data = { ...data, userImage: trainerImageUrl };
    }
    await editUser({ editUserDetails: data, selectedId });
  }

  const handleLocalFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    handleFileChange<TEditTrainerFormProps>(
      "userImage",
      event,
      setLocalImage,
      setValue
    );
  };

  function handleCancel() {
    setIsDialogOpen(false);
    setLocalImage(trainer?.userImage);
    reset();
  }

  function handleRemove() {
    if (typeof localImage !== "string") {
      setLocalImage(trainer?.userImage);
      setValue("userImage", trainer?.userImage, {
        shouldDirty: true,
      });
    } else {
      // TODO : Handle Remove of the trainer
      setOpenDelete(true);
    }
  }

  async function handleRemoveProfilePicture() {
    if (!trainer) return;
    await editUser({
      editUserDetails: { removeImage: true } as TEditTrainerFormProps,
      selectedId: selectedId,
    });
    setOpenDelete(false);
    setIsDialogOpen(false);
    setValue("userImage", undefined, { shouldDirty: true });
  }

  return (
    <FormModal
      icon="mdi:teach-poll"
      title="Edit Trainer"
      subtitle="Modify and Update Trainer Details"
      open={isDialogOpen}
      setOpen={setIsDialogOpen}
      footer={
        <>
          <Button
            disabled={isPending}
            className="shadow-none hover:shadow-none"
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
            disabled={isPending || !isDirty}
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
              "Save"
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
            placeholder="Enter date of birth"
            register={register}
            type="date"
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
        <div className="w-full">
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <FormSelect
                error={errors.status}
                label={field.name}
                field={field}
                options={trainerStatusOptions}
                placeholder="Select a status"
              />
            )}
          />
        </div>
        <BaseImageInput
          handleFileChange={handleLocalFileChange}
          handleRemove={handleRemove}
          localImage={localImage}
          setLocalImage={setLocalImage}
          error={errors.userImage}
          label="Trainer's Image"
          name="userImage"
          type="file"
        />
      </form>
      <ThemedDialog
        isPending={false}
        dialogOpen={openDelete}
        setDialogOpen={setOpenDelete}
        mutationFn={handleRemoveProfilePicture}
        theme="destructive"
        ctaText="Remove"
        title="Remove Photo"
        message="Do you really want to remove the current photo?"
      />
    </FormModal>
  );
}
