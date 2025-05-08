import { Button } from "@/components";
import { Heading } from "@/components/heading/Heading";
import { Badge } from "@/components/ui/badge";
import { cn, formatTime } from "@/lib/utils";
import MembershipInfoBar from "@/system/components/membership-info-bar/membership-info-bar";
import ExtendClientMembership from "@/system/features/client-membership/extend-client-membership";
import useGetClientDashboardStats from "@/system/features/users/members/useGetClientDashboardStats";
import { TClientDetails } from "@/system/stores/user/types";
import { Icon } from "@iconify/react/dist/iconify.js";
import { ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

export type TMembershipInfo = {
  label: string;
  value: string | React.ReactElement;
  badge?: boolean;
};

export default function ClientMembership() {
  const [openExtendMembership, setOpenExtendMembership] =
    useState<boolean>(false);
  const { data: clientData } = useGetClientDashboardStats();
  const user = useAuthUser<TClientDetails>();

  const daysLeft = clientData.data.daysLeft;

  const membershipOverview = useMemo(
    () => [
      {
        label: "client name",
        value: user?.name || "",
      },
      {
        label: "membership type",
        value: (
          <Badge
            variant={user?.membershipType == "enterprise" ? "gold" : "basic"}
          >
            {user?.membershipType}
          </Badge>
        ),
      },
      {
        label: "status",
        value: (
          <Badge variant={user?.active ? "active" : "inactive"}>
            {user?.active ? "active" : "inactive"}
          </Badge>
        ),
      },
    ],
    [user]
  );
  const membershipDates = useMemo(
    () => [
      {
        label: "start date",
        value: formatTime(user?.joinDate || "", "MMM dd, yyyy"),
      },
      {
        label: "expiration date",
        value: formatTime(clientData.data.expiresOn || "", "MMM dd, yyyy"),
      },
    ],
    [user]
  );
  const paymentDetails = useMemo(
    () => [
      {
        label: "next payment due",
        value: formatTime(clientData.data.expiresOn || "", "MMM dd, yyyy"),
      },
      {
        label: "days until expiration",
        value: (
          <span
            className={cn(
              daysLeft <= 5 && daysLeft > 3
                ? "text-warn"
                : daysLeft <= 5 && daysLeft <= 3
                ? "text-destructive"
                : "text-gray-primary"
            )}
          >
            {daysLeft}
          </span>
        ),
      },
    ],
    [user]
  );

  return (
    <>
      <section className="rounded-tl-xl h-[calc(100dvh-60px)] overflow-hidden">
        <div className="py-7 px-6 flex-1 flex flex-col gap-4 h-full">
          <Heading level={4} variant={"quaternary"}>
            Membership Details
          </Heading>
          <div className="rounded-xl  flex flex-col gap-6 h-full overflow-y-auto custom-scrollbar">
            <MembershipInfoBar
              title={"your membership overview"}
              data={membershipOverview}
            />
            <MembershipInfoBar
              title={"membership details"}
              data={membershipDates}
            />
            <MembershipInfoBar
              title={"payment details"}
              data={paymentDetails}
              footer={
                <div
                  className={cn(
                    "w-full flex gap-2 rounded-lg overflow-hidden",
                    daysLeft <= 5 && daysLeft > 3
                      ? "bg-warn-light text-warn"
                      : daysLeft <= 5 && daysLeft <= 3
                      ? "bg-destructive-light text-destructive"
                      : "bg-success-light text-success"
                  )}
                >
                  <div
                    className={cn(
                      "h-full w-[6px]",
                      daysLeft <= 5 && daysLeft > 3
                        ? "bg-warn"
                        : daysLeft <= 5 && daysLeft <= 3
                        ? "bg-destructive"
                        : "bg-success"
                    )}
                  ></div>
                  <div className="p-3 flex items-center gap-1">
                    <Icon
                      icon={
                        daysLeft <= 5 && daysLeft > 3
                          ? "heroicons-solid:question-mark-circle"
                          : daysLeft <= 5 && daysLeft <= 3
                          ? "jam:alert-f"
                          : "icon-park-solid:check-one"
                      }
                      className={cn("text-sm size-4")}
                    />
                    <p className="text-inherit text-sm">
                      {user?.active ? (
                        daysLeft <= 5 ? (
                          <>
                            Your membership will <b>expire</b> soon. Please
                            renew to avoid disruption in service.
                          </>
                        ) : (
                          <>
                            Your membership is <b>active</b> and in good
                            standing. No action is needed at this time. Enjoy
                            the service!
                          </>
                        )
                      ) : (
                        <>
                          Your membership has expired. Please renew it to
                          continue enjoying our services.
                        </>
                      )}
                    </p>
                  </div>
                </div>
              }
            />
            <div className="bg-white p-5 shadow-general rounded-xl flex gap-3 flex-col">
              <Heading
                level={6}
                variant={"senary"}
                className="text-gray-tertiary text-[18px] font-medium capitalize"
              >
                Extend Membership
              </Heading>
              <p className="font-normal text-[14px] text-[#848484]">
                Increase your membership plan to continue enjoying our premium
                services.
              </p>
              <Button
                className="w-fit font-semibold"
                onClick={() => setOpenExtendMembership(true)}
              >
                Extend Membership <ChevronRight className="stroke-[3]" />
              </Button>
            </div>
          </div>
        </div>
      </section>
      <ExtendClientMembership
        isDialogOpen={openExtendMembership}
        setIsDialogOpen={setOpenExtendMembership}
      />
    </>
  );
}
