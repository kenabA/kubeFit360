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
import { TUserDetails } from "@/system/stores/user/types";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useCreateWorkoutPlanRequest from "./useCreateWorkoutPlanRequest";
import useFetchTrainers from "./useFetchTrainers";

export default function RequestWorkoutPlan({
  isDialogOpen,
  setIsDialogOpen,
}: TRequestWorkoutPlanProps) {
  const auth = useAuthUser<TUserDetails>();

  const { trainerOptions } = useFetchTrainers();

  const { createWorkoutPlanTemplate, isPending } =
    useCreateWorkoutPlanRequest();

  const [weekdays, setWeekdays] = useState<TDays[]>([]);
  const [workoutTypePreferences, setWorkoutTypePreferences] = useState<
    TWorkoutTypePreference[]
  >([]);
  const [workoutGoals, setWorkoutGoals] = useState<TWorkoutGoals[]>([]);
  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<TRequestWorkoutPlanFormProps>({
    resolver: zodResolver(workoutPlanTemplateSchema),
    defaultValues: {
      member: auth?._id,
    },
  });

  function handleCancel() {
    setIsDialogOpen(false);
    reset();
  }

  async function onSubmit(data: TRequestWorkoutPlanFormProps) {
    createWorkoutPlanTemplate(data);
    setIsDialogOpen(false);
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
            disabled={isPending}
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
        <div className="w-full">
          <Controller
            name="trainer"
            control={control}
            render={({ field }) => (
              <FormSelect
                error={errors.trainer}
                placeholder="Select your desired trainer"
                label={field.name}
                field={field}
                options={trainerOptions}
              />
            )}
          />
        </div>
        <div className="flex gap-4 items-end w-full">
          <BodyMetricsInput
            unitLabel="ft"
            error={errors.height?.feet}
            label="Height"
            name="height.feet"
            type="number"
            placeholder="Feet"
            register={register}
          />
          <BodyMetricsInput
            label=""
            showLabel={false}
            unitLabel="in"
            error={errors.height?.inches}
            name="height.inches"
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

        <Controller
          control={control}
          name="preferredWorkoutDays"
          render={({ field }) => (
            <MultiSelect<TDays>
              error={errors.preferredWorkoutDays}
              label={"Preferred Workout Days"}
              options={weekdaysOptions}
              selected={weekdays || []}
              onChange={(val) => {
                field.onChange(val);
                setWeekdays(val);
              }}
              placeholder="Select available days"
            />
          )}
        />
        <Controller
          control={control}
          name="workoutTypePreference"
          render={({ field }) => (
            <MultiSelect<TWorkoutTypePreference>
              label={"Preferred Workout Type"}
              options={workoutTypeOptions}
              error={errors.workoutTypePreference}
              selected={workoutTypePreferences || []}
              onChange={(val) => {
                field.onChange(val);
                setWorkoutTypePreferences(val);
              }}
              placeholder="Select workout type preference"
            />
          )}
        />
        <Controller
          control={control}
          name="workoutGoals"
          render={({ field }) => (
            <MultiSelect<TWorkoutGoals>
              label={"Workout Goal"}
              options={workoutGoalOptions}
              error={errors.workoutGoals}
              selected={workoutGoals}
              onChange={(val) => {
                field.onChange(val);
                setWorkoutGoals(val);
              }}
              placeholder="Select workout goal"
            />
          )}
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
