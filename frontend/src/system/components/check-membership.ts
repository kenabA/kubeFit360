import { useEffect } from "react";
import useUserStore from "../stores/user/useUserStore";
import useCheckMembership from "../features/authentication/useCheckMembership";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { TUserDetails } from "../stores/user/types";

const CheckMembership = () => {
  const { data, isPending } = useCheckMembership();
  const user = useAuthUser<TUserDetails>();

  const setSubscriptionStatus = useUserStore(
    (state) => state.setSubscriptionExpired
  );

  if (user?.role !== "member") {
    return null;
  }

  console.log(data);

  useEffect(() => {
    if (!isPending && typeof data?.membershipExpired === "boolean") {
      setSubscriptionStatus(data.membershipExpired);
    }
  }, [data, isPending]);
  return null;
};

export default CheckMembership;
