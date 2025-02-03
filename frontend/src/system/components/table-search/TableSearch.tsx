import { Icon } from "@iconify/react/dist/iconify.js";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
import { useSearchParams } from "react-router";

export default function TableSearch({ isPending }: { isPending: boolean }) {
  const [searchValue, setSearchValue] = useState<string>("");
  const [params, setParams] = useSearchParams();

  useEffect(() => {
    if (!params.get("search")) {
      return;
    }
    setSearchValue(params.get("search") || "");
  }, [params]);

  function handleSearch() {
    if (params.get("page")) {
      params.set("page", "1");
    }
    if (!searchValue) {
      params.delete("search");
    } else {
      params.set("search", searchValue);
    }
    setParams(params);
  }

  return (
    <div className="w-[420px] h-[44px] border  rounded-[8px] border-slate-300 py-2.5 ps-4 pe-2 flex items-center gap-2">
      {!searchValue && (
        <label className="cursor-pointer" htmlFor="search">
          <Icon icon={"lucide:search"} className="text-gray" />
        </label>
      )}
      <input
        id="search"
        className="w-full focus-visible:ring-0 outline-none text-sm h-full"
        type={"text"}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder={"Search by name, serial number, etc"}
      />
      {searchValue && (
        <button
          onClick={handleSearch}
          className="bg-primary p-1.5 transition-colors rounded-md hover:bg-primary-hover"
        >
          {isPending ? (
            <Oval
              height="16"
              strokeWidth={8}
              secondaryColor="white"
              width="16"
              color="white"
              wrapperStyle={{}}
            />
          ) : (
            <Search className="text-white" size={16} strokeWidth={3} />
          )}
        </button>
      )}
    </div>
  );
}

// 2. Complete the design of the view feature
// 3. Complete the add image of the equipment feature.
// 4. Complete the documentation
