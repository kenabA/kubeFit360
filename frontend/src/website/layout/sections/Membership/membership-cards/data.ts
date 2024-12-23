// Define the type for a plan
export type TMembershipPlanDetails = {
  title: string;
  price: number;
  description: string;
  features: string[];
  buttonText: string;
  theme: "accent" | "primary";
};

export const membershipPlanDetails: TMembershipPlanDetails[] = [
  {
    title: "BASIC",
    price: 2500,
    description: "per month. Just Rs. 85 per session!",
    features: ["Locker", "Shower", "Steam Sauna"],
    buttonText: "Select",
    theme: "accent",
  },
  {
    title: "ENTERPRISE",
    price: 6000,
    description: "per 3 month. Just Rs. 2000 per session!",
    features: ["Locker", "Shower", "Steam Sauna", "Save Rs. 1500"],
    buttonText: "Select",
    theme: "primary",
  },
];
