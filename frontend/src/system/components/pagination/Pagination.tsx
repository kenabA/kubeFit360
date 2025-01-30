import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

export default function Pagination({ count }: { count: number }) {
  const [params, setParams] = useSearchParams();
  const [page, setPage] = useState<number>(1);
  const limit = 2;

  useEffect(() => {
    if (!params.get("page")) {
      return;
    }
    const page = Number(params.get("page"));
    setPage(page);
  }, [params]);

  const startRange = (page - 1) * limit + 1;
  const endRange = Math.min(page * limit, count);

  const pageButtons = Array.from(
    { length: Math.round(count / limit) },
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
    <div className="py-[12px] border-t w-full px-6 flex items-center justify-between">
      <div className="text-accent text-sm font-bold">
        {startRange} - {endRange}{" "}
        <span className="text-gray-tertiary font-normal">
          of <b>{count}</b>
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
