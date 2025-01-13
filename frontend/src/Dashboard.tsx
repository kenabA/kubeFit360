import { Heading } from "@/components/heading/Heading";
import Sidebar from "@/system/components/sidebar/Sidebar";
import Topbar from "@/system/components/topbar/Topbar";
import Block from "@/system/components/block/Block";
import Calendar from "@/system/components/calendar/Calendar";

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
              theme={"info"}
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
              title="available equipments"
              total={42}
            />
            <Calendar />
            <div className="bg-secondary col-span-2 h-full row-span-2">asd</div>
            <Calendar />
          </div>
        </section>
      </div>
    </div>
  );
}
