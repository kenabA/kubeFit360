import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { TOptions } from "@/system/global/helpers";

export default function CustomSelect({
  field,
  options,
}: {
  field: any;
  options: TOptions[];
}) {
  return (
    <Select onValueChange={field.onChange} value={field.value}>
      <SelectTrigger className="focus:ring-gray-tertiary rounded-[8px] border border-slate-300 px-4 focus-visible:ring-1 focus-visible:ring-gray-tertiary  text-sm h-[44px]">
        <SelectValue placeholder="Select a status" />
      </SelectTrigger>
      <SelectContent>
        {/* <SelectGroup>
          <SelectItem value="active">
            <div className="flex gap-2 items-center">
              <div className="size-2 rounded-full bg-success"></div>
              <span className="text-success font-medium">Available</span>
            </div>
          </SelectItem>
          <SelectItem value="inactive">
            <div className="flex gap-2 items-center">
              <div className="size-2 rounded-full bg-destructive"></div>
              <span className="text-destructive font-medium">Unavailable</span>
            </div>
          </SelectItem>
          <SelectItem value="underMaintenance">
            <div className="flex gap-2 items-center">
              <div className="size-2 rounded-full bg-warn"></div>
              <span className="text-warn font-medium">Under Maintenance</span>
            </div>
          </SelectItem>
        </SelectGroup> */}
        {options?.map((opt) => {
          return (
            <SelectItem value={opt.value} key={opt.label}>
              <div className="flex gap-2 items-center">
                <div
                  className="size-2 rounded-full"
                  style={{ backgroundColor: opt.theme }}
                ></div>
                <span className="font-medium" style={{ color: opt.theme }}>
                  {opt.label}
                </span>
              </div>
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
