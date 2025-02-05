import useUserStore from "@/system/stores/user/useUserStore";

export default function Topbar() {
  const userName = useUserStore((state) => state.user?.name);
  console.log(userName);
  return (
    <div className="px-6 py-3 bg-white z-20 shadow-general">
      <div className="flex gap-3 items-center">
        <figure className="bg-[#d9d9d9] size-[34px] rounded-full"></figure>
        <div className="flex flex-col">
          <p className="text-gray-tertiary text-sm">
            Welcome,{" "}
            <span className="text-primary font-bold">
              {" "}
              {userName || "User"}
            </span>
          </p>
          <span className="text-gray-tertiary text-xs">Maintainer</span>
        </div>
      </div>
    </div>
  );
}
