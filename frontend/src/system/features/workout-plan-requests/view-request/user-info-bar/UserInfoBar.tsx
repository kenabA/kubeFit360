import InfoCard from "@/system/components/info-card/InfoCard";
import { Icon } from "@iconify/react/dist/iconify.js";
import { TWorkoutPlanRequest } from "../../types";
import { calculateAge, formatTime } from "@/lib/utils";

export default function UserInfoBar({ data }: { data: TWorkoutPlanRequest }) {
  return (
    <div
      className="grid grid-cols-3
     gap-y-6 max-h-[450px] overflow-hidden overflow-y-auto custom-scrollbar"
    >
      <InfoCard
        icon={
          <Icon
            icon={"akar-icons:calendar"}
            className="text-[20px] text-slate-400"
          />
        }
        label="requested date"
        value={formatTime(data.createdAt)}
      />
      <InfoCard
        icon={
          <Icon
            icon={"tabler:activity"}
            className="text-[20px] text-slate-400"
          />
        }
        label="age / gender"
        value={`${calculateAge(data.member.birthDate)} / ${data.member.gender}`}
      />
      <InfoCard
        icon={
          <Icon icon={"mynaui:ruler"} className="text-[20px] text-slate-400" />
        }
        label="height"
        value={`${data.height.feet}’${data.height.inches}’’`}
      />
      <InfoCard
        icon={
          <Icon icon={"lucide:weight"} className="text-[20px] text-slate-400" />
        }
        label="weight"
        value={`${data.weight} kg`}
      />
      <InfoCard
        icon={
          <Icon
            icon={"tabler:activity"}
            className="text-[20px] text-slate-400"
          />
        }
        label="fitness level"
        value={data.fitnessLevel}
      />
      <InfoCard
        icon={
          <Icon
            icon={"majesticons:user-line"}
            className="text-[20px] text-slate-400"
          />
        }
        label="body type"
        value={data.bodyType}
      />
      <InfoCard
        icon={
          <Icon
            icon={"fluent:dumbbell-28-regular"}
            className="text-[20px] text-slate-400"
          />
        }
        className="items-start"
        type="list"
        label="Workout Type"
        value={data.workoutTypePreference}
      />
      <InfoCard
        icon={
          <Icon
            icon={"akar-icons:calendar"}
            className="text-[20px] text-slate-400"
          />
        }
        type="list"
        className="items-start"
        label="Preferred Days"
        value={data.preferredWorkoutDays}
      />
      <InfoCard
        className="items-start"
        icon={
          <Icon
            icon={"mdi:heart-outline"}
            className="text-[20px] text-slate-400"
          />
        }
        type="list"
        label="Workout Goals"
        value={data.workoutGoals}
      />

      <InfoCard
        className="items-start col-span-full"
        icon={
          <Icon
            icon={"akar-icons:file"}
            className="text-[20px] text-slate-400"
          />
        }
        type="description"
        label="additional notes"
        value={data.additionalNotes}
      />
    </div>
  );
}
