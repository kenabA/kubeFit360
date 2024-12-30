import { Heading } from "@/components/heading/Heading";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";

export function ForgotPasswordWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-[24px] flex-col items-center w-full">
      <div className="flex flex-col gap-3 items-center mb-[18px]">
        <Heading variant={"quinary"} level={5}>
          Forgot Password?
        </Heading>
        <span className="text-gray-tertiary para-subtitle">
          No worries, we'll send you a reset link on your email.
        </span>
      </div>
      {children}
      <Link
        className="text-sm text-gray-tertiary font-medium flex items-center gap-2"
        to={"/login"}
      >
        <ArrowLeft
          className="stroke-gray-tertiary"
          size={18}
          strokeWidth={1.8}
        />{" "}
        Back to Login
      </Link>
    </div>
  );
}
