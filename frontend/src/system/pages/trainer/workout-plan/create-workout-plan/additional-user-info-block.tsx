export type TAdditionalUserInfoBlockProps<T> = {
  data: T;
  type?: "description" | "standard";
};

export default function AdditionalUserInfoBlock<T>({
  data,
  type = "standard",
}: TAdditionalUserInfoBlockProps<T>) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-normal text-slate-400">
        Preferred Days
      </label>

      <span className="text-gray text-[16px] capitalize leading-[1.6]">
        {type === "standard" && Array.isArray(data)
          ? data.map((item, index) => {
              return `${item}${index !== data.length - 1 ? ", " : ""}`;
            })
          : (data as string)}
      </span>
    </div>
  );
}
