import { useMemo } from "react";

export const useGetDayMonth = (isoDateString: string) => {
  return useMemo(() => {
    const date = new Date(isoDateString);

    const day = date.getDate();
    const month = date
      .toLocaleString("default", { month: "short" })
      .toUpperCase();

    return { day, month };
  }, [isoDateString]);
};
