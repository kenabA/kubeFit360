import { Button } from "@/components";
import { Heading } from "@/components/heading/Heading";
import { Badge } from "@/components/ui/badge";
import MembershipInfoBar from "@/system/components/membership-info-bar/membership-info-bar";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Check, ChevronRight } from "lucide-react";

export type TMembershipInfo = {
  label: string;
  value: string | React.ReactElement;
  badge?: boolean;
};

const membershipOverview: TMembershipInfo[] = [
  {
    label: "client name",
    value: " kenab kushal k.c.",
  },
  {
    label: "membership type",
    value: <Badge variant={"gold"}>Premium</Badge>,
  },
  {
    label: "status",
    value: <Badge variant={"active"}>Active</Badge>,
  },
];

const membershipDates: TMembershipInfo[] = [
  {
    label: "start date",
    value: " January 15, 2025",
  },
  {
    label: "expiration date",
    value: "July 15, 2025",
  },
];

const paymentDetails: TMembershipInfo[] = [
  {
    label: "next payment due",
    value: " January 15, 2025",
  },
  {
    label: "days until expiration",
    value: "3 Days",
  },
];

export default function ClientMembership() {
  return (
    <section className="rounded-tl-xl h-[calc(100dvh-60px)] overflow-hidden">
      <div className="py-7 px-6 flex-1 flex flex-col gap-4 h-full">
        <Heading level={4} variant={"quaternary"}>
          Membership Details
        </Heading>
        <div className="rounded-xl  flex flex-col gap-6 h-full overflow-y-auto custom-scrollbar">
          <MembershipInfoBar
            title={"your membership overview"}
            data={membershipOverview}
          />
          <MembershipInfoBar
            title={"membership details"}
            data={membershipDates}
          />
          <MembershipInfoBar
            title={"payment details"}
            data={paymentDetails}
            footer={
              <div className="w-full bg-success-light flex gap-2 rounded-lg overflow-hidden">
                <div className="bg-success h-full w-[6px]"></div>
                <div className="p-3 flex items-center gap-1">
                  <Icon
                    icon={"icon-park-solid:check-one"}
                    className="text-success text-sm size-4"
                  />
                  <p className="text-success text-sm">
                    Your membership is active and in good standing. No action is
                    needed at this time. Enjoy the service!
                  </p>
                </div>
              </div>
            }
          />
          <div className="bg-white p-5 shadow-general rounded-xl flex gap-3 flex-col">
            <Heading
              level={6}
              variant={"senary"}
              className="text-gray-tertiary text-[18px] font-medium capitalize"
            >
              Extend Membership
            </Heading>
            <p className="font-normal text-[14px] text-[#848484]">
              Increase your membership plan to continue enjoying our premium
              services.
            </p>
            <Button className="w-fit font-semibold">
              Extend Membership <ChevronRight className="stroke-[3]" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
