import { cn } from "@/lib/utils";
import {
  TDays,
  TWorkoutGoals,
  TWorkoutPlanRequest,
  TWorkoutTypePreference,
} from "@/system/features/workout-plan-requests/types";
import AdditionalUserInfoBlock from "./AdditionalUserInfoBlock";

export default function AdditionalUserInfo({
  className,
  data,
}: {
  className?: string;
  data: TWorkoutPlanRequest;
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
        <AdditionalUserInfoBlock<TDays[]> data={data.preferredWorkoutDays} />
        <AdditionalUserInfoBlock<TWorkoutGoals[]> data={data.workoutGoals} />
        <AdditionalUserInfoBlock<TWorkoutTypePreference[]>
          data={data.workoutTypePreference}
        />
        <AdditionalUserInfoBlock<string>
          data={data.additionalNotes}
          type="description"
        />
      </div>
    </div>
  );
}
