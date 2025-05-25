import { Button } from "@/components";
import { FormModal } from "@/components/formModal/FormModal";
import { zodResolver } from "@hookform/resolvers/zod";

import { Controller, useForm } from "react-hook-form";

import BaseInput from "@/system/components/input/base-input/BaseInput";

import { useEffect, useState } from "react";

import { TEditMemberFormProps, TEditMemberProps } from "./type";

import { genderOptions } from "@/system/lib/data";

import { Oval } from "react-loader-spinner";
import BaseImageInput from "@/system/components/input/base-image-input/BaseImageInput";
import { handleFileChange, uploadImage } from "@/system/lib/helpers";
import FormSelect from "@/system/components/select/form-select/FormSelect";
import useEditUser from "../../useEditUser";

import { useSearchParams } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import { TClientDetails } from "@/system/stores/user/types";
import { TApiResponse } from "@/system/lib/types";
import { memberSchema } from "./validator";
import { ThemedDialog } from "@/components/dialog/Dialog";

export default function EditMember({
  selectedId,
  isDialogOpen,
  setIsDialogOpen,
}: TEditMemberProps) {
  const [localImage, setLocalImage] = useState<File | string | undefined>();
  const [isPending, setIsPending] = useState<boolean>(false);
  const [searchParams] = useSearchParams();
  const filters = Object.fromEntries(searchParams.entries());
  const queryClient = useQueryClient();
  const [openDelete, setOpenDelete] = useState<boolean>(false);

  const allMembers = queryClient.getQueryData<TApiResponse<TClientDetails[]>>([
    "members",
    filters,
  ]);

  const members = allMembers?.data.data?.find((e) => e._id === selectedId);

  async function handleRemoveProfilePicture() {
    if (!members) return;
    await editUser({
      editUserDetails: { removeImage: true } as TEditMemberFormProps,
      selectedId: selectedId,
    });
    setOpenDelete(false);
    setIsDialogOpen(false);
    setValue("userImage", undefined, { shouldDirty: true });
  }

  const { editUser, isSuccess, error } = useEditUser("members");

  const {
    register,
    setValue,
    control,
    reset,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<TEditMemberFormProps>({
    resolver: zodResolver(memberSchema),
  });

  useEffect(() => {
    if (isSuccess) {
      setIsPending(false);
      setIsDialogOpen(false);
      reset();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (!members) return;
    reset({
      name: members?.name,
      address: members?.address,
      birthDate: members?.birthDate ? members?.birthDate.slice(0, 10) : "",
      email: members?.email,
      gender: members?.gender,
      userImage: members?.userImage,
      phoneNumber: String(members?.phoneNumber),
    });

    if (members.userImage) {
      setLocalImage(members.userImage);
    } else {
      setLocalImage(undefined);
    }
  }, [reset, members]);

  useEffect(() => {
    if (error) {
      setIsPending(false);
    }
  }, [error]);

  async function onSubmit(data: TEditMemberFormProps) {
    setIsPending(true);
    if (localImage) {
      // TODO : Replace the current image with the new one
      const memberImageUrl = await uploadImage(localImage as File);
      setValue("userImage", memberImageUrl, { shouldDirty: true });
      data = { ...data, userImage: memberImageUrl };
    }
    editUser({ editUserDetails: data, selectedId });
  }

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

  function handleCancel() {
    setIsDialogOpen(false);
    setLocalImage(members?.userImage);
    reset();
  }

  function handleRemove() {
    if (typeof localImage !== "string") {
      setLocalImage(members?.userImage);
      setValue("userImage", members?.userImage, {
        shouldDirty: true,
      });
    } else {
      // TODO : Handle Remove of the members
      setOpenDelete(true);
    }
  }

  return (
    <FormModal
      icon="majesticons:users-line"
      title="Edit Members"
      subtitle="Modify and Update Members Details"
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
            form="members-form"
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
        id="members-form"
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
            disabled={!!members?.email}
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
            allowPastDate={true}
            allowFuture={false}
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
        <BaseImageInput
          handleFileChange={handleLocalFileChange}
          handleRemove={handleRemove}
          localImage={localImage}
          setLocalImage={setLocalImage}
          error={errors.userImage}
          label="Members's Image"
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
