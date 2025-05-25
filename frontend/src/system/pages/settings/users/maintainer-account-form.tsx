import { Button } from "@/components";
import BaseImageInput from "@/system/components/input/base-image-input/BaseImageInput";
import BaseInput from "@/system/components/input/base-input/BaseInput";
import { motion } from "framer-motion";
import FormSelect from "@/system/components/select/form-select/FormSelect";

import useGetCurrentUser from "@/system/features/users/useGetCurrentUser";
import { genderOptions, maintainerStatusOptions } from "@/system/lib/data";

import { zodResolver } from "@hookform/resolvers/zod";

import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { containerVariants, formatTime } from "@/lib/utils";
import useEditUser from "@/system/features/users/useEditUser";
import { handleFileChange, uploadImage } from "@/system/lib/helpers";
import { Oval } from "react-loader-spinner";
import { TEditMaintainerFormProps } from "@/system/features/users/maintainers/edit-maintainers/type";
import { ThemedDialog } from "@/components/dialog/Dialog";
import { maintainerSchema } from "@/system/features/users/maintainers/edit-maintainers/validator";

export default function MaintainerAccountForm() {
  const {
    register,
    control,
    reset,
    setValue,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm<TEditMaintainerFormProps>({
    resolver: zodResolver(maintainerSchema),
  });

  const [openDelete, setOpenDelete] = useState<boolean>(false);

  const { editUser } = useEditUser<TEditMaintainerFormProps>(true);

  const [isPending, setIsPending] = useState<boolean>(false);

  const [localImage, setLocalImage] = useState<File | string | undefined>();

  const { data } = useGetCurrentUser();

  const isFormEdited = Object.keys(dirtyFields).length > 0;

  function handleReset() {
    if (!data) return;
    reset({
      _id: data?._id,
      name: data?.name,
      address: data?.address,
      birthDate: data?.birthDate.slice(0, 10),
      email: data?.email,
      gender: data?.gender,
      status: data.status,
      userImage: data?.userImage,
      phoneNumber: String(data?.phoneNumber),
      createdAt: formatTime(data?.createdAt, "MMM dd, yyyy"),
    });
    if (typeof localImage !== "string") {
      setLocalImage(data?.userImage);
      setValue("userImage", data?.userImage, {
        shouldDirty: true,
      });
    }
  }

  useEffect(() => {
    if (!data) return;
    reset({
      _id: data?._id,
      name: data?.name,
      address: data?.address,
      birthDate: data?.birthDate.slice(0, 10),
      email: data?.email,
      gender: data?.gender,
      status: data?.status,
      userImage: data?.userImage,
      phoneNumber: String(data?.phoneNumber),
      createdAt: formatTime(data.createdAt, "MMM dd, yyyy"),
    });

    if (data.userImage) {
      setLocalImage(data.userImage);
    } else {
      setLocalImage(undefined);
    }
  }, [reset, data]);

  async function onSubmit(data: TEditMaintainerFormProps) {
    setIsPending(true);
    if (localImage) {
      //   // TODO : Replace the current image with the new one
      const userImageUrl = await uploadImage(localImage as File);
      setValue("userImage", userImageUrl, { shouldDirty: true });
      data = { ...data, userImage: userImageUrl };
    }
    if (data?._id) {
      await editUser({ editUserDetails: data, selectedId: data?._id });
      reset();
      setIsPending(false);
      return;
    }
    return;
  }

  async function handleRemoveProfilePicture() {
    if (!data) return;
    await editUser({
      editUserDetails: { removeImage: true } as TEditMaintainerFormProps,
      selectedId: data?._id,
    });
    setOpenDelete(false);
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

  function handleRemove() {
    if (typeof localImage !== "string") {
      setLocalImage(data?.userImage);
      setValue("userImage", data?.userImage, {
        shouldDirty: true,
      });
    } else {
      // TODO : Handle Remove of the maintainer
      setOpenDelete(true);
    }
  }

  console.log(errors);

  return (
    <div className="grid grid-cols-2 gap-6">
      <div className="col-span-full">
        <BaseImageInput
          isSettings={true}
          handleFileChange={handleLocalFileChange}
          handleRemove={handleRemove}
          localImage={localImage}
          setLocalImage={setLocalImage}
          error={errors.userImage}
          label="Maintainer's Image"
          name="userImage"
          type="file"
        />
      </div>
      <BaseInput
        error={errors._id}
        label="Maintainer ID"
        disabled={true}
        name="_id"
        type="text"
        placeholder="Maintainer's ID"
        register={register}
      />
      <BaseInput
        error={errors.name}
        label="Name"
        name="name"
        type="text"
        placeholder="Enter the full name"
        register={register}
      />

      <BaseInput
        error={errors.email}
        label="Email"
        disabled={true}
        name="email"
        type="text"
        placeholder="Maintainer's Email"
        register={register}
      />

      <BaseInput
        error={errors.address}
        label="Address"
        name="address"
        type="text"
        placeholder="Enter the full name"
        register={register}
      />
      <BaseInput
        error={errors.phoneNumber}
        label="Phone Number"
        name="phoneNumber"
        type="phone"
        placeholder="Enter the phone number"
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

      <BaseInput
        allowPastDate={true}
        allowFuture={false}
        error={errors.birthDate}
        label="Date of Birth"
        name="birthDate"
        placeholder="Enter date of birth"
        register={register}
        type="date"
      />

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

      <BaseInput
        error={errors.createdAt}
        label="Joined Date"
        name="createdAt"
        type="text"
        disabled={true}
        placeholder=""
        register={register}
      />

      {isFormEdited && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="col-span-full mt-auto flex items-center justify-end gap-3 lg:sticky lg:-bottom-3 bg-white border p-3 shadow-card rounded-lg"
        >
          <Button
            disabled={isPending}
            className="shadow-none hover:shadow-none mb-0"
            variant={"primaryReverse"}
            onClick={handleReset}
          >
            Reset
          </Button>
          <Button
            form="maintainer-form"
            type="submit"
            onClick={handleSubmit(onSubmit)}
            className=" shadow-none hover:shadow-none h-10 w-36 mb-0"
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
              "Save Changes"
            )}
          </Button>
        </motion.div>
      )}
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
    </div>
  );
}
