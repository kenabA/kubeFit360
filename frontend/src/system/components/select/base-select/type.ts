import { TOptions } from "@/system/lib/data";

export type TBaseSelect = {
  onClear: () => void;
  isCleared: boolean;
  setFilters: React.Dispatch<
    React.SetStateAction<{ field: string; value: string }[]>
  >;
  label: string;
  options: TOptions<any>[];
  className: string;
};
