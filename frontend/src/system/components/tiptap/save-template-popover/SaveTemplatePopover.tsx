import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import BaseInput from "../../input/base-input/BaseInput";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Editor } from "@tiptap/react";
import { TSaveTemplateFormProps } from "./type";
import { saveTemplateSchema } from "./validator";
import { Button } from "@/components";
import useCreateWorkoutPlanTemplate from "@/system/features/workout-plan-template/useCreateWorkoutPlanTemplate";
import { Oval } from "react-loader-spinner";
import { useEffect } from "react";

export default function SaveTemplatePopover({
  children,
  editor,
}: {
  children: React.ReactNode;
  editor: Editor;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TSaveTemplateFormProps>({
    resolver: zodResolver(saveTemplateSchema),
  });

  const { createWorkoutPlanTemplate, isPending } =
    useCreateWorkoutPlanTemplate();

  useEffect(() => {
    reset({
      template: editor?.getHTML(),
    });
  }, [editor?.getHTML()]);

  async function onSubmit(data: TSaveTemplateFormProps) {
    createWorkoutPlanTemplate(data);
  }

  return (
    <Popover>
      <PopoverTrigger asChild className="cursor-pointer group">
        {children}
      </PopoverTrigger>
      <PopoverContent
        align="center"
        sideOffset={20}
        className="p-3 rounded-xl shadow-general w-[300px]"
      >
        <form id="save-template-form" className="flex flex-col gap-[10px]">
          <BaseInput
            error={errors.templateName}
            label="Template Name"
            name="templateName"
            type="text"
            placeholder="Enter the template name"
            register={register}
          />
          <Button
            form="save-template-form"
            type="submit"
            onClick={handleSubmit(onSubmit)}
            className="px-6 shadow-none hover:shadow-none h-10 font-medium"
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
              "Save"
            )}
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  );
}
