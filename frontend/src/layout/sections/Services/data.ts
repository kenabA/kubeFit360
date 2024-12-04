import { TServicesData } from "./type";
import fitnessCenter from "@/assets/svg/Services/fitnessCenter.svg";
import memberPortal from "@/assets/svg/Services/memberPortal.svg";
import cardioZone from "@/assets/svg/Services/cardioZone.svg";
import sauna from "@/assets/svg/Services/sauna.svg";
import steamSauna from "@/assets/svg/Services/steamSauna.svg";
import secureLocker from "@/assets/svg/Services/secureLocker.svg";

export const servicesData: TServicesData[] = [
  {
    icon: fitnessCenter,
    title: "Fitness Center",
    description:
      "Achieve your fitness goals with a fully equipped gym for all levels.",
  },
  {
    icon: memberPortal,
    title: "Member Portal",
    description:
      "Track your progress and manage your fitness journey effortlessly.",
  },
  {
    icon: cardioZone,
    title: "Cardio Zone",
    description: "Unwind and soothe your muscles in our traditional dry sauna.",
  },
  {
    icon: sauna,
    title: "Sauna",
    description: "Unwind and soothe your muscles in our traditional dry sauna.",
  },
  {
    icon: steamSauna,
    title: "Steam Sauna",
    description:
      "Relax and detoxify with our refreshing steam sauna experience.",
  },
  {
    icon: secureLocker,
    title: "Secure Lockers",
    description:
      "Secure your belongings in our spacious, convenient locker rooms.",
  },
];
