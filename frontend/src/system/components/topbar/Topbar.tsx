import { TUserDetails } from "@/system/stores/user/types";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

export default function Topbar() {
  const auth = useAuthUser<TUserDetails>();

  return (
    <div className="px-6 py-3 bg-white z-20 shadow-general">
      <div className="flex gap-3 items-center">
        <figure className="bg-[#d9d9d9] size-[34px] rounded-full overflow-hidden shadow-userPanel border-2 border-secondary">
          {auth?.userImage ? (
            <img
              src={auth?.userImage}
              className="size-full object-center object-cover"
              alt="User's Photo"
            />
          ) : (
            <div className="bg-tertiary text-primary-hover font-bold text-md size-full flex items-center justify-center">
              {auth?.name[0].toLocaleUpperCase()}
            </div>
          )}
        </figure>
        <div className="flex flex-col">
          <p className="text-gray-tertiary text-sm">
            Welcome,{" "}
            <span className="text-primary font-bold">{auth?.name}</span>
          </p>
          <span className="text-gray-tertiary text-xs capitalize">
            {auth?.role}
          </span>
        </div>
      </div>
    </div>
  );
}
