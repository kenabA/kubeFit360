import { TOptions } from "@/system/lib/data";
import useTrainers from "../../users/trainers/useTrainer";

function useFetchTrainers() {
  const {
    data: { data: trainers },
    isPending: isTrainersPending,
  } = useTrainers();

  const trainerOptions: TOptions<string>[] = trainers.map((trainer) => {
    return { label: trainer.name, value: trainer._id };
  });

  return { trainerOptions, isTrainersPending };
}

export default useFetchTrainers;
