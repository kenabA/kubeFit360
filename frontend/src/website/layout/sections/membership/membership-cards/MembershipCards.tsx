import WebappMembershipCards from "./WebappMembershipCards.tsx";
import { WebsiteMembershipCards } from "./WebsiteMembership.tsx";

export function MembershipCards({
  className = "",
  outerStyle = "",
  variant,
  selectedMembership,
  onSelect,
}: {
  className?: string;
  outerStyle?: string;
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
        className={className}
        outerStyle={outerStyle}
        selectedMembership={selectedMembership}
        onSelect={onSelect}
      />
    );
  }
}
