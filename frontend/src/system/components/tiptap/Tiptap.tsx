import "./styles.scss";
import { EditorContent, Editor } from "@tiptap/react";
import CharacterCountStats from "./CharacterCountStats";
import BubbleMenuBar from "./BubbleMenu";
import TableOperations from "./TableOperations";

const Tiptap = ({ editor, limit }: { editor: Editor; limit: number }) => {
  function handleLoadLocalTemplate() {
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

  function handleLoadServerTemplate(template: string) {
    if (editor && template) {
      editor.commands.setContent(template, true);
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
              handleLoadServerTemplate={handleLoadServerTemplate}
              handleLoadLocalTemplate={handleLoadLocalTemplate}
              handleClearContent={handleClearContent}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Tiptap;
