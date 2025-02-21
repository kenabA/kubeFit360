import { TUserDetails } from "@/system/stores/user/types";
import Status from "../status/Status";

export default function UserProfileCard({
  data,
  workoutRequestStatus,
}: {
  data: TUserDetails;
  workoutRequestStatus: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <figure className="size-16 border-[1px] border-primary rounded-full items-center justify-center flex overflow-hidden">
          {data.userImage ? (
            <img
              src={data?.userImage}
              alt="Image of the user"
              className="size-full object-cover object-center"
            />
          ) : (
            <div className="bg-tertiary size-full text-primary font-bold text-2xl text-center items-center justify-center flex">
              {data.name?.split(" ")[0][0] ?? "--"}
            </div>
          )}
        </figure>
        <div className="flex flex-col gap-0">
          <span className="font-semibold text-md text-primary-hover">
            {data?.name}
          </span>
          <span className="text-xs text-gray-secondary capitalize">
            {data?.role ?? "Member"}
          </span>
        </div>
      </div>

      {workoutRequestStatus && <Status status={workoutRequestStatus} />}
    </div>
  );
}
