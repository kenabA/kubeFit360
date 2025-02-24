import { Heading } from "@/components/heading/Heading";
import UserProfileCard from "./UserProfileCard";
import Loading from "@/components/loading/Loading";
import AdditionalUserInfo from "./AdditionalUserInfo";
import WorkoutPlanEditor from "./WorkoutPlanEditor";
import { motion } from "framer-motion";
import useGetWorkoutRequest from "@/system/features/workout-plan-requests/useGetWorkoutRequest";
import { useParams } from "react-router";
import Error from "@/components/error/Error";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
    },
  },
};

export default function CreateWorkoutPlan() {
  const { id } = useParams(); // Extracts the ID from the URL

  const { data: workoutRequest, error } = useGetWorkoutRequest({
    selectedId: id || "",
    enabled: !!id,
  });
  if (!workoutRequest) {
    return <Loading />;
  }

  if (error) {
    return <Error error={error} />;
  }

  return (
    <section className="rounded-tl-xl overflow-y-auto custom-scrollbar flex-1">
      <div className="py-7 px-6">
        <Heading level={4} variant={"quaternary"} className="mb-4">
          Create Workout Plan | Refactor
        </Heading>
        <motion.div
          className="grid grid-cols-[2fr,1fr]  gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="col-span-full">
            <UserProfileCard
              data={workoutRequest}
              classname="col-span-full rounded-[8px]"
            />
          </motion.div>
          <motion.div
            variants={itemVariants}
            className="lg:col-[1/2] col-span-full row-2 bg-white"
          >
            <WorkoutPlanEditor />
          </motion.div>
          <motion.div
            variants={itemVariants}
            className="col-span-full lg:col-[2/3] "
          >
            <AdditionalUserInfo data={workoutRequest} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
