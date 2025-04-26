import {
  FieldError,
  FieldValues,
  Path,
  UseFormSetValue,
} from "react-hook-form";
import { DatetimePicker } from "../../date-picker/DatePicker";
import { format } from "date-fns";

export default function DateInput<T extends FieldValues>({
  label,
  error,
  setValue,
  name,
}: {
  label: string;
  error: FieldError | undefined;
  setValue: UseFormSetValue<T>;
  name: Path<T>;
}) {
  function handleDateChange(date: Date | undefined) {
    if (date)
      setValue(name, format(date, "yyyy-MM-dd") as any, {
        shouldValidate: true,
      });
  }

  return (
    <div className="flex flex-col w-full">
      <div className="group relative w-full flex flex-col gap-2">
        <label
          htmlFor={label}
          className={`text-sm text-gray-tertiary font-normal w-fit`}
        >
          {label}
        </label>
        <DatetimePicker
          className="w-full shadow-sm rounded-[8px] border border-slate-300 px-4 text-sm h-[44px] !selection:bg-secondary "
          onChange={(date) => handleDateChange(date)}
          format={[["months", "days", "years"]]}
        />
      </div>
      {error && (
        <p className="h-full p-1 text-left text-xs text-red-400">
          Invalid Date of Birth
        </p>
      )}
    </div>
  );
}
