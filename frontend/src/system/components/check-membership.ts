import { useEffect } from "react";
import useUserStore from "../stores/user/useUserStore";
import useCheckMembership from "../features/authentication/useCheckMembership";

const CheckMembership = () => {
  const setSubscriptionStatus = useUserStore(
    (state) => state.setSubscriptionStatus
  );

  const { data, isPending } = useCheckMembership();

  useEffect(() => {
    console.log(data?.membershipExpired);
    if (!isPending && typeof data?.membershipExpired === "boolean") {
      setSubscriptionStatus(data.membershipExpired);
    }
  }, [data, isPending]);

  return null;
};

export default CheckMembership;
