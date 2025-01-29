import * as React from "react";

import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { format } from "date-fns";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("border-none py-2 h-full", className)}
      classNames={{
        months:
          "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-4 h-full",

        cell: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md daypicker-cell w-full",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
            : "[&:has([aria-selected])]:rounded-md"
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          `h-8 w-8 font-normal text-[12px] leading-[15.645px] text-gray-secondary day w-full`
        ),
        day_range_start: "day-range-start",
        day_range_end: "day-range-end",

        day_outside:
          "day-outside text-muted-foreground opacity-50  aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",

        day_selected:
          "bg-primary text-primary-foreground hover:bg-secondary hover:text-primary focus:bg-primary focus:text-primary-foreground",
        day_disabled: "text-muted-foreground opacity-50",

        // Each month
        month: "space-y-4 w-full h-full",
        // Todays date
        day_today: "bg-primary !text-white !font-semibold !w-fit",
        // Topbar
        caption:
          "flex justify-center pt-0 p-2 relative items-center  text-gray-primary",
        nav: "flex items-center",
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        nav_button: cn(
          buttonVariants({ variant: "ghost" }),
          "h-7 w-7  p-0  hover:opacity-100"
        ),
        // Topbar title
        caption_label: "text-sm font-bold text-gray-primary",
        // Calendar Content Container
        table: "w-full border-collapse space-y-1 h-full",
        // Months Row and Cell
        head_row: "w-full flex ",
        head_cell:
          "text-muted-foreground   flex-1 rounded-md w-8 font-normal text-[0.8rem]",
        ...classNames,
        // Date Row
        row: "flex mt-2",
      }}
      components={{
        IconLeft: () => {
          return <ChevronLeftIcon className="w-5 h-5" />;
        },

        IconRight: () => {
          return <ChevronRightIcon className="w-5 h-5" />;
        },
      }}
      formatters={{
        formatWeekdayName: (weekday) => format(weekday, "eee"),
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
