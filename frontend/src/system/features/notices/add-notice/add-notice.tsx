import { Button } from "@/components";
import { FormModal } from "@/components/formModal/FormModal";
import BaseInput from "@/system/components/input/base-input/BaseInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import BaseImageInput from "@/system/components/input/base-image-input/BaseImageInput";
import { handleFileChange, uploadImage } from "@/system/lib/helpers";
import { useState } from "react";
import { Oval } from "react-loader-spinner";
import { TAddNoticeFormProps } from "./types";
import { noticeSchema } from "./validator";
import useAddNotice from "./useAddNotice";

export default function AddNotice({
  isDialogOpen,
  setIsDialogOpen,
}: {
  isDialogOpen: boolean;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [isPending, setIsPending] = useState<boolean>(false);
  const [localImage, setLocalImage] = useState<File | string | undefined>();

  const { addNotice } = useAddNotice();

  const {
    register,

    reset,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TAddNoticeFormProps>({
    resolver: zodResolver(noticeSchema),
  });

  const handleLocalFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    handleFileChange<TAddNoticeFormProps>(
      "representativeImg",
      event,
      setLocalImage,
      setValue
    );
  };

  async function onSubmit(data: TAddNoticeFormProps) {
    setIsPending(true);
    data = { ...data, expiresAt: new Date(data.expiresAt).toISOString() };
    if (localImage) {
      const noticeImageUrl = await uploadImage(localImage as File);
      setValue("representativeImg", noticeImageUrl);
      data = { ...data, representativeImg: noticeImageUrl };
    }
    await addNotice(data);
    setIsPending(false);
    setIsDialogOpen(false);
  }

  function handleCancel() {
    setIsDialogOpen(false);
    setLocalImage(undefined);
    reset();
  }

  return (
    <FormModal
      icon="pepicons-pop:bulletin-notice"
      title="Add Notice"
      subtitle="Fill in the form to add a notice"
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
          allowPastDate={false}
          placeholder="Enter the expiry date"
          register={register}
        />
        <BaseImageInput
          isSettings={true}
          handleFileChange={handleLocalFileChange}
          handleRemove={() => setLocalImage(undefined)}
          localImage={localImage}
          setLocalImage={setLocalImage}
          error={errors.representativeImg}
          label="Representative Image"
          name="representativeImg"
          type="file"
        />
      </form>
    </FormModal>
  );
}
