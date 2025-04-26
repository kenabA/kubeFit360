export type TTableCategory = "table" | "column" | "row";

export type TTableItem = {
  label: string;
  icon: string;
  category: TTableCategory;
};

export const tableItems: TTableItem[] = [
  {
    label: "Insert Table",
    icon: "tabler:table-plus",
    category: "table",
  },
  {
    label: "Remove Table",
    icon: "tabler:table-minus",
    category: "table",
  },
  {
    label: "Add Row Top",
    icon: "tabler:row-insert-top",
    category: "row",
  },
  {
    label: "Add Row Bottom",
    icon: "tabler:row-insert-bottom",
    category: "row",
  },
  {
    label: "Remove Row",
    icon: "tabler:row-remove",
    category: "row",
  },
  {
    label: "Add Column Left",
    icon: "tabler:column-insert-left",
    category: "column",
  },
  {
    label: "Add Column Right",
    icon: "tabler:column-insert-right",
    category: "column",
  },
  {
    label: "Remove Column",
    icon: "tabler:column-remove",
    category: "column",
  },
];
