import { Button } from "@/components";
import Tiptap from "@/system/components/tiptap/Tiptap";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function WorkoutPlanEditor() {
  return (
    <div className="shadow-general p-6 rounded-[12px] space-y-6 bg-white flex flex-col h-full">
      <div className="flex sm:flex-row flex-col items-start gap-y-2 sm:items-center justify-between">
        <span className="block font-semibold text-lg text-gray text-nowrap">
          Workout Plan
        </span>
        <div className="flex items-center gap-2 flex-wrap">
          <Button
            className="shadow-none hover:shadow-none h-10 w-fit sm:w-44 border-[1px] border-primary hover:text-primary-hover hover:border-primary-hover bg-tertiary text-primary-hover font-semibold text-sm"
            variant={"outline"}
          >
            <Icon icon={"mingcute:ai-fill"} />
            Generate with AI
          </Button>
          <Button
            variant={"primary"}
            className="shadow-none hover:shadow-none h-10 w-fit sm:w-40  hover:bg-primary-hover  bg-primary text-primary-foreground font-semibold text-sm"
          >
            <Icon icon={"mingcute-send-fill"} className="!size-[20px]" />
            Send to Client
          </Button>
        </div>
      </div>

      <Tiptap />
    </div>
  );
}
