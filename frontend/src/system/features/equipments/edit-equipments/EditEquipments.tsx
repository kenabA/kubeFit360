import { Button } from "@/components";
import { FormModal } from "@/components/formModal/FormModal";
import { zodResolver } from "@hookform/resolvers/zod";

import { Controller, useForm } from "react-hook-form";

import BaseInput from "@/system/components/input/base-input/BaseInput";

import { useEffect, useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";
import { TEditEquipmentFormProps, TEditEquipmentProps } from "./type";

import { useQueryClient } from "@tanstack/react-query";

import useEditEquipment from "./useEditEquipment";
import { editEquipmentSchema } from "./validator";
import { TEquipmentsData } from "../type";
import { TApiResponse } from "@/system/lib/types";
import { statusOptions } from "@/system/lib/data";
import { useSearchParams } from "react-router";
import { Oval } from "react-loader-spinner";
import BaseImageInput from "@/system/components/input/base-image-input/BaseImageInput";
import { handleFileChange, uploadImage } from "@/system/lib/helpers";
import FormSelect from "@/system/components/select/form-select/FormSelect";

export default function EditEquipments({
  selectedId,
  isDialogOpen,
  setIsDialogOpen,
}: TEditEquipmentProps) {
  const [localImage, setLocalImage] = useState<File | string | undefined>();
  const [isPending, setIsPending] = useState<boolean>(false);
  const [searchParams] = useSearchParams();
  const filters = Object.fromEntries(searchParams.entries());
  const queryClient = useQueryClient();
  const allEquipment = queryClient.getQueryData<
    TApiResponse<TEquipmentsData[]>
  >(["equipments", filters]);

  const equipment = allEquipment?.data.data?.find((e) => e._id === selectedId);
  const { editEquipment, isSuccess, error } = useEditEquipment();

  const {
    register,

    setValue,
    control,
    reset,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<TEditEquipmentFormProps>({
    resolver: zodResolver(editEquipmentSchema),
  });

  useEffect(() => {
    if (isSuccess) {
      setIsPending(false);
      setIsDialogOpen(false);
      reset();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (!equipment) return;
    reset({
      equipmentName: equipment?.equipmentName,
      equipmentImage: equipment?.equipmentImage,
      description: equipment?.description,
      serialNumber: equipment?.serialNumber,
      brandName: equipment?.brandName,
      status: equipment?.status,
      category: equipment?.category,
    });
    if (equipment.equipmentImage) {
      setLocalImage(equipment.equipmentImage);
    } else {
      setLocalImage(undefined);
    }
  }, [reset, equipment]);

  useEffect(() => {
    if (error) {
      setIsPending(false);
    }
  }, [error]);

  async function onSubmit(data: TEditEquipmentFormProps) {
    setIsPending(true);
    if (localImage) {
      // TODO : Replace the current image with the new one
      const equipmentImageUrl = await uploadImage(localImage as File);
      setValue("equipmentImage", equipmentImageUrl, { shouldDirty: true });
      data = { ...data, equipmentImage: equipmentImageUrl };
    }
    editEquipment({ editEquipmentDetails: data, selectedId });
  }

  const handleLocalFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    handleFileChange<TEditEquipmentFormProps>(
      "equipmentImage",
      event,
      setLocalImage,
      setValue
    );
  };

  function handleCancel() {
    setIsDialogOpen(false);
    setLocalImage(equipment?.equipmentImage);
    reset();
  }

  function handleRemove() {
    if (typeof localImage !== "string") {
      setLocalImage(equipment?.equipmentImage);
      setValue("equipmentImage", equipment?.equipmentImage, {
        shouldDirty: true,
      });
    } else {
      // TODO : Handle Remove of the equipment
      alert(123);
    }
  }

  return (
    <FormModal
      icon="lucide:package"
      title="Edit Equipment"
      subtitle="Modify and Update Equipment Details"
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
            form="equipment-form"
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
        {/* TODO : Use the custom Select field  */}
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
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="focus:ring-gray-tertiary rounded-[8px] border border-slate-300 px-4 focus-visible:ring-1 focus-visible:ring-gray-tertiary  text-sm h-[44px]">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem className="focus:bg-tertiary/50" value="cardio">
                      Cardio
                    </SelectItem>
                    <SelectItem
                      className="focus:bg-tertiary/50"
                      value="strength"
                    >
                      Strength
                    </SelectItem>
                    <SelectItem
                      className="focus:bg-tertiary/50"
                      value="flexibility"
                    >
                      Flexibility
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
        </div>
        <div className="w-full">
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <FormSelect
                error={errors.status}
                label={field.name}
                field={field}
                options={statusOptions}
                placeholder="Select a status"
              />
            )}
          />
        </div>
        <BaseImageInput
          handleFileChange={handleLocalFileChange}
          handleRemove={handleRemove}
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
