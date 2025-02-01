import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

export default function Pagination({
  resultCount,
  className,
}: {
  resultCount: number;
  className?: string;
}) {
  const [params, setParams] = useSearchParams();
  const [page, setPage] = useState<number>(1);
  const dataLimit = 10;

  useEffect(() => {
    if (!params.get("page")) {
      return;
    }

    const page = Number(params.get("page"));
    setPage(page);
  }, [params]);

  const startRange = (page - 1) * dataLimit + 1;
  const endRange = Math.min(page * dataLimit, resultCount);
  const onlyData = startRange === endRange;

  const pageButtons = Array.from(
    { length: Math.ceil(resultCount / dataLimit) },
    (_, i) => i + 1
  );

  function handleSetPage(page: number) {
    setPage(page);
    params.set("page", String(page));
    setParams(params);
  }

  function handlePrevPage() {
    if (page === 1) return;
    handleSetPage(page - 1);
  }
  function handleNextPage() {
    if (page === pageButtons.length) return;
    handleSetPage(page + 1);
  }

  return (
    <div
      className={cn(
        "py-[12px] border-t w-full flex items-center justify-between",
        className
      )}
    >
      <div className="text-accent text-sm font-bold">
        {`${onlyData ? startRange : `${startRange} - ${endRange}`}`}{" "}
        <span className="text-gray-tertiary font-normal">
          of <b>{resultCount}</b>
        </span>
      </div>
      <div className="flex gap-4 items-center">
        <ChevronLeft
          className={cn(
            "size-4 stroke-gray-tertiary cursor-pointer",
            page === 1 && "stroke-slate-400 cursor-not-allowed"
          )}
          onClick={handlePrevPage}
        />
        <div className="flex items-center gap-1">
          {pageButtons.map((btn) => {
            return (
              <button
                onClick={() => handleSetPage(btn)}
                key={btn}
                className={cn(
                  "text-sm py-1 px-3 rounded-[8px] font-semibold ",
                  btn === page
                    ? "bg-accent text-white cursor-default"
                    : "bg-none text-accent hover:bg-accent-light"
                )}
              >
                {btn}
              </button>
            );
          })}
        </div>
        <ChevronRight
          className={cn(
            "size-4 stroke-gray-tertiary cursor-pointer",
            page === pageButtons.length && "stroke-slate-400 cursor-not-allowed"
          )}
          onClick={handleNextPage}
        />
      </div>
    </div>
  );
}
