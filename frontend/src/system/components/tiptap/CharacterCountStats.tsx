import { Editor } from "@tiptap/react";

export default function CharacterCountStats({
  editor,
  limit,
}: {
  editor: Editor;
  limit: number;
}) {
  const percentage = editor
    ? Math.round((100 / limit) * editor.storage.characterCount.characters())
    : 0;
  return (
    <div
      className={`character-count  flex gap-2 items-center justify-center   ${
        editor.storage.characterCount.characters() === limit
          ? "character-count--warning"
          : ""
      }`}
    >
      <svg height="20" width="20" viewBox="0 0 20 20">
        <circle r="10" cx="10" cy="10" fill="#e9ecef" />
        <circle
          r="5"
          cx="10"
          cy="10"
          fill="transparent"
          stroke={"hsl(var(--primary))"}
          strokeWidth="10"
          strokeDasharray={`calc(${percentage} * 31.4 / 100) 31.4`}
          transform="rotate(-90) translate(-20)"
        />
        <circle r="6" cx="10" cy="10" fill="white" />
      </svg>
      <div className="flex flex-col">
        <span className="text-gray-tertiary text-xs">
          {editor.storage.characterCount.characters()} / {limit} characters
        </span>
        <span className="text-gray-tertiary text-xs">
          {editor.storage.characterCount.words()} words
        </span>
      </div>
    </div>
  );
}
