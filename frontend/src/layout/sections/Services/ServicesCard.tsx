import { Button } from "@/components/ui/button";
import { TServicesData } from "./type";
import { ArrowRight } from "lucide-react";
import { Link } from "react-scroll";

export default function ServicesCard({ data }: { data: TServicesData }) {
  const { icon, title, description } = data;

  return (
    <div className="bg-white group py-12 px-8 rounded-[18px] shadow-elevation relative">
      <div className="space-y-6 mb-[58px]">
        <p className="para-lg font-semibold capitalize">{title}</p>
        <p className="para-sm">{description}</p>
      </div>
      <Button variant={"accentUnderline"} className="rounded-none p-0">
        <Link
          to="cta"
          smooth={true}
          duration={500}
          className="flex items-center gap-1"
        >
          get service <ArrowRight strokeWidth={3} />
        </Link>
      </Button>
      <div className="absolute transition-all group-hover:-top-1 left-8 top-0 -translate-y-1/2 bg-secondary size-[60px] rounded-3xl p-2">
        <div className="bg-primary size-full rounded-2xl flex items-center justify-center">
          <img src={icon} alt="An icon featuring each service." />
        </div>
      </div>
    </div>
  );
}
