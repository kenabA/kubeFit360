import { Button } from "@/components";
import { FormModal } from "@/components/formModal/FormModal";
import BaseInput from "@/system/components/input/base-input/BaseInput";
import { useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import BaseImageInput from "@/system/components/input/base-image-input/BaseImageInput";
import { handleFileChange, uploadImage } from "@/system/lib/helpers";
import { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";

import { noticeSchema } from "./validator";
import { TEditNoticeFormProps } from "./types";
import useGetNotice from "../useGetNotice";
import useEditNotice from "./useEditNotice";
import { ThemedDialog } from "@/components/dialog/Dialog";

export default function EditNotice({
  selectedId,
  isDialogOpen,
  setIsDialogOpen,
}: {
  selectedId: string;
  isDialogOpen: boolean;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [isPending, setIsPending] = useState<boolean>(false);
  const [localImage, setLocalImage] = useState<File | string | undefined>();
  const [openDelete, setOpenDelete] = useState<boolean>(false);

  const {
    register,
    reset,
    handleSubmit,
    setValue,
    formState: { errors, isDirty },
  } = useForm<TEditNoticeFormProps>({
    resolver: zodResolver(noticeSchema),
  });

  const { editNotice, isSuccess } = useEditNotice({ selectedId: selectedId });

  async function handleRemoveProfilePicture() {
    if (!noticeData) return;
    await editNotice({
      editNoticeDetails: { removeImage: true } as TEditNoticeFormProps,
      selectedId: selectedId,
    });
    setOpenDelete(false);
    setIsDialogOpen(false);
    setValue("representativeImg", undefined, { shouldDirty: true });
  }

  const handleLocalFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    handleFileChange<TEditNoticeFormProps>(
      "representativeImg",
      event,
      setLocalImage,
      setValue
    );
  };

  const { data: noticeData } = useGetNotice({
    selectedId: selectedId,
    enabled: true,
  });

  function handleRemove() {
    if (typeof localImage !== "string") {
      setLocalImage(noticeData?.representativeImg);
      setValue("representativeImg", noticeData?.representativeImg, {
        shouldDirty: true,
      });
    } else {
      setOpenDelete(true);
    }
  }

  async function onSubmit(data: TEditNoticeFormProps) {
    setIsPending(true);
    data = { ...data, expiresAt: new Date(data.expiresAt).toISOString() };
    if (localImage) {
      const noticeImageUrl = await uploadImage(localImage as File);
      setValue("representativeImg", noticeImageUrl);
      data = { ...data, representativeImg: noticeImageUrl };
    }
    await editNotice({ editNoticeDetails: data, selectedId: selectedId });
    setIsDialogOpen(false);
    setIsPending(false);
    setLocalImage(undefined);
  }

  useEffect(() => {
    if (!noticeData) return;

    // Set image first
    if (noticeData.representativeImg) {
      setLocalImage(noticeData.representativeImg);
    } else {
      setLocalImage(undefined);
    }

    // Then reset form values
    reset({
      title: noticeData.title,
      description: noticeData.description,
      expiresAt: noticeData.expiresAt?.slice(0, 10),
      representativeImg: noticeData.representativeImg,
    });
  }, [reset, noticeData]);

  function handleCancel() {
    setIsDialogOpen(false);
    setLocalImage(noticeData?.representativeImg ?? undefined);
    reset();
  }

  // function handleCancel() {
  //   setIsDialogOpen(false);
  //   setLocalImage(noticeData?.representativeImg);
  //   reset();
  // }

  return (
    <FormModal
      icon="pepicons-pop:bulletin-notice"
      title="Edit Notice"
      subtitle="Make changes in the form to edit the notice"
      open={isDialogOpen}
      setOpen={setIsDialogOpen}
      footer={
        <>
          <Button
            disabled={isPending}
            className="shadow-none hover:shadow-none h-10"
            variant={"primaryReverse"}
            onClick={(e) => {
              handleCancel();
              e.stopPropagation();
            }}
          >
            Cancel
          </Button>
          <Button
            form="equipment-form"
            type="submit"
            onClick={(e) => {
              handleSubmit(onSubmit)();
              e.stopPropagation();
            }}
            className="px-6 shadow-none hover:shadow-none h-10 w-34"
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
              "Save Changes"
            )}
          </Button>
        </>
      }
    >
      <form
        id="notice-form"
        className="w-full flex flex-col items-center gap-4"
      >
        <BaseInput
          error={errors.title}
          label="Title"
          name="title"
          type="text"
          placeholder="Enter the title"
          register={register}
        />
        <BaseInput
          error={errors.description}
          label="Content"
          name="description"
          type="text"
          placeholder="Enter the description"
          register={register}
        />
        <BaseInput
          error={errors.expiresAt}
          label="Expiry Date"
          name="expiresAt"
          type="date"
          placeholder="Enter the expiry date"
          register={register}
        />
        <BaseImageInput
          isSettings={true}
          handleFileChange={handleLocalFileChange}
          handleRemove={handleRemove}
          localImage={localImage}
          setLocalImage={setLocalImage}
          error={errors.representativeImg}
          label="Representative Image"
          name="representativeImg"
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
