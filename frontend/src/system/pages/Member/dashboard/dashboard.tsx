import { Heading } from "@/components/heading/Heading";
import { Badge } from "@/components/ui/badge";

import { Block } from "@/system/components";
import { TClientDetails } from "@/system/stores/user/types";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import InfoBar from "./info-bar";
import { Button } from "@/components";
import useGetWorkoutPlanByMemberId from "@/system/features/workout-plan/useGetWorkoutPlanByMemberId";
import Spinner from "@/system/components/spinner/Spinner";
import { Plus } from "lucide-react";

import { useNavigate } from "react-router";
import { cn, formatTime } from "@/lib/utils";
import ViewPlan from "@/system/features/workout-plan/ViewPlan";
import { useState } from "react";
import { AnimatedQuote } from "@/system/components/animated-quote/animated-quote";
import { RadialChart } from "@/system/components/radial-chart/radial-chart";
import useGetClientDashboardStats from "@/system/features/users/members/useGetClientDashboardStats";

export default function MemberDashboard() {
  const navigate = useNavigate();
  const user = useAuthUser<TClientDetails>();
  const [openViewPlan, setOpenViewPlan] = useState<boolean>(false);
  const { isPending, isSuccess, data } = useGetWorkoutPlanByMemberId({
    selectedId: user?._id ?? "",
  });
  const { data: clientData } = useGetClientDashboardStats();

  if (isPending) {
    return <Spinner />;
  }

  const status = isSuccess ? "active" : "inactive";

  return (
    <section className="rounded-tl-xl overflow-y-auto custom-scrollbar flex-1">
      <div className="py-7 px-6">
        <Heading level={4} variant={"quaternary"}>
          Dashboard
        </Heading>
        <div className="grid grid-cols-2 grid-rows-[auto] gap-6 mt-6 ">
          <div className="space-y-6">
            <Block
              className="col-span-full md:col-[1/2] lg:col-[1/2] h-fit"
              type={"qualitative"}
              theme={user?.membershipType === "basic" ? "info" : "warn"}
              data={
                <span
                  className={cn(
                    "uppercase font-semibold",
                    user?.membershipType === "basic" ? "text-info" : "text-warn"
                  )}
                >
                  {user?.membershipType}
                </span>
              }
              icon="material-symbols:card-membership-outline"
              title="membership type"
            />
            <Block
              className="col-span-full md:col-[2/-1] flex flex-col gap-4 h-fit"
              type={"custom"}
              status={<Badge variant={status}>{status}</Badge>}
              data={
                <span className="text-info uppercase  font-semibold">
                  {user?.membershipType}
                </span>
              }
              title="workout plan"
            >
              {isSuccess ? (
                <>
                  <div className="space-y-2">
                    <InfoBar
                      icon="mdi:teach-poll"
                      label="Trainer"
                      value={data?.request.trainer.name || "Professional"}
                    />
                    <InfoBar
                      icon="mingcute:time-fill"
                      label="Created At"
                      value={formatTime(data?.createdAt || "")}
                    />
                  </div>
                  <Button
                    variant={"primaryReverse"}
                    className="font-medium"
                    onClick={() => setOpenViewPlan(true)}
                  >
                    View Plan
                  </Button>
                </>
              ) : (
                <>
                  <span className="italic text-gray-secondary">
                    No workout plan has been created yet.
                  </span>
                  <Button
                    variant={"primary"}
                    className="font-medium"
                    onClick={() => navigate("/workoutPlan/member")}
                  >
                    <Plus className="stroke-[3px]" /> Request Workout Plan
                  </Button>
                </>
              )}
            </Block>
            <div
              className={`${cn(
                " bg-white h-fit shadow-general border-slate-100 border py-3 px-6 rounded-2xl"
              )}`}
            >
              <AnimatedQuote />
            </div>
          </div>
          <Block type="figure" icon="lucide:package" title="Members Status">
            <RadialChart
              daysCompleted={clientData?.data.daysCompleted}
              daysLeft={clientData?.data.daysLeft}
              totalDays={clientData?.data.totalDays}
            />
          </Block>
        </div>
      </div>
      <ViewPlan
        selectedId={data?._id || ""}
        isDialogOpen={openViewPlan}
        setIsDialogOpen={setOpenViewPlan}
      />
    </section>
  );
}
