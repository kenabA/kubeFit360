import WebappMembershipCards from "./WebappMembershipCards";
import { WebsiteMembershipCards } from "./WebsiteMembership";

export function MembershipCards({
  variant,
}: {
  variant: "webapp" | "website";
}) {
  if (variant === "website") {
    return <WebsiteMembershipCards />;
  }

  if (variant === "webapp") {
    return <WebappMembershipCards />;
  }
}
