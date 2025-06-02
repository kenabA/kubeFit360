// src/system/init/AppInitializer.tsx
import { useEffect } from "react";

import useCheckNewUser from "@/system/features/authentication/useCheckNewUser";
import useUserStore from "../stores/user/useUserStore";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { TUserDetails } from "../stores/user/types";

export default function CheckNewUser() {
  // CHECK FOR MEMBERSHIP AS WELL HERE NAI
  const user = useAuthUser<TUserDetails>();

  if (!user) return;

  const { data, isPending } = useCheckNewUser();
  const setIsNewUser = useUserStore((state) => state.setIsNewUser);

  useEffect(() => {
    if (!isPending && typeof data?.passwordSet === "boolean") {
      setIsNewUser(!data.passwordSet);
    }
  }, [data, isPending]);

  return null;
}
