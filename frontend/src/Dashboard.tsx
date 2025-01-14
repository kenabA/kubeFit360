import { Heading } from "@/components/heading/Heading";
import {
  Sidebar,
  Topbar,
  Block,
  Calendar,
  Piechart,
} from "@/system/components/index";

export default function Dashboard() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-1 flex-col h-dvh overflow-hidden">
        <Topbar />
        <section className="rounded-tl-xl overflow-y-auto  w-full flex-1 bg-zinc-50 py-7 px-6">
          <Heading variant={"quaternary"}>Dashboard</Heading>
          <div className=" overflow-y-auto h-full grid grid-cols-3 grid-rows-[auto,1fr,1fr] gap-6 mt-6">
            <Block
              type={"numeric"}
              theme={"success"}
              data={32}
              icon="lucide:package"
              title="available equipments"
              total={42}
            />
            <Block
              type={"numeric"}
              theme={"error"}
              data={32}
              icon="lucide:package"
              title="unavailable equipments"
              total={42}
            />
            <Block
              type={"numeric"}
              theme={"warn"}
              data={32}
              icon="lucide:package"
              title="under maintenance"
              total={42}
            />
            <Calendar />
            <div className="bg-secondary col-span-2 h-full row-span-2">asd</div>
            <Block
              type={"figure"}
              theme={"warn"}
              data={32}
              icon="lucide:package"
              title="equipments visualization"
              total={42}
            >
              <Piechart />
            </Block>
          </div>
        </section>
      </div>
    </div>
  );
}
