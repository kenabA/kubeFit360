import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import useGetWorkoutPlan from "./useGetWorkoutPlan";
import { cn } from "@/lib/utils";
import NoData from "@/system/components/no-data/NoData";

export default function ViewPlan({
  selectedId,

  isDialogOpen,
  setIsDialogOpen,
}: {
  selectedId: string;
  isDialogOpen: boolean;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { data } = useGetWorkoutPlan({
    selectedId: selectedId,
  });

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(value) => {
        setIsDialogOpen(value);
      }}
    >
      {}
      <DialogTitle className="hidden"></DialogTitle>
      <DialogDescription className="hidden"></DialogDescription>

      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className={cn(
          "!rounded-2xl max-w-[740px] max-h-[550px] overflow-hidden overflow-y-auto custom-scrollbar border-none p-4 outline-none md:min-w-[500px] w-fit"
        )}
      >
        {data?.workoutPlan ? (
          <div
            className="client-workout-plan break-words"
            dangerouslySetInnerHTML={{
              __html: data?.workoutPlan || "",
            }}
          />
        ) : (
          <div className="flex justify-center size-full items-center text-gray-tertiary">
            <NoData
              title="No Workout Plan!"
              description={`Client might have deleted the workout plan or a new workout plan has been generated for the same user`}
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
