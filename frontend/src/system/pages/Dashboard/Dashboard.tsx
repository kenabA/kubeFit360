import { Heading } from "@/components/heading/Heading";
import { Block, Piechart } from "@/system/components/index";
import RecentActivities from "../../components/tables/recentActivities/RecentActivities";
import useEquipments from "@/system/features/equipments/useEquipments";

export default function Dashboard() {
  const {
    equipmentsData: { count },
    isError,
  } = useEquipments();

  if (isError) {
    return <p className="text-destructive">Error Occurred</p>;
  }

  return (
    <section className="rounded-tl-xl overflow-y-auto custom-scrollbar flex-1">
      <div className="py-7 px-6">
        <Heading level={4} variant={"quaternary"}>
          Dashboard
        </Heading>
        <div className="h-full grid grid-cols-3 grid-rows-[auto,1fr,1fr] gap-6 mt-6">
          <Block
            type={"numeric"}
            theme={"success"}
            data={32}
            icon="lucide:package"
            title="available equipments"
            total={count || 32}
          />
          <Block
            type={"numeric"}
            theme={"error"}
            data={32}
            icon="lucide:package"
            title="unavailable equipments"
            total={count || 32}
          />
          <Block
            type={"numeric"}
            theme={"warn"}
            data={32}
            icon="lucide:package"
            title="under maintenance"
            total={count || 32}
          />
          <div className="relative overflow-hidden shadow-general">
            <div className="bg-primary absolute  -top-40 w-full h-48 rounded-full filter blur-lg opacity-[0.1]"></div>
            <Block type={"calendar"} />
          </div>
          <Block
            type={"table"}
            title="recent activities"
            icon="lucide:package"
            className="bg-white shadow-general border col-span-2 h-full row-span-2 rounded-xl"
          >
            <RecentActivities />
          </Block>
          <Block
            type={"figure"}
            icon="lucide:package"
            title="equipments visualization"
          >
            <Piechart count={count} />
          </Block>
        </div>
      </div>
    </section>
  );
}
