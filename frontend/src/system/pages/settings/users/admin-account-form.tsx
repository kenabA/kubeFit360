import { Button } from "@/components";
import { Heading } from "@/components/heading/Heading";
import { motion } from "framer-motion";
import BaseImageInput from "@/system/components/input/base-image-input/BaseImageInput";
import BaseInput from "@/system/components/input/base-input/BaseInput";
import { TEditAdminFormProps } from "@/system/features/users/admin/type";
import { adminSchema } from "@/system/features/users/admin/validator";
import useGetCurrentUser from "@/system/features/users/useGetCurrentUser";
import { handleFileChange, uploadImage } from "@/system/lib/helpers";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { containerVariants } from "@/lib/utils";
import { Oval } from "react-loader-spinner";
import useEditUser from "@/system/features/users/useEditUser";
import { ThemedDialog } from "@/components/dialog/Dialog";
import { TAccountFormProps } from "./types";

export default function AdminAccountForm({
  setOpenChangePasswordModal,
}: TAccountFormProps) {
  const {
    register,
    control,
    reset,
    setValue,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm<TEditAdminFormProps>({
    resolver: zodResolver(adminSchema),
  });

  const [isPending, setIsPending] = useState<boolean>(false);

  const [openDelete, setOpenDelete] = useState<boolean>(false);

  const { data } = useGetCurrentUser();

  const { editUser } = useEditUser("admin");

  const [localImage, setLocalImage] = useState<File | string | undefined>();

  const isFormEdited = Object.keys(dirtyFields).length > 0;

  const handleLocalFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    handleFileChange<TEditAdminFormProps>(
      "userImage",
      event,
      setLocalImage,
      setValue
    );
  };

  async function handleRemoveProfilePicture() {
    if (!data) return;
    await editUser({
      editUserDetails: { removeImage: true },
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

  function handleReset() {
    if (!data) return;
    reset({
      _id: data?._id,
      name: data?.name,
      email: data?.email,
      userImage: data?.userImage,
      phoneNumber: String(data?.phoneNumber),
    });
    if (typeof localImage !== "string") {
      setLocalImage(data?.userImage);
      setValue("userImage", data?.userImage, {
        shouldDirty: true,
      });
    }
  }

  async function onSubmit(data: TEditAdminFormProps) {
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

  useEffect(() => {
    if (!data) return;
    reset({
      _id: data?._id,
      name: data?.name,
      email: data?.email,
      userImage: data?.userImage,
      phoneNumber: String(data?.phoneNumber),
    });

    if (data.userImage) {
      setLocalImage(data.userImage);
    } else {
      setLocalImage(undefined);
    }
  }, [reset, data]);

  return (
    <>
      <header className="flex justify-between items-center mb-6 ">
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
          label="Admin Id"
          disabled={true}
          name="_id"
          type="text"
          placeholder="Admin's Id"
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
          error={errors.phoneNumber}
          label="Phone Number"
          name="phoneNumber"
          type="text"
          placeholder="Admin's Phone Number"
          register={register}
        />
        <BaseInput
          error={errors.email}
          label="Email"
          disabled={true}
          name="email"
          type="text"
          placeholder="Admin's Email"
          register={register}
        />
        {isFormEdited && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="col-span-full flex items-center justify-end gap-3 lg:sticky lg:-bottom-3  p-3  rounded-lg shadow-inner"
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
