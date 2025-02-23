import { cn } from "@/lib/utils";

export default function AdditionalUserInfo({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      className={cn(
        "bg-white shadow-general p-6  !rounded-[12px] relative overflow-hidden",
        className
      )}
    >
      <div className="absolute bg-primary w-full h-48 rounded-full filter blur-2xl -top-36 opacity-[0.2]"></div>
      <span className="font-semibold text-lg text-primary block mb-6">
        Additional User Info
      </span>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-normal text-slate-400">
            Preferred Days
          </label>
          <span className="text-gray text-[16px]">Sun, Mon, Fri</span>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-normal text-slate-400">
            Workout Goals
          </label>
          <span className="text-gray text-[16px]">
            Muscle Gain, Weight Loss
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-normal text-slate-400">
            Workout Type
          </label>
          <span className="text-gray text-[16px]">Strength Training</span>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-normal text-slate-400">
            Additional Notes
          </label>
          <span className="text-gray text-[16px] leading-[1.6]">
            This is a barbell sqaut rack, used to put the items of the gym
            related to the squat machines.
          </span>
        </div>
      </div>
    </div>
  );
}
