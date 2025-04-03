import { Button } from "@/components";
import Tiptap from "@/system/components/tiptap/Tiptap";
import Underline from "@tiptap/extension-underline";
import CharacterCount from "@tiptap/extension-character-count";
import Placeholder from "@tiptap/extension-placeholder";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useEditor } from "@tiptap/react";
import { Oval } from "react-loader-spinner";
import StarterKit from "@tiptap/starter-kit";
import ListItem from "@tiptap/extension-list-item";
import TextAlign from "@tiptap/extension-text-align";
import OrderedList from "@tiptap/extension-ordered-list";
import Highlight from "@tiptap/extension-highlight";
import { Color } from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableHeader from "@tiptap/extension-table-header";
import TableCell from "@tiptap/extension-table-cell";
import { useToast } from "@/hooks/use-toast";

const limit = 2500;

export default function WorkoutPlanEditor({
  isPending,
  handleCreateWorkoutPlan,
}: {
  isPending: boolean;
  handleCreateWorkoutPlan: (content: string) => void;
}) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      OrderedList,
      ListItem,
      TextStyle,
      Color,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,

      Underline,
      Highlight.configure({ multicolor: true }),
      CharacterCount.configure({
        limit,
      }),
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === "heading") {
            return "What’s the title?";
          }

          return "Click here to write the workout plan ...";
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
  });

  const { toast } = useToast();

  function handleSendtoClient() {
    if (!editor) {
      return;
    }

    if (editor?.getHTML() === "<p></p>") {
      toast({
        variant: "error",
        title: "No Content",
        description:
          "Please write a workout plan first before sending it to the client",
      });
      return;
    }

    handleCreateWorkoutPlan(editor.getHTML());
  }

  if (!editor) {
    return;
  }

  return (
    <div className="shadow-general p-6 rounded-[12px] space-y-6 bg-white flex flex-col h-full">
      <div className="flex sm:flex-row flex-col items-start gap-y-2 sm:items-center justify-between">
        <span className="block font-semibold text-lg text-gray text-nowrap">
          Workout Plan
        </span>
        <div className="flex items-center gap-2 flex-wrap">
          {/* <Button
            className="shadow-none hover:shadow-none h-10 w-fit sm:w-44 border-[1px] border-primary hover:text-primary-hover hover:border-primary-hover bg-tertiary text-primary-hover font-semibold text-sm"
            variant={"outline"}
            disabled={isPending}
          >
            <Icon icon={"mingcute:ai-fill"} />
            Generate with AI
          </Button> */}
          <Button
            onClick={handleSendtoClient}
            disabled={isPending}
            variant={"primary"}
            className="shadow-none hover:shadow-none h-10 w-fit sm:w-40  hover:bg-primary-hover  bg-primary text-primary-foreground font-semibold text-sm"
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
              <>
                <Icon icon={"mingcute-send-fill"} className="!size-[20px]" />
                Send to Client
              </>
            )}
          </Button>
        </div>
      </div>
      <Tiptap limit={limit} editor={editor} />
    </div>
  );
}
