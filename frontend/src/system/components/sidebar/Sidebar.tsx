import kf from "@/assets/shared/svg/kubeFitLogo/kubeFit360°-logo-black.svg";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function Sidebar() {
  return (
    <div className="z-10 h-full flex flex-col p-3 pt-0 bg-white shadow-general">
      <figure className="py-[20px] border-slate-300 border-b flex items-center justify-center">
        <img src={kf} alt="kubeFit Logo" />
      </figure>
      <div className="flex-1 py-[14px] border-b flex flex-col items-center gap-[14px]">
        <button className="py-2 px-3 bg-primary rounded-[8px]">
          <Icon
            icon={"lucide:home"}
            className="text-[24px] w-full text-white"
          />
        </button>
        <button className="py-2 px-3">
          <Icon
            icon={"lucide:package"}
            className="text-[24px] w-full text-gray-tertiary"
          />
        </button>
        <button className="py-2 px-3">
          <Icon
            icon={"pepicons-pop:bulletin-notice"}
            className="text-[24px] w-full text-gray-tertiary"
          />
        </button>
        <button className="py-2 px-3">
          <Icon
            icon={"gravity-ui:gear"}
            className="text-[24px] w-full text-gray-tertiary"
          />
        </button>
      </div>
      <div className="pt-[14px]">
        <Icon
          icon={"material-symbols:logout-rounded"}
          className="text-[24px] w-full text-gray-tertiary rotate-180"
        />
      </div>
    </div>
  );
}
