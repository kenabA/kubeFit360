import { Heading } from "@/layout/components/Heading";
import { MembershipCards } from "./MembershipCards";

export default function Membership({
  variant,
}: {
  variant: "website" | "webapp";
}) {
  console.log(variant);

  return (
    <section
      id="membership"
      className="px-5 md:max-w-[90%] md:mx-auto py-12 space-y-[74px]"
    >
      <div className="space-y-[18px]">
        <Heading
          level={2}
          variant={"secondary"}
          className="text-center text-primary"
        >
          memberships
        </Heading>
        <p className="subtitle text-center">
          Experience seamless living with our product, designed for effortless
          convenience.
        </p>
      </div>
      <MembershipCards />
    </section>
  );
}
