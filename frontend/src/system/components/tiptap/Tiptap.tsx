import Underline from "@tiptap/extension-underline";
import "./styles.scss";
import CharacterCount from "@tiptap/extension-character-count";
import Placeholder from "@tiptap/extension-placeholder";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import ListItem from "@tiptap/extension-list-item";
import TextAlign from "@tiptap/extension-text-align";
import OrderedList from "@tiptap/extension-ordered-list";
import CharacterCountStats from "./CharacterCountStats";
import BubbleMenuBar from "./BubbleMenu";
import Highlight from "@tiptap/extension-highlight";
import { Color } from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableHeader from "@tiptap/extension-table-header";
import TableCell from "@tiptap/extension-table-cell";
import TableOperations from "./TableOperations";

const limit = 2500;

const Tiptap = () => {
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

  function handleLoadTemplate() {
    const newTemplate = `
    <table>
      <thead>
        <tr>
          <th rowspan="2">Day</th>
          <th colspan="3">Workout Plan</th>
        </tr>
        <tr>
          <th>Exercise</th>
          <th>Reps</th>
          <th>Sets</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>Monday</td><td></td><td></td><td></td></tr>
        <tr><td>Tuesday</td><td></td><td></td><td></td></tr>
        <tr><td>Wednesday</td><td></td><td></td><td></td></tr>
        <tr><td>Thursday</td><td></td><td></td><td></td></tr>
        <tr><td>Friday</td><td></td><td></td><td></td></tr>
        <tr><td>Saturday</td><td></td><td></td><td></td></tr>
        <tr><td>Sunday</td><td></td><td></td><td></td></tr>
      </tbody>
    </table>
  `;

    if (editor) {
      editor.commands.setContent(newTemplate, true);
    }
  }

  function handleClearContent() {
    if (editor) {
      editor.commands.clearContent(true);
    }
  }

  return (
    <div className="border rounded-[8px] p-4  flex flex-col justify-between relative h-full ">
      <EditorContent editor={editor} />
      {editor && (
        <>
          <BubbleMenuBar editor={editor} />
          <div className="flex gap-4 justify-between items-center mt-4">
            <CharacterCountStats limit={limit} editor={editor} />
            <TableOperations
              editor={editor}
              handleLoadTemplate={handleLoadTemplate}
              handleClearContent={handleClearContent}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Tiptap;
