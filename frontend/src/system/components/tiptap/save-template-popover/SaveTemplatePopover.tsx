import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import BaseInput from "../../input/base-input/BaseInput";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TSaveTemplateFormProps } from "./type";
import { saveTemplateSchema } from "./validator";
import { Button } from "@/components";
import useCreateWorkoutPlanTemplate from "@/system/features/workout-plan-template/useCreateWorkoutPlanTemplate";

export default function SaveTemplatePopover({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    register,
    formState: { errors },
  } = useForm<TSaveTemplateFormProps>({
    resolver: zodResolver(saveTemplateSchema),
  });

  const { createWorkoutPlanTemplate, isPending, isSuccess, error } =
    useCreateWorkoutPlanTemplate();

  return (
    <Popover>
      <PopoverTrigger asChild className="cursor-pointer group">
        {children}
      </PopoverTrigger>
      <PopoverContent
        align="center"
        sideOffset={20}
        className="p-3 rounded-xl shadow-general w-[300px] flex flex-col gap-[10px]"
      >
        <BaseInput
          error={errors.templateName}
          label="Template Name"
          name="templateName"
          type="text"
          placeholder="Enter the template name"
          register={register}
        />

        <Button
          form="equipment-form"
          type="submit"
          // onClick={handleSubmit(onSubmit)}
          className="px-6 shadow-none hover:shadow-none h-10 font-medium"
          variant={"primary"}
          //   disabled={isPending}
        >
          {/* {isPending ? (
            <Oval
              height="280"
              strokeWidth={8}
              secondaryColor="white"
              width="280"
              color="white"
              wrapperStyle={{}}
            />
          ) : ( */}
          Save
          {/* )} */}
        </Button>
      </PopoverContent>
    </Popover>
  );
}
