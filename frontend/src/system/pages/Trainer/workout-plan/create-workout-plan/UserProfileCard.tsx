import { calculateAge, cn } from "@/lib/utils";
import Tag from "@/system/components/tag/Tag";
import { TWorkoutPlanRequest } from "@/system/features/workout-plan-requests/types";

import { Icon } from "@iconify/react/dist/iconify.js";

export default function UserProfileCard({
  classname,
  data,
}: {
  classname?: string;
  data: TWorkoutPlanRequest;
}) {
  const userData = data.member;
  return (
    <div
      className={cn("bg-white shadow-general p-6 !rounded-[12px]", classname)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-start gap-3">
          <figure className="size-16 border-[1px] border-primary rounded-full items-center justify-center flex overflow-hidden">
            {userData?.userImage ? (
              <img
                src={userData?.userImage}
                alt="Image of the user"
                className="size-full object-cover object-center"
              />
            ) : (
              <div className="bg-tertiary size-full text-primary font-bold text-2xl text-center items-center justify-center flex">
                {userData.name?.split(" ")[0][0] ?? "--"}
              </div>
            )}
          </figure>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-0">
              <span className="font-semibold text-lg text-gray-secondary">
                {userData?.name}
              </span>
              <span className="text-sm text-gray-secondary">
                {calculateAge(data.member.birthDate)} years old /{" "}
                <span className="capitalize">{userData.gender}</span>
              </span>
            </div>
            <div className="flex gap-2 items-center justify-start">
              <Tag
                value={data.fitnessLevel}
                icon={
                  <Icon
                    icon={"tabler:activity"}
                    className="text-[20px] text-accent"
                  />
                }
              />
              <Tag
                icon={
                  <Icon
                    icon={"lucide:weight"}
                    className="text-[20px] text-accent"
                  />
                }
                value={`${data.weight} kgs`}
              />
              <Tag
                icon={
                  <Icon
                    icon={"mynaui:ruler"}
                    className="text-[20px] text-accent"
                  />
                }
                value={`${data.height.feet}’${data.height.inches}’’`}
              />
              <Tag
                icon={
                  <Icon
                    icon={"majesticons:user-line"}
                    className="text-[20px] text-accent"
                  />
                }
                value={data.bodyType}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
