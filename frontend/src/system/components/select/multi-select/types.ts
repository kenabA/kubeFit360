export type TOptions<T extends string> = {
  label: string;
  value: T;
  theme?: string;
};

export interface MultiSelectProps<T extends string> {
  label: string;
  options: TOptions<T>[];
  selected: T[];
  onChange: (selected: T[]) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}
