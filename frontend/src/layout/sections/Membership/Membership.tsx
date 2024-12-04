import { Button } from "@/components/ui/button";
import { Heading } from "@/layout/components/Heading";
import { Check } from "lucide-react";

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
      <div className="bg-white rounded-3xl shadow-elevation p-6 flex gap-12 flex-col md:flex-row">
        <div className="flex-1 p-12 rounded-[18px]">
          <div className="space-y-12">
            <div>
              <Heading
                variant={"quinary"}
                level={5}
                className="text-center capitalize text-accent
      mb-6"
              >
                basic
              </Heading>
              <Heading
                variant={"tertiary"}
                level={3}
                className="text-gray-primary text-center mb-[18px]"
              >
                rs. 2,500
              </Heading>
              <p className="text-center para-large text-gray-tertiary">
                per month. That's just Rs. 85 per session!
              </p>
            </div>
            <div className="flex gap-[24px] flex-col items-start">
              <div className="flex items-center gap-[18px]">
                <Check className="stroke-accent" />
                <p className="para-lg capitalize text-gray-secondary">locker</p>
              </div>
              <div className="flex items-center gap-[18px]">
                <Check className="stroke-accent" />
                <p className="para-lg capitalize text-gray-secondary">shower</p>
              </div>
              <div className="flex items-center gap-[18px]">
                <Check className="stroke-accent" />
                <p className="para-lg capitalize text-gray-secondary">
                  steam sauna
                </p>
              </div>
            </div>
            <Button className="w-full py-3" variant={"accentReverse"}>
              get started
            </Button>
          </div>
        </div>
        <div className="flex-1 rounded-[18px] p-12 bg-tertiary">
          <div className="space-y-12">
            <div>
              <Heading
                variant={"quinary"}
                level={5}
                className="text-center capitalize text-primary
      mb-6"
              >
                enterprise
              </Heading>
              <Heading
                variant={"tertiary"}
                level={3}
                className="text-gray-primary text-center mb-[18px]"
              >
                rs. 2,500
              </Heading>
              <p className="text-center para-large text-gray-tertiary">
                per 3 month. That's just Rs. 2000 per session!
              </p>
            </div>
            <div className="flex gap-[24px] flex-col items-start">
              <div className="flex items-center gap-[18px]">
                <Check className="stroke-primary" />
                <p className="para-lg capitalize text-gray-secondary">locker</p>
              </div>
              <div className="flex items-center gap-[18px]">
                <Check className="stroke-primary" />
                <p className="para-lg capitalize text-gray-secondary">shower</p>
              </div>
              <div className="flex items-center gap-[18px]">
                <Check className="stroke-primary" />
                <p className="para-lg capitalize text-gray-secondary">
                  steam sauna
                </p>
              </div>
            </div>
            <Button className="w-full py-3 hover:shadow-none">
              get started
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
