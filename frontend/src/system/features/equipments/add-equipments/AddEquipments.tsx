import { Button } from "@/components";
import { FormModal } from "@/components/formModal/FormModal";
import { zodResolver } from "@hookform/resolvers/zod";
import { equipmentSchema } from "./validator";
import { Controller, useForm } from "react-hook-form";
import { TAddEquipmentFormProps, TAddEquipmentProps } from "./type";
import BaseInput from "@/system/components/input/base-input/BaseInput";
import useAddEquipment from "./useAddEquipment";
import { useEffect, useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";
import { Oval } from "react-loader-spinner";
import BaseImageInput from "@/system/components/input/base-image-input/BaseImageInput";
import { handleFileChange, uploadImage } from "@/system/lib/helpers";

export default function AddEquipments({
  isDialogOpen,
  setIsDialogOpen,
}: TAddEquipmentProps) {
  const [localImage, setLocalImage] = useState<File | string | undefined>();
  const [isPending, setIsPending] = useState<boolean>(false);
  const {
    register,
    control,
    reset,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TAddEquipmentFormProps>({
    resolver: zodResolver(equipmentSchema),
  });

  const { addEquipment, isSuccess } = useAddEquipment();

  useEffect(() => {
    if (isSuccess) {
      setIsPending(false);
      setIsDialogOpen(false);
      setLocalImage(undefined);
      reset();
    }
  }, [isSuccess]);

  async function onSubmit(data: TAddEquipmentFormProps) {
    setIsPending(true);
    if (localImage) {
      const equipmentImageUrl = await uploadImage(localImage as File);
      setValue("equipmentImage", equipmentImageUrl);
      data = { ...data, equipmentImage: equipmentImageUrl };
    }
    addEquipment(data);
  }

  const handleLocalFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    handleFileChange<TAddEquipmentFormProps>(
      "equipmentImage",
      event,
      setLocalImage,
      setValue
    );
  };

  function handleCancel() {
    setIsDialogOpen(false);
    setLocalImage(undefined);
    reset();
  }

  return (
    <FormModal
      title="Add Equipment"
      subtitle="Fill in the form to add a equipment"
      open={isDialogOpen}
      setOpen={setIsDialogOpen}
      footer={
        <>
          <Button
            disabled={isPending}
            className="shadow-none hover:shadow-none h-10"
            variant={"primaryReverse"}
            onClick={handleCancel}
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
        id="equipment-form"
        className="w-full flex flex-col items-center gap-4"
      >
        <BaseInput
          error={errors.equipmentName}
          label="Equipment Name"
          name="equipmentName"
          type="text"
          placeholder="Enter the equipment name"
          register={register}
        />
        <BaseInput
          error={errors.description}
          label="Description"
          name="description"
          type="text"
          placeholder="Enter the description"
          register={register}
        />
        <div className="flex gap-4 items-start w-full">
          <BaseInput
            error={errors.serialNumber}
            label="Serial Number"
            name="serialNumber"
            type="text"
            placeholder="EN-C-123"
            register={register}
          />
          <BaseInput
            error={errors.brandName}
            label="Brand Name"
            name="brandName"
            type="text"
            placeholder="Enter the brand name"
            register={register}
          />
        </div>
        <div className="w-full">
          <label
            htmlFor="category"
            className="text-sm text-gray-tertiary font-normal mb-2 block"
          >
            Category
          </label>
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange}>
                <SelectTrigger className="focus:ring-gray-tertiary rounded-[8px] border border-slate-300 px-4 focus-visible:ring-1 focus-visible:ring-gray-tertiary  text-sm h-[44px]">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem className="focus" value="cardio">
                      Cardio
                    </SelectItem>
                    <SelectItem className="focus" value="strength">
                      Strength
                    </SelectItem>
                    <SelectItem className="focus" value="flexibility">
                      Flexibility
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
          {errors.category && (
            <p className="h-full p-1 text-left text-xs text-red-400">
              {errors.category.message}
            </p>
          )}
        </div>
        <BaseImageInput
          handleFileChange={handleLocalFileChange}
          handleRemove={() => setLocalImage(undefined)}
          localImage={localImage}
          setLocalImage={setLocalImage}
          error={errors.equipmentImage}
          label="Equipment Image"
          name="equipmentImage"
          type="file"
        />
      </form>
    </FormModal>
  );
}
