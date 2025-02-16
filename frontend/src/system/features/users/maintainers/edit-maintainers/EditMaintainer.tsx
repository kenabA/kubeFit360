import { Button } from "@/components";
import { FormModal } from "@/components/formModal/FormModal";
import { zodResolver } from "@hookform/resolvers/zod";

import { Controller, useForm } from "react-hook-form";

import BaseInput from "@/system/components/input/base-input/BaseInput";

import { useEffect, useState } from "react";

import { TEditMaintainerFormProps, TEditMaintainerProps } from "./type";

import { genderOptions } from "@/system/lib/data";

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
import DateInput from "@/system/components/input/date-input/DateInput";

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

  const allMaintainers = queryClient.getQueryData<TApiResponse<TUserDetails[]>>(
    ["maintainers", filters]
  );

  const maintainer = allMaintainers?.data.data?.find(
    (e) => e._id === selectedId
  );

  const { editMaintainer, isSuccess, error } = useEditUser("maintainers");

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
      reset();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (!maintainer) return;
    reset({
      name: maintainer?.name,
      address: maintainer?.address,
      birthDate: maintainer?.birthDate,
      email: maintainer?.email,
      gender: maintainer?.gender,
      role: maintainer?.role,
      userImage: maintainer?.userImage,
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
    editMaintainer({ editMaintainerDetails: data, selectedId });
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
      alert(123);
    }
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
          <DateInput<TEditMaintainerFormProps>
            name="birthDate"
            setValue={setValue}
            error={errors.birthDate}
            label="Date of Birth"
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
          label="Maintainer's Image"
          name="userImage"
          type="file"
        />
      </form>
    </FormModal>
  );
}
