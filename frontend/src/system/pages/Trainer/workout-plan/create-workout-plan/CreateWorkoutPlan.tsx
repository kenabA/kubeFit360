import { Heading } from "@/components/heading/Heading";
import UserProfileCard from "./UserProfileCard";
import AdditionalUserInfo from "./AdditionalUserInfo";
import WorkoutPlanEditor from "./WorkoutPlanEditor";
import { motion } from "framer-motion";

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
  return (
    <section className="rounded-tl-xl overflow-y-auto custom-scrollbar flex-1">
      <div className="py-7 px-6">
        <Heading level={4} variant={"quaternary"} className="mb-4">
          Create Workout Plan | Refactor
        </Heading>
        <motion.div
          className="grid grid-cols-[2fr,1fr] gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="col-span-full">
            <UserProfileCard classname="col-span-full rounded-[8px]" />
          </motion.div>
          <motion.div variants={itemVariants}>
            <WorkoutPlanEditor />
          </motion.div>
          <motion.div variants={itemVariants}>
            <AdditionalUserInfo />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
