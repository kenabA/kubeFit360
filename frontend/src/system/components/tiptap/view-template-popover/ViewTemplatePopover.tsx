import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import useDeleteWorkoutPlanTemplate from "@/system/features/workout-plan-template/useDeleteWorkoutPlanTemplate";
import useWorkoutPlanTemplate from "@/system/features/workout-plan-template/useWorkoutPlanTemplates";
import { Icon } from "@iconify/react/dist/iconify.js";
import { AnimatePresence, motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import { useState } from "react";

const itemVariants = {
  hidden: { opacity: 0 },

  visible: {
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
    },
  },
};

export default function ViewTemplatePopover({
  children,
  handleLoadLocalTemplate,
  handleLoadServerTemplate,
}: {
  children: React.ReactNode;
  handleLoadLocalTemplate: () => void;
  handleLoadServerTemplate: (template: string) => void;
}) {
  const [hoveredTemplateId, setHoveredTemplateId] = useState("");
  const { data } = useWorkoutPlanTemplate();
  const { deleteWorkoutPlanRequest, isPending } =
    useDeleteWorkoutPlanTemplate();
  return (
    <Popover>
      <PopoverTrigger asChild className="cursor-pointer group">
        {children}
      </PopoverTrigger>
      <PopoverContent
        align="center"
        sideOffset={10}
        className="py-2 px-4 rounded-xl shadow-general w-[200px] flex flex-col gap-[10px] border-[1px] border-[#E4E4E7]"
      >
        <div className="flex flex-col gap-3 mb-3">
          <span className="text-xs font-normal text-gray-tertiary capitalize">
            Pre-built Template
          </span>
          <button
            className="flex gap-2 items-center"
            onClick={() => handleLoadLocalTemplate()}
          >
            <Icon
              icon={"tabler:template"}
              className="text-gray-secondary text-[20px]"
            />
            <span className="text-sm text-gray-secondary">
              Table Blue Print
            </span>
          </button>
        </div>
        <div className="flex flex-col gap-3 mb-3">
          <span className="text-xs font-normal text-gray-tertiary capitalize">
            Saved Template
          </span>
          {data.data.length > 0 ? (
            data.data.map((template) => (
              <button
                key={template._id}
                onMouseEnter={() => setHoveredTemplateId(template._id)}
                onMouseLeave={() => setHoveredTemplateId("")}
                className={cn(
                  "w-full flex items-center justify-between relative "
                  // hoveredTemplateId === template._id && "bg-slate-50"
                )}
                onClick={() => handleLoadServerTemplate(template.template)}
              >
                <div className="flex gap-2 items-center">
                  <Icon
                    icon={"tabler:template"}
                    className="text-gray-secondary text-[20px]"
                  />
                  <span className="text-sm text-gray-secondary">
                    {template.templateName}
                  </span>
                </div>
                <AnimatePresence>
                  {hoveredTemplateId === template._id && (
                    <motion.button
                      disabled={isPending}
                      variants={itemVariants}
                      onClick={(e) => {
                        deleteWorkoutPlanRequest(template._id);
                        e.stopPropagation();
                      }}
                      className="bg-destructive-light border-destructive border rounded-sm text-white p-1 absolute right-0"
                    >
                      <Trash2 className="stroke-destructive !size-[14px]" />
                    </motion.button>
                  )}
                </AnimatePresence>
              </button>
            ))
          ) : (
            <span className="text-sm text-gray-secondary">None</span>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
