import { Heading } from "@/components/heading/Heading";
import { useShowStore } from "@/system/stores/useShowStore";
import { Link } from "react-router";

export function SignupWrapper({ children }: { children: React.ReactNode }) {
  const { show } = useShowStore();
  return (
    <div className="flex gap-[42px] flex-col items-center w-full relative">
      <div className="flex flex-col gap-3 items-center">
        <Heading variant={"quinary"} level={5}>
          Sign Up
        </Heading>
        <span className="text-gray-tertiary para-subtitle">
          Join us today and get started.
        </span>
      </div>
      {children}
      {show && (
        <p className="text-sm text-gray-secondary">
          Already have an account?{" "}
          <Link className="text-primary font-bold" to={"/login"}>
            Login
          </Link>
        </p>
      )}
    </div>
  );
}
