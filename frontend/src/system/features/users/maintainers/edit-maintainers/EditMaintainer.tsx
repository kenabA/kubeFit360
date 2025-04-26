import { Button } from "@/components";
import { FormModal } from "@/components/formModal/FormModal";
import { zodResolver } from "@hookform/resolvers/zod";

import { Controller, useForm } from "react-hook-form";

import BaseInput from "@/system/components/input/base-input/BaseInput";

import { useEffect, useState } from "react";

import { TEditMaintainerFormProps, TEditMaintainerProps } from "./type";

import { genderOptions, maintainerStatusOptions } from "@/system/lib/data";

import { Oval } from "react-loader-spinner";
import BaseImageInput from "@/system/components/input/base-image-input/BaseImageInput";
import { handleFileChange, uploadImage } from "@/system/lib/helpers";
import FormSelect from "@/system/components/select/form-select/FormSelect";
import useEditUser from "../../useEditUser";
import { maintainerSchema } from "./validator";
import { useSearchParams } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import { TUserDetails } from "@/system/stores/user/types";
import { TApiResponse } from "@/system/lib/types";
import { ThemedDialog } from "@/components/dialog/Dialog";

export default function EditMaintainer({
  selectedId,
  isDialogOpen,
  setIsDialogOpen,
}: TEditMaintainerProps) {
  const [localImage, setLocalImage] = useState<File | string | undefined>();
  const [isPending, setIsPending] = useState<boolean>(false);
  const [searchParams] = useSearchParams();
  const filters = Object.fromEntries(searchParams.entries());
  const queryClient = useQueryClient();
  const [openDelete, setOpenDelete] = useState<boolean>(false);

  const allMaintainers = queryClient.getQueryData<TApiResponse<TUserDetails[]>>(
    ["maintainers", filters]
  );

  const maintainer = allMaintainers?.data.data?.find(
    (e) => e._id === selectedId
  );

  const { editUser, isSuccess, error } = useEditUser("maintainers");

  const {
    register,
    setValue,
    control,
    reset,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<TEditMaintainerFormProps>({
    resolver: zodResolver(maintainerSchema),
  });

  useEffect(() => {
    if (isSuccess) {
      setIsPending(false);
      setIsDialogOpen(false);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (!maintainer) return;
    reset({
      name: maintainer?.name,
      address: maintainer?.address,
      birthDate: maintainer?.birthDate.slice(0, 10),
      email: maintainer?.email,

      gender: maintainer?.gender,
      userImage: maintainer?.userImage,
      status: maintainer?.status,
      phoneNumber: String(maintainer?.phoneNumber),
    });

    if (maintainer.userImage) {
      setLocalImage(maintainer.userImage);
    } else {
      setLocalImage(undefined);
    }
  }, [reset, maintainer]);

  useEffect(() => {
    if (error) {
      setIsPending(false);
    }
  }, [error]);

  async function onSubmit(data: TEditMaintainerFormProps) {
    setIsPending(true);
    if (localImage) {
      // TODO : Replace the current image with the new one
      const maintainerImageUrl = await uploadImage(localImage as File);
      setValue("userImage", maintainerImageUrl, { shouldDirty: true });
      data = { ...data, userImage: maintainerImageUrl };
    }
    await editUser({ editUserDetails: data, selectedId });
  }

  const handleLocalFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    handleFileChange<TEditMaintainerFormProps>(
      "userImage",
      event,
      setLocalImage,
      setValue
    );
  };

  function handleCancel() {
    setIsDialogOpen(false);
    setLocalImage(maintainer?.userImage);
    reset();
  }

  function handleRemove() {
    if (typeof localImage !== "string") {
      setLocalImage(maintainer?.userImage);
      setValue("userImage", maintainer?.userImage, {
        shouldDirty: true,
      });
    } else {
      // TODO : Handle Remove of the maintainer
      setOpenDelete(true);
    }
  }

  async function handleRemoveProfilePicture() {
    if (!maintainer) return;
    await editUser({
      editUserDetails: { removeImage: true } as TEditMaintainerFormProps,
      selectedId: selectedId,
    });
    setOpenDelete(false);
    setIsDialogOpen(false);
    setValue("userImage", undefined, { shouldDirty: true });
  }

  return (
    <FormModal
      icon="gravity-ui:person-worker"
      title="Edit Maintainer"
      subtitle="Modify and Update Maintainer Details"
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
            form="maintainer-form"
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
        id="maintainer-form"
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
                options={maintainerStatusOptions}
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
          label="Maintainer's Image"
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
