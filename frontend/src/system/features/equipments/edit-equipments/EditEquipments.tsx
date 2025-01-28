import { Button } from "@/components";
import { FormModal } from "@/components/formModal/FormModal";
import { zodResolver } from "@hookform/resolvers/zod";

import { Controller, useForm } from "react-hook-form";

import BaseInput from "@/system/components/input/base-input/BaseInput";

import { useEffect } from "react";
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
import { TEquipmentResponse } from "@/system/services/equipments/type";

import useEditEquipment from "./useEditEquipment";
import { editEquipmentSchema } from "./validator";
import { TEquipmentsData } from "../type";

export default function EditEquipments({
  selectedId,
  isDialogOpen,
  setIsDialogOpen,
}: TEditEquipmentProps) {
  const queryClient = useQueryClient();
  const allEquipment = queryClient.getQueryData<
    TEquipmentResponse<TEquipmentsData[]>
  >(["equipments"]);

  const equipment = allEquipment?.data.data?.find((e) => e._id === selectedId);

  const { editEquipment, isPending, isSuccess } = useEditEquipment();

  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<TEditEquipmentFormProps>({
    resolver: zodResolver(editEquipmentSchema),
  });

  useEffect(() => {
    if (isSuccess) {
      setIsDialogOpen(false);
      reset();
    }
  }, [isSuccess]);

  function onSubmit(data: TEditEquipmentFormProps) {
    console.log(data);
    editEquipment({ editEquipmentDetails: data, selectedId });
  }

  function handleCancel() {
    setIsDialogOpen(false);
    reset();
  }

  useEffect(() => {
    if (!equipment) return;
    reset({
      equipmentName: equipment?.equipmentName,
      description: equipment?.description,
      serialNumber: equipment?.serialNumber,
      brandName: equipment?.brandName,
      status: equipment?.status,
      category: equipment?.category,
    });
  }, [reset, equipment]);

  return (
    <FormModal
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
            className="px-6 shadow-none hover:shadow-none"
            variant={"primary"}
            disabled={isPending}
          >
            Save
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
          <label
            htmlFor="status"
            className="text-sm text-gray-tertiary font-normal mb-2 block"
          >
            Status
          </label>
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="focus:ring-gray-tertiary rounded-[8px] border border-slate-300 px-4 focus-visible:ring-1 focus-visible:ring-gray-tertiary  text-sm h-[44px]">
                  <SelectValue placeholder="Select a status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem className="" value="active">
                      <div className="flex gap-2 items-center">
                        <div className="size-2 rounded-full bg-success"></div>
                        <span className="text-success font-medium">
                          Available
                        </span>
                      </div>
                    </SelectItem>
                    <SelectItem className="" value="inactive">
                      <div className="flex gap-2 items-center">
                        <div className="size-2 rounded-full bg-destructive"></div>
                        <span className="text-destructive font-medium">
                          Unavailable
                        </span>
                      </div>
                    </SelectItem>
                    <SelectItem className="" value="underMaintenance">
                      <div className="flex gap-2 items-center">
                        <div className="size-2 rounded-full bg-warn"></div>
                        <span className="text-warn font-medium">
                          Under Maintenance
                        </span>
                      </div>
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
        </div>
      </form>
    </FormModal>
  );
}
