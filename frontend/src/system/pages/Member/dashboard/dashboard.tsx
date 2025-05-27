import { Heading } from "@/components/heading/Heading";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Block } from "@/system/components";
import { TClientDetails } from "@/system/stores/user/types";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import InfoBar from "./info-bar";
import { Button } from "@/components";
import useGetWorkoutPlanByMemberId from "@/system/features/workout-plan/useGetWorkoutPlanByMemberId";
import Spinner from "@/system/components/spinner/spinner";
import { Plus } from "lucide-react";

import { useNavigate } from "react-router";
import { cn, dynamicContainerVariants } from "@/lib/utils";
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
import { formatTime } from "@/lib/utils";
import NoData from "@/system/components/no-data/NoData";

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
      <div className="py-7 px-6 flex-1 flex flex-col ">
        <motion.div
          variants={dynamicContainerVariants(0)}
          initial="hidden"
          animate="visible"
        >
          <Heading level={4} variant={"quaternary"}>
            Dashboard
          </Heading>
        </motion.div>

        <div className="h-full grid grid-cols-2 lg:grid-cols-3 lg:grid-rows-[auto,1fr] gap-6 mt-6">
          <div className="col-span-full md:col-[1/3] h-full grid grid-cols-2 grid-rows-[auto,1fr] gap-y-6 sm:gap-6">
            {clientData ? (
              <>
                {user?.membershipType === "basic" ? (
                  <motion.div
                    variants={dynamicContainerVariants(0)}
                    initial="hidden"
                    animate="visible"
                    className="md:col-[1/2] lg:col-[1/2] h-fit w-full col-span-full sm:col-[1/2]"
                  >
                    {membershipBlock}
                  </motion.div>
                ) : (
                  <AnimatedBorderWrapper className="h-fit w-full col-span-full sm:col-[1/2]">
                    {membershipBlock}
                  </AnimatedBorderWrapper>
                )}
              </>
            ) : (
              <NoData
                className="bg-white"
                title="No Membership Data"
                description="Membership Data is not available at the moment"
              />
            )}

            <motion.div
              variants={dynamicContainerVariants(1)}
              initial="hidden"
              animate="visible"
              className="col-span-full sm:col-[2/4] h-fit flex flex-col gap-3"
            >
              <Block
                className="flex flex-col gap-3"
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
                    <div className="space-y-2 overflow-x-auto custom-scrollbar">
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
            </motion.div>
            <motion.div
              variants={dynamicContainerVariants(2)}
              initial="hidden"
              animate="visible"
              className={`${cn(
                "bg-white h-full shadow-general border-slate-100 py-3 px-6 rounded-2xl col-[1/4]"
              )}`}
            >
              <AnimatedQuote />
            </motion.div>
          </div>
          <motion.div
            variants={dynamicContainerVariants(3)}
            initial="hidden"
            animate="visible"
            className="col-span-full sm:col-[2/3] lg:col-[3/-1] h-fit"
          >
            <Block
              type="figure"
              icon="lucide:package"
              title="Members Status"
              className=""
            >
              <RadialChart
                daysCompleted={clientData?.data.daysCompleted || 0}
                daysLeft={clientData?.data.daysLeft || 0}
                totalDays={clientData?.data.totalDays || 0}
              />
            </Block>
          </motion.div>
          <motion.div
            variants={dynamicContainerVariants(4)}
            initial="hidden"
            animate="visible"
            className="h-full relative overflow-hidden shadow-general row-[4/5] sm:row-[2/3] lg:row-[2/-1] col-span-full sm:col-[1/2]"
          >
            <div className="bg-primary absolute  -top-40 w-full h-48 rounded-full filter blur-lg opacity-[0.1]"></div>
            <Block type={"calendar"} />
          </motion.div>
          <motion.div
            variants={dynamicContainerVariants(5)}
            className="w-full row-[3/4] lg:row-[2/-1] lg:col-[2/-1] col-[1/-1]"
            initial="hidden"
            animate="visible"
          >
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
              className="w-full"
              type="figure"
              theme="warn"
              icon="lucide:package"
              title="Weightrack"
            >
              <WeightProgressChart
                data={formattedWeightsData || []}
                selectedRange={selectedRange}
                setSelectedRange={setSelectedRange}
              />
            </Block>
          </motion.div>
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
