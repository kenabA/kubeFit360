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
  //   SelectContent,
  SelectGroup,
  SelectItem,
  SelectContent,
} from "@/components/ui/select";
import { Oval } from "react-loader-spinner";
import { TRequestWorkoutPlanProps } from "./type";

export default function RequestWorkoutPlan({
  isDialogOpen,
  setIsDialogOpen,
}: TRequestWorkoutPlanProps) {
  //   const {
  //     register,
  //     control,
  //     reset,
  //     handleSubmit,

  //     formState: { errors },
  //   } = useForm<TAddEquipmentFormProps>({
  //     resolver: zodResolver(equipmentSchema),
  //   });

  //   const { addEquipment, isSuccess, error } = useAddEquipment();

  //   useEffect(() => {
  //     if (isSuccess) {
  //       setIsDialogOpen(false);
  //       reset();
  //     }
  //   }, [isSuccess]);

  //   useEffect(() => {
  //     if (error) {
  //     }
  //   }, [error]);

  //   async function onSubmit(data: TAddEquipmentFormProps) {
  //     addEquipment(data);
  //   }

  function handleCancel() {
    setIsDialogOpen(false);
    // reset();
  }

  return (
    <FormModal
      icon="lucide:package"
      title="Request Workout Plan"
      subtitle="Fill in the form to request the workout plan"
      open={isDialogOpen}
      setOpen={setIsDialogOpen}
      footer={
        <>
          <Button
            // disabled={isPending}
            className="shadow-none hover:shadow-none h-10"
            variant={"primaryReverse"}
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            form="equipment-form"
            type="submit"
            // onClick={handleSubmit(onSubmit)}
            className="px-6 shadow-none hover:shadow-none h-10 w-20"
            variant={"primary"}
            // disabled={isPending}
          >
            {false ? (
              <Oval
                height="280"
                strokeWidth={8}
                secondaryColor="white"
                width="280"
                color="white"
                wrapperStyle={{}}
              />
            ) : (
              "Request"
            )}
          </Button>
        </>
      }
    >
      <form
        id="equipment-form"
        className="w-full flex flex-col items-center gap-4"
      >
        {/* <BaseInput
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
        </div> */}
      </form>
    </FormModal>
  );
}
