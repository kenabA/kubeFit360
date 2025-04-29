import { Button } from "@/components";
import { Heading } from "@/components/heading/Heading";
import BaseImageInput from "@/system/components/input/base-image-input/BaseImageInput";
import BaseInput from "@/system/components/input/base-input/BaseInput";
import { motion } from "framer-motion";

import useEditUser from "@/system/features/users/useEditUser";
import useGetCurrentUser from "@/system/features/users/useGetCurrentUser";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react/dist/iconify.js";

import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { handleFileChange, uploadImage } from "@/system/lib/helpers";
import { ThemedDialog } from "@/components/dialog/Dialog";
import { Oval } from "react-loader-spinner";
import { containerVariants, formatTime } from "@/lib/utils";
import { TEditMemberFormProps } from "@/system/features/users/members/edit-members/type";
import { memberSchema } from "@/system/features/users/members/edit-members/validator";
import FormSelect from "@/system/components/select/form-select/FormSelect";
import { genderOptions } from "@/system/lib/data";
import { TAccountFormProps } from "./types";

export default function MemberAccountForm({
  setOpenChangePasswordModal,
}: TAccountFormProps) {
  const {
    register,
    control,
    reset,
    setValue,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm<TEditMemberFormProps>({
    resolver: zodResolver(memberSchema),
  });
  const [isPending, setIsPending] = useState<boolean>(false);

  const [openDelete, setOpenDelete] = useState<boolean>(false);

  const { data } = useGetCurrentUser();

  const { editUser } = useEditUser("member");

  const [localImage, setLocalImage] = useState<File | string | undefined>();

  const isFormEdited = Object.keys(dirtyFields).length > 0;

  console.log(data);

  const handleLocalFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    handleFileChange<TEditMemberFormProps>(
      "userImage",
      event,
      setLocalImage,
      setValue
    );
  };

  async function handleRemoveProfilePicture() {
    if (!data) return;
    await editUser({
      editUserDetails: { removeImage: true } as TEditMemberFormProps,
      selectedId: data?._id,
    });
    setOpenDelete(false);
  }

  function handleRemove() {
    if (typeof localImage !== "string") {
      setLocalImage(data?.userImage);
      setValue("userImage", data?.userImage, {
        shouldDirty: true,
      });
    } else {
      setOpenDelete(true);
    }
  }

  async function onSubmit(data: TEditMemberFormProps) {
    setIsPending(true);
    if (localImage) {
      //   // TODO : Replace the current image with the new one
      const trainerImageUrl = await uploadImage(localImage as File);
      setValue("userImage", trainerImageUrl, { shouldDirty: true });
      data = { ...data, userImage: trainerImageUrl };
    }
    // HANDLE THIS
    await editUser({ editUserDetails: data, selectedId: data?._id });
    reset();
    setIsPending(false);
  }

  function handleReset() {
    if (!data) return;
    reset({
      _id: data?._id,
      name: data?.name,
      address: data?.address,
      birthDate: data?.birthDate?.slice(0, 10),
      email: data?.email,
      gender: data?.gender,
      status: data.status,
      userImage: data?.userImage,
      phoneNumber: String(data?.phoneNumber),
      createdAt: formatTime(data?.createdAt ?? "", "MMM dd, yyyy"),
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
      birthDate: data?.birthDate?.slice(0, 10),
      email: data?.email,
      gender: data?.gender,
      status: data?.status,
      userImage: data?.userImage,
      phoneNumber: String(data?.phoneNumber),
      createdAt: formatTime(data?.createdAt || data?.joinDate, "MMM dd, yyyy"),
    });

    if (data.userImage) {
      setLocalImage(data.userImage);
    } else {
      setLocalImage(undefined);
    }
  }, [reset, data]);

  return (
    <>
      <header className="flex justify-between items-center mb-6">
        <Heading
          level={5}
          variant={"quinary"}
          className="text-2xl font-medium text-gray-secondary"
        >
          Account Information
        </Heading>
        <Button
          onClick={() => setOpenChangePasswordModal(true)}
          variant={"accentReverse"}
          className="font-medium border border-accent"
        >
          <Icon
            icon={"mdi:password-outline"}
            className="text-accent !size-[18px]"
          />
          Change Password
        </Button>
      </header>
      <div className="grid-cols-2 gap-6 grid">
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
          label="Member Id"
          disabled={true}
          name="_id"
          type="text"
          placeholder="Member's Id"
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
          placeholder="Member's Email"
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
          type="text"
          placeholder="Member's Phone Number"
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
            className="col-span-full flex items-center justify-end bg-white gap-3 lg:sticky lg:bottom-6  p-3  rounded-lg shadow-card  border"
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
    </>
  );
}
