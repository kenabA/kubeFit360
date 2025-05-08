import { Heading } from "@/components/heading/Heading";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { membershipPlanDetails } from "./data";
import { cn } from "@/lib/utils";

export default function WebappMembershipCards({
  className,
  outerStyle,
  selectedMembership,
  onSelect,
}: {
  className: string;
  outerStyle: string;
  selectedMembership: string;
  onSelect: (value: string) => void;
}) {
  function handleSelect(title: string) {
    if (selectedMembership === title) {
      onSelect("");
      return;
    }
    onSelect(title);
  }

  return (
    <div className={cn("flex gap-8 flex-col md:flex-row w-full", outerStyle)}>
      {membershipPlanDetails.map((data) => {
        const textColor =
          data.theme === "primary" ? "text-primary" : "text-accent";
        const buttonVariation =
          data.theme === "primary" ? "primaryReverse" : "accentReverse";
        const border =
          data.theme === "primary"
            ? "border-2 !border-primary"
            : "border-2 !border-accent";
        const buttonText =
          selectedMembership === data.title ? "Selected" : "Select";
        return (
          <div
            key={data.title}
            className={cn(
              `flex-1 transition-all px-12 py-8 rounded-[18px] bg-white border-2 border-transparent shadow-lg flex flex-col gap-8 ${
                selectedMembership === data.title && border
              }`,
              className
            )}
          >
            <div>
              <p
                className={`${cn(
                  "para-subtitle font-semibold  text-center mb-3",
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
                <div key={feature} className="flex items-center gap-[18px]">
                  <Check className={textColor} size={24} />
                  <p className="para-xl capitalize text-gray-secondary">
                    {feature}
                  </p>
                </div>
              ))}
            </div>
            <Button
              type="button"
              onClick={() => handleSelect(data.title)}
              className="w-full py-3 mt-auto"
              variant={buttonVariation}
            >
              {buttonText}
            </Button>
          </div>
        );
      })}
    </div>
  );
}
