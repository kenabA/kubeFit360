import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components";

import { Oval } from "react-loader-spinner";

import BaseInput from "../input/base-input/BaseInput";
import { TWeightFormProps } from "./types";
import { weightSchema } from "./validator";
import { BodyMetricsInput } from "../input/body-metrics-input/BodyMetricsInput";

export default function WeightPopover({
  children,
  setOpenPopover,
  isAddingWeight,
  openPopover,
  recordWeightFn,
}: {
  children: React.ReactNode;
  setOpenPopover: React.Dispatch<React.SetStateAction<boolean>>;
  isAddingWeight: boolean;
  openPopover: boolean;
  recordWeightFn: (data: TWeightFormProps) => void;
  setLastWeightData: React.Dispatch<
    React.SetStateAction<TWeightFormProps | null>
  >;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TWeightFormProps>({
    resolver: zodResolver(weightSchema),
    defaultValues: {
      loggedAt: new Date().toISOString().slice(0, 10),
    },
  });

  async function onSubmit(data: TWeightFormProps) {
    data = {
      ...data,
      loggedAt: new Date(data.loggedAt).toISOString().slice(0, 10),
    };
    await recordWeightFn(data);
    reset();
    setOpenPopover(false);
  }

  return (
    <>
      <Popover open={openPopover} onOpenChange={(val) => setOpenPopover(val)}>
        <PopoverTrigger asChild className="cursor-pointer group">
          {children}
        </PopoverTrigger>
        <PopoverContent
          align="end"
          sideOffset={20}
          className="p-3 rounded-xl shadow-general w-[300px] border border-secondary"
        >
          <form id="weight-form" className="flex flex-col gap-[10px]">
            <BodyMetricsInput
              unitLabel="kg"
              error={errors.weight}
              label="Weight"
              name="weight"
              type="number"
              placeholder="Mention your weight"
              register={register}
            />
            <BaseInput
              allowFuture={false}
              allowPastDate={true}
              error={errors.loggedAt}
              label="Date"
              name="loggedAt"
              placeholder="Enter the date"
              register={register}
              type="date"
            />
            <Button
              form="weight-form"
              type="submit"
              onClick={handleSubmit(onSubmit)}
              className="px-6 shadow-none hover:shadow-none h-9 font-medium w-full"
              variant={"primary"}
              disabled={isAddingWeight}
            >
              {isAddingWeight ? (
                <Oval
                  height="280"
                  strokeWidth={8}
                  secondaryColor="white"
                  width="280"
                  color="white"
                  wrapperStyle={{}}
                />
              ) : (
                "Submit"
              )}
            </Button>
          </form>
        </PopoverContent>
      </Popover>
    </>
  );
}
