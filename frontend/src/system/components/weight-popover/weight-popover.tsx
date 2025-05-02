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

import useRecordWeight from "@/system/features/weights/useRecordWeight";

export default function WeightPopover({
  children,
  setOpenPopover,
  openPopover,
}: {
  children: React.ReactNode;
  setOpenPopover: any;
  openPopover: boolean;
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

  const { addNotice, isPending: isAddingNotice } = useRecordWeight();

  async function onSubmit(data: TWeightFormProps) {
    data = { ...data, loggedAt: new Date(data.loggedAt).toISOString() };
    await addNotice(data);
    reset();
    setOpenPopover(false);
  }

  return (
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
            label="Date of Birth"
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
            disabled={isAddingNotice}
          >
            {isAddingNotice ? (
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
  );
}
