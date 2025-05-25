// src/system/init/AppInitializer.tsx
import { useEffect } from "react";

import useCheckNewUser from "@/system/features/authentication/useCheckNewUser";
import useUserStore from "../stores/user/useUserStore";

export default function CheckNewUser() {
  // CHECK FOR MEMBERSHIP AS WELL HERE NAI

  const { data, isPending } = useCheckNewUser();
  const setIsNewUser = useUserStore((state) => state.setIsNewUser);

  useEffect(() => {
    if (!isPending && typeof data?.passwordSet === "boolean") {
      setIsNewUser(!data.passwordSet);
    }
  }, [data, isPending]);

  return null;
}
