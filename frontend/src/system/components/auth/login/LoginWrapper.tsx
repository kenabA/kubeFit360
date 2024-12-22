import { Heading } from "@/components/heading/Heading";
import { Link } from "react-router";

export function LoginWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-[42px] flex-col items-center w-full">
      <div className="flex flex-col gap-3 items-center">
        <Heading variant={"quinary"} level={5}>
          Login
        </Heading>
        <span className="text-gray-tertiary para-subtitle">
          Please enter your credentials.
        </span>
      </div>
      {children}
      <p className="text-sm text-gray-secondary">
        Don't have an account?{" "}
        <Link className="text-primary font-bold" to={"/signup"}>
          Sign Up
        </Link>
      </p>
    </div>
  );
}
