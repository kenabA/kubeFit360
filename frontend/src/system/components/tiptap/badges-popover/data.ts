export type TBadgeColors = {
  name: string;
  color: string;
};

export const badgeColors: TBadgeColors[] = [
  {
    name: "red",
    color: "hsl(var(--destructive))",
  },
  { name: "green", color: "hsl(var(--success))" },
  { name: "yellow", color: "hsl(var(--warn))" },
  { name: "blue", color: "hsl(var(--info))" },
  { name: "orange", color: "hsl(var(--primary))" },
  { name: "remove", color: "transparent" },
];
