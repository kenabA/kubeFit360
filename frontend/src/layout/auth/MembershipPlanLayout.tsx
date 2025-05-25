import ExtendClientMembership from "@/system/features/client-membership/extend-client-membership";
import { TClientDetails } from "@/system/stores/user/types";
import { ReactNode } from "react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

export default function MembershipPlanLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = useAuthUser<TClientDetails>();
  console.log(user);
  return (
    <>
      <ExtendClientMembership
        selectedId={user?._id || ""}
        isDialogOpen={true}
        setIsDialogOpen={() => console.log("Cannot Close this modal")}
      />
      {children}
    </>
  );
}
