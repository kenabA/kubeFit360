export default function Tag({
  icon = null,
  value,
}: {
  icon?: React.ReactNode | null;
  value: string;
}) {
  return (
    <div className="flex  gap-2 items-center bg-accent-light w-fit py-1 px-2 border-accent justify-center border-[.5px] rounded-[8px]">
      {icon}
      <span className="text-accent capitalize text-sm font-medium text-nowrap">
        {value}
      </span>
    </div>
  );
}
