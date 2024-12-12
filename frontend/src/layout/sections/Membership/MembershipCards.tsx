import useHandleNavigate from "@/hooks/useHandleNavigate";
import { Heading } from "@/layout/components/Heading";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export function MembershipCards() {
  const handleNavigate = useHandleNavigate();
  return (
    <div className=" md:bg-white rounded-3xl md:shadow-elevation md:p-6 flex gap-12 flex-col md:flex-row">
      <div className="flex-1 p-12 rounded-[18px] bg-white shadow-lg md:bg-none md:shadow-none">
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
              className="text-gray text-center mb-[18px]"
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
          <Button
            onClick={() => handleNavigate("/signup")}
            className="w-full py-3"
            variant={"accentReverse"}
          >
            get started
          </Button>
        </div>
      </div>
      <div className="flex-1 rounded-[18px] p-12 bg-tertiary shadow-lg md:shadow-none">
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
              className="text-gray text-center mb-[18px]"
            >
              rs. 6,000
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
          <Button
            onClick={() => handleNavigate("/signup")}
            className="w-full py-3 hover:shadow-none"
          >
            get started
          </Button>
        </div>
      </div>
    </div>
  );
}
