import { Button } from "@/components";
import FloatingInput from "@/system/components/input/AuthInput";
import { Link } from "react-router";

export function LoginForm() {
  return (
    <form className="w-full flex flex-col items-center gap-8 max-w-[480px]">
      <FloatingInput name="email" label="Email" type="email" />
      <div className="w-full flex flex-col gap-4 items-center">
        <FloatingInput name="password" label="Password" type="password" />
        <Link to={"/forgotPassword"} className="self-end text-sm text-primary">
          Forgot Password?
        </Link>
      </div>
      <Button className="w-full py-3" variant={"primary"}>
        login
      </Button>
    </form>
  );
}
