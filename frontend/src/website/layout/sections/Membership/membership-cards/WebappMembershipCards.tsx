import { Heading } from "@/components/heading/Heading";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { membershipPlanDetails } from "./data";
import { cn } from "@/lib/utils";

export default function WebappMembershipCards() {
  return (
    <div className="flex gap-8 flex-col md:flex-row w-full">
      {membershipPlanDetails.map((data) => {
        const textColor =
          data.theme === "primary" ? "text-primary" : "text-accent";
        const buttonVariation =
          data.theme === "primary" ? "primaryReverse" : "accentReverse";
        return (
          <div
            key={data.title}
            className="flex-1 px-12 py-8 rounded-[18px] bg-white shadow-lg flex flex-col gap-8"
          >
            <div>
              <p
                className={`${cn(
                  "para-subtitle font-semibold  text-center uppercase mb-3",
                  textColor
                )}`}
              >
                {data.title}
              </p>
              <Heading
                variant={"quaternary"}
                level={4}
                className="font-bold text-gray text-center mb-[14px]"
              >
                Rs. {data.price}
              </Heading>
              <p className="text-center para-large text-gray-tertiary">
                {data.description}
              </p>
            </div>
            <div className="flex gap-[24px] flex-col items-start">
              {data.features.map((feature) => (
                <div className="flex items-center gap-[18px]">
                  <Check className={textColor} size={24} />
                  <p className="para-xl capitalize text-gray-secondary">
                    {feature}
                  </p>
                </div>
              ))}
            </div>

            <Button className="w-full py-3 mt-auto" variant={buttonVariation}>
              {data.buttonText}
            </Button>
          </div>
        );
      })}
    </div>
  );
}
