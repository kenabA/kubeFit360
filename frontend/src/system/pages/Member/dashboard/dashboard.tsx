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
import AnimatedBorderWrapper from "@/system/components/animated-border/animated-border";
import { WeightProgressChart } from "@/system/components/areachart/areachart-interactive";

import useFormattedWeightData from "@/system/features/weights/useFormattedWeightData";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function MemberDashboard() {
  const navigate = useNavigate();
  const [selectedRange, setSelectedRange] = useState<string>("90d");
  const user = useAuthUser<TClientDetails>();
  const [openViewPlan, setOpenViewPlan] = useState<boolean>(false);
  const { isPending, isSuccess, data } = useGetWorkoutPlanByMemberId({
    selectedId: user?._id ?? "",
  });
  const { formattedWeightsData } = useFormattedWeightData(selectedRange);

  const { data: clientData } = useGetClientDashboardStats();

  const status = isSuccess ? "active" : "inactive";

  const membershipBlock = (
    <Block
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
  );

  if (isPending) return <Spinner />;

  return (
    <section className="rounded-tl-xl overflow-y-auto custom-scrollbar flex-1">
      <div className="py-7 px-6">
        <Heading level={4} variant={"quaternary"}>
          Dashboard
        </Heading>
        <div className="h-full grid grid-cols-2 lg:grid-cols-3 lg:grid-rows-[auto,1fr] gap-6 mt-6 ">
          <div className="col-span-full md:col-[1/3] h-full grid grid-cols-2 grid-rows-[auto,1fr] gap-6">
            {user?.membershipType === "basic" ? (
              <div className="h-fit w-full col-span-full md:col-[1/2] lg:col-[1/2]">
                {membershipBlock}
              </div>
            ) : (
              <AnimatedBorderWrapper className="h-fit w-full col-[1/2]">
                {membershipBlock}
              </AnimatedBorderWrapper>
            )}
            <Block
              className="col-[2/4] h-fit flex flex-col gap-3"
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
                "bg-white h-full shadow-general border-slate-100 py-3 px-6 rounded-2xl col-[1/4]"
              )}`}
            >
              <AnimatedQuote />
            </div>
          </div>
          <Block
            type="figure"
            icon="lucide:package"
            title="Members Status"
            className="col-span-full lg:col-[3/-1] h-fit"
          >
            <RadialChart
              daysCompleted={clientData?.data.daysCompleted}
              daysLeft={clientData?.data.daysLeft}
              totalDays={clientData?.data.totalDays}
            />
          </Block>
          <div className="relative overflow-hidden shadow-general col-[1/2]">
            <div className="bg-primary absolute  -top-40 w-full h-48 rounded-full filter blur-lg opacity-[0.1]"></div>
            <Block type={"calendar"} />
          </div>

          <Block
            select={
              <Select
                value={selectedRange}
                onValueChange={(val) => {
                  if (val !== selectedRange) setSelectedRange(val);
                }}
              >
                <SelectTrigger className="w-[160px] rounded-lg sm:ml-auto">
                  <SelectValue placeholder="Select time range" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="90d" className="rounded-lg">
                    Last 3 months
                  </SelectItem>
                  <SelectItem value="30d" className="rounded-lg">
                    Last 30 days
                  </SelectItem>
                  <SelectItem value="7d" className="rounded-lg">
                    Last 7 days
                  </SelectItem>
                </SelectContent>
              </Select>
            }
            className="w-full col-[2/-1]"
            type="figure"
            theme="warn"
            icon="lucide:package"
            title="Progress (Weight)"
          >
            <WeightProgressChart
              data={formattedWeightsData || []}
              selectedRange={selectedRange}
              setSelectedRange={setSelectedRange}
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
