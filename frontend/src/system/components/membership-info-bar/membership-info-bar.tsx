import { Heading } from "@/components/heading/Heading";
import { TMembershipInfo } from "@/system/pages/member/client-membership/client-membership";
import React from "react";

export default function MembershipInfoBar({
  title,
  data,
  footer,
}: {
  title: string;
  data: TMembershipInfo[];
  footer?: React.ReactElement;
}) {
  return (
    <div className="bg-white p-5 shadow-general rounded-xl flex gap-3 flex-col">
      <Heading
        level={6}
        variant={"senary"}
        className="text-gray-tertiary text-[18px] font-medium capitalize"
      >
        {title}
      </Heading>
      <div className="grid grid-cols-3">
        {data.map((data: TMembershipInfo) => (
          <div
            className="flex flex-col items-start gap-1"
            key={data.label + data.value}
          >
            <span className="block text-sm capitalize text-gray-tertiary font-medium">
              {data.label}
            </span>
            {data.badge ? (
              <>ASD</>
            ) : (
              <p className="text-gray-secondary text-[16px] font-bold capitalize">
                {data.value}
              </p>
            )}
          </div>
        ))}
      </div>
      {footer}
    </div>
  );
}
