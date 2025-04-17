import { Button } from "@/components";
import { FormModal } from "@/components/formModal/FormModal";
import BaseInput from "@/system/components/input/base-input/BaseInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import BaseImageInput from "@/system/components/input/base-image-input/BaseImageInput";
import { handleFileChange } from "@/system/lib/helpers";
import { useState } from "react";
import { Oval } from "react-loader-spinner";

import { noticeSchema } from "./validator";
import { TEditNoticeFormProps } from "./types";

export default function EditNotice({
  isDialogOpen,
  setIsDialogOpen,
}: {
  isDialogOpen: boolean;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [isPending, setIsPending] = useState<boolean>(false);
  const [localImage, setLocalImage] = useState<File | string | undefined>();

  const {
    register,
    reset,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TEditNoticeFormProps>({
    resolver: zodResolver(noticeSchema),
  });

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

  async function onSubmit(data: TEditNoticeFormProps) {
    setIsPending(true);
    data = { ...data, expiresAt: new Date(data.expiresAt).toISOString() };
    // if (localImage) {
    //   const noticeImageUrl = await uploadImage(localImage as File);
    //   setValue("representativeImg", noticeImageUrl);
    //   data = { ...data, representativeImg: noticeImageUrl };
    // }
    // addEquipment(data);

    console.log(data);
  }

  function handleCancel() {
    setIsDialogOpen(false);
    setLocalImage(undefined);
    reset();
  }

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
              handleSubmit(onSubmit);
              e.stopPropagation();
            }}
            className="px-6 shadow-none hover:shadow-none h-10 w-34"
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
