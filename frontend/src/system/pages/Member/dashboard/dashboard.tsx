import { Heading } from "@/components/heading/Heading";

export default function MemberDashboard() {
  return (
    <section className="rounded-tl-xl overflow-y-auto custom-scrollbar flex-1">
      <div className="py-7 px-6">
        <Heading level={4} variant={"quaternary"}>
          Dashboard
        </Heading>
      </div>
    </section>
  );
}
