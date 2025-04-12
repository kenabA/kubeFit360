import { Button } from "@/components";
import BaseImageInput from "@/system/components/input/base-image-input/BaseImageInput";
import BaseInput from "@/system/components/input/base-input/BaseInput";
import { AnimatePresence, motion } from "framer-motion";
import FormSelect from "@/system/components/select/form-select/FormSelect";

import { trainerSchema } from "@/system/features/users/trainers/edit-trainers/validator";
import useGetCurrentUser from "@/system/features/users/useGetCurrentUser";
import { genderOptions, trainerStatusOptions } from "@/system/lib/data";

import { zodResolver } from "@hookform/resolvers/zod";

import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { TEditTrainerFormProps } from "@/system/features/users/trainers/edit-trainers/type";
import { formatTime } from "@/lib/utils";
import { handleFileChange, uploadImage } from "@/system/lib/helpers";
import useEditUser from "@/system/features/users/useEditUser";
import { Oval } from "react-loader-spinner";

const containerVariants = {
  hidden: { opacity: 0 },

  visible: {
    opacity: 1,

    transition: {
      duration: 0.3,
      staggerChildren: 0.1,
    },
  },
};

export default function AccountDetailsForm() {
  const {
    register,
    getValues,
    control,
    reset,
    setValue,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm<TEditTrainerFormProps>({
    resolver: zodResolver(trainerSchema),
  });

  const { editUser, isSuccess, error } = useEditUser("trainer");

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
      role: data?.role,
      status: data.status,
      userImage: data?.userImage,
      phoneNumber: String(data?.phoneNumber),
      createdAt: formatTime(data?.createdAt, "MMM dd, yyyy"),
    });
    handleRemove();
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
      role: data?.role,
      status: data.status,
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

  async function onSubmit(data: TEditTrainerFormProps) {
    setIsPending(true);
    if (localImage) {
      //   // TODO : Replace the current image with the new one
      const maintainerImageUrl = await uploadImage(localImage as File);
      setValue("userImage", maintainerImageUrl, { shouldDirty: true });
      data = { ...data, userImage: maintainerImageUrl };
    }
    await editUser({ editMaintainerDetails: data, selectedId: data?._id });
    reset();
    setIsPending(false);
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

  function handleRemove() {
    if (typeof localImage !== "string") {
      setLocalImage(data?.userImage);
      setValue("userImage", data?.userImage, {
        shouldDirty: true,
      });
    } else {
      // TODO : Handle Remove of the maintainer
      alert(123);
    }
  }

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
          label="Trainer's Image"
          name="userImage"
          type="file"
        />
      </div>
      <BaseInput
        error={errors._id}
        label="Trainer ID"
        disabled={true}
        name="_id"
        type="text"
        placeholder="Trainer's ID"
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
        placeholder="Trainer's Email"
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
              options={trainerStatusOptions}
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
          className="col-span-full flex items-center justify-end gap-3"
        >
          <Button
            disabled={isPending}
            className="shadow-none hover:shadow-none"
            variant={"primaryReverse"}
            onClick={handleReset}
          >
            Reset
          </Button>
          <Button
            form="maintainer-form"
            type="submit"
            onClick={handleSubmit(onSubmit)}
            className="px-6 shadow-none hover:shadow-none h-10 w-36"
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
    </div>
  );
}
