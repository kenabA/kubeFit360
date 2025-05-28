import { Heading } from "@/components/heading/Heading";
import { MembershipCards } from "./membership-cards/MembershipCards";

export default function Membership() {
  return (
    <section id="membership" className="uni-container py-12 space-y-[74px]">
      <div className="space-y-[18px]">
        <Heading
          level={2}
          variant={"secondary"}
          className="text-center text-primary"
        >
          memberships
        </Heading>
        <p className="subtitle text-center">
          Tailored membership plans to match your fitness aspirations.
        </p>
      </div>
      <MembershipCards
        variant="website"
        selectedMembership=""
        onSelect={() => {}}
      />
    </section>
  );
}
