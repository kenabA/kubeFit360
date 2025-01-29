import { TOptions } from "@/system/global/utils";

export type TBaseSelect = {
  onClear: () => void;
  isCleared: boolean;
  setFilters: React.Dispatch<
    React.SetStateAction<{ field: string; value: string }[]>
  >;
  label: string;
  options: TOptions[];
  className: string;
};
