import { Button } from "@/components";
import { FormModal } from "@/components/formModal/FormModal";
import { zodResolver } from "@hookform/resolvers/zod";

import { Controller, useForm } from "react-hook-form";

import BaseInput from "@/system/components/input/base-input/BaseInput";

import { useState } from "react";

import { Oval } from "react-loader-spinner";
import { TRequestWorkoutPlanFormProps, TRequestWorkoutPlanProps } from "./type";
import { workoutPlanTemplateSchema } from "./validator";
import FormSelect from "@/system/components/select/form-select/FormSelect";
import {
  bodyTypeOptions,
  fitnessLevelOptions,
  weekdaysOptions,
  workoutGoalOptions,
  workoutTypeOptions,
} from "@/system/lib/data";
import { BodyMetricsInput } from "@/system/components/input/body-metrics-input/BodyMetricsInput";
import { MultiSelect } from "@/system/components/select/multi-select/multi-select";
import { TDays, TWorkoutGoals, TWorkoutTypePreference } from "../types";

export default function RequestWorkoutPlan({
  isDialogOpen,
  setIsDialogOpen,
}: TRequestWorkoutPlanProps) {
  const [weekdays, setWeekdays] = useState<TDays[]>([]);
  const [workoutTypePreferences, setWorkoutTypePreferences] = useState<
    TWorkoutTypePreference[]
  >([]);
  const [workoutGoals, setWorkoutGoals] = useState<TWorkoutGoals[]>([]);
  const {
    register,
    control,
    // reset,
    handleSubmit,
    formState: { errors },
  } = useForm<TRequestWorkoutPlanFormProps>({
    resolver: zodResolver(workoutPlanTemplateSchema),
  });

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

  async function onSubmit(data: TRequestWorkoutPlanFormProps) {
    // setIsPending(true);
    // if (localImage) {
    //   const equipmentImageUrl = await uploadImage(localImage as File);
    //   setValue("equipmentImage", equipmentImageUrl);
    //   data = { ...data, equipmentImage: equipmentImageUrl };
    // }
    // addEquipment(data);
    console.log(data);
  }

  return (
    <FormModal
      icon="pepicons-pop:bulletin-notice"
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
            onClick={handleSubmit(onSubmit)}
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
              "Send"
            )}
          </Button>
        </>
      }
    >
      <form
        id="equipment-form"
        className="w-full flex flex-col items-center gap-4"
      >
        <div className="flex gap-4 items-start w-full">
          <div className="w-full">
            <Controller
              name="bodyType"
              control={control}
              render={({ field }) => (
                <FormSelect
                  error={errors.bodyType}
                  placeholder="Select your body type"
                  label={field.name}
                  field={field}
                  options={bodyTypeOptions}
                />
              )}
            />
          </div>
          <div className="w-full">
            <Controller
              name="fitnessLevel"
              control={control}
              render={({ field }) => (
                <FormSelect
                  error={errors.fitnessLevel}
                  placeholder="Select your fitness level"
                  label={field.name}
                  field={field}
                  options={fitnessLevelOptions}
                />
              )}
            />
          </div>
        </div>
        <div className="flex gap-4 items-end w-full">
          <BodyMetricsInput
            unitLabel="ft"
            error={errors.height?.feet}
            label="Height"
            name="height"
            type="number"
            placeholder="Feet"
            register={register}
          />
          <BodyMetricsInput
            label=""
            showLabel={false}
            unitLabel="in"
            error={errors.height?.inches}
            name="weight"
            type="number"
            placeholder="Inches"
            register={register}
          />
        </div>
        <BodyMetricsInput
          unitLabel="kg"
          error={errors.weight}
          label="Weight"
          name="weight"
          type="number"
          placeholder="Mention your weight"
          register={register}
        />

        {/* preferredWorkoutDays */}
        <MultiSelect<TDays>
          label={"Preferred Workout Days"}
          options={weekdaysOptions}
          selected={weekdays}
          onChange={setWeekdays}
          placeholder="Select available days"
        />
        {/* workoutTypePreference */}
        <MultiSelect<TWorkoutTypePreference>
          label={"Preferred Workout Type"}
          options={workoutTypeOptions}
          selected={workoutTypePreferences}
          onChange={setWorkoutTypePreferences}
          placeholder="Select workout type preference"
        />
        <MultiSelect<TWorkoutGoals>
          label={"Workout Goal"}
          options={workoutGoalOptions}
          selected={workoutGoals}
          onChange={setWorkoutGoals}
          placeholder="Select workout type preference"
        />
        <BaseInput
          error={errors.additionalNotes}
          label="Additional Notes"
          name="additionalNotes"
          type="text"
          placeholder="Mention your additional notes here"
          register={register}
        />
      </form>
    </FormModal>
  );
}
