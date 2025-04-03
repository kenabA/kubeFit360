import { Button } from "@/components";
import { Icon } from "@iconify/react/dist/iconify.js";
import { motion } from "framer-motion";
import TablePopover from "./table-popover/TablePopover";
import { Editor } from "@tiptap/react";
import ViewTemplatePopover from "./view-template-popover/ViewTemplatePopover";
import SaveTemplatePopover from "./save-template-popover/SaveTemplatePopover";

const itemVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
    },
  },
};

export default function TableOperations({
  editor,
  handleLoadLocalTemplate,
  handleLoadServerTemplate,
  handleClearContent,
}: {
  editor: Editor;
  handleLoadLocalTemplate: () => void;
  handleLoadServerTemplate: (template: string) => void;
  handleClearContent: () => void;
}) {
  return (
    <div className="flex items-center gap-2">
      {editor && editor.getText().trim() !== "" && (
        <motion.div variants={itemVariants} className="flex items-center gap-2">
          <Button
            onClick={handleClearContent}
            variant={"outline"}
            className="border-transparent text-slate-600 bg-slate-200 py-1 px-2 hover:border-slate-400-hover hover:text-slate-400-hover font-medium"
          >
            <Icon icon={"ic:round-clear"} className="!size-[20px]" />
          </Button>
          <SaveTemplatePopover editor={editor}>
            <Button
              variant={"outline"}
              className="border-accent text-accent bg-accent-light py-1 px-2 hover:border-accent-hover hover:text-accent-hover font-medium"
            >
              <Icon
                icon={"material-symbols:save-outline-rounded"}
                className="!size-[20px]"
              />
            </Button>
          </SaveTemplatePopover>
        </motion.div>
      )}
      <ViewTemplatePopover
        handleLoadServerTemplate={handleLoadServerTemplate}
        handleLoadLocalTemplate={handleLoadLocalTemplate}
      >
        <Button
          variant={"outline"}
          className="border-accent text-accent bg-accent-light py-1 px-2 hover:border-accent-hover hover:text-accent-hover font-medium"
        >
          <Icon icon={"flowbite:upload-outline"} className="!size-[20px]" />
          Load Template
        </Button>
      </ViewTemplatePopover>
      <TablePopover editor={editor}>
        <Button
          variant={"outline"}
          className="border-accent text-accent bg-accent-light py-1 px-2 hover:border-accent-hover hover:text-accent-hover"
        >
          <Icon icon={"tabler:table"} className="!size-[20px]" />
        </Button>
      </TablePopover>
    </div>
  );
}
