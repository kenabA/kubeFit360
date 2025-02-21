import { cn } from "@/lib/utils";
import Tag from "@/system/components/tag/Tag";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function ({ classname }: { classname?: string }) {
  const data = null;
  return (
    <div
      className={cn("bg-white shadow-general p-6 !rounded-[12px]", classname)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-start gap-3">
          <figure className="size-16 border-[1px] border-primary rounded-full items-center justify-center flex overflow-hidden">
            {/* {data?.userImage ? ( */}
            {/* {true ? ( */}
            {/* <img */}
            {/* //     src={"data?.userImage"}
            //     alt="Image of the user"
            //     className="size-full object-cover object-center"
            //   />
            // ) : ( */}
            <div className="bg-tertiary size-full text-primary font-bold text-2xl text-center items-center justify-center flex">
              {/* {data.name?.split(" ")[0][0] ?? "--"} */}J
            </div>
            {/* } */}
          </figure>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-0">
              <span className="font-semibold text-lg text-gray-secondary">
                {/* {data?.name} */}
                John Doe
              </span>
              <span className="text-sm text-gray-secondary capitalize">
                {/* {data?.role ?? "Member"} */}
                28 years old / Male
              </span>
            </div>
            <div className="flex gap-2 items-center justify-start">
              <Tag
                value="Intermediate"
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
                value="75 kgs"
              />
              <Tag
                icon={
                  <Icon
                    icon={"mynaui:ruler"}
                    className="text-[20px] text-accent"
                  />
                }
                value="6'0"
              />
              <Tag
                icon={
                  <Icon
                    icon={"majesticons:user-line"}
                    className="text-[20px] text-accent"
                  />
                }
                value="Mesomorph"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
