import WebappMembershipCards from "./WebappMembershipCards";
import { WebsiteMembershipCards } from "./WebsiteMembership";

export function MembershipCards({
  variant,
  selectedMembership,
  onSelect,
}: {
  variant: "webapp" | "website";
  selectedMembership: string;
  onSelect: (value: string) => void;
}) {
  if (variant === "website") {
    return <WebsiteMembershipCards />;
  }

  if (variant === "webapp") {
    return (
      <WebappMembershipCards
        selectedMembership={selectedMembership}
        onSelect={onSelect}
      />
    );
  }
}
