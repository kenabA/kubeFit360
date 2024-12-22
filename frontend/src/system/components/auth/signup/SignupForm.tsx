import { Button } from "@/components";
import FloatingInput from "@/system/components/input/AuthInput";
import { useShowStore } from "@/system/stores/useShowStore";
import { FormEvent } from "react";

export function SignupForm() {
  const { toggleShow } = useShowStore();

  function handleNext(e: FormEvent<HTMLButtonElement>) {
    e.preventDefault();
    toggleShow();
  }

  return (
    <form className="w-full flex flex-col items-center gap-8 max-w-[480px]">
      <FloatingInput name="name" label="Full Name" type="text" />
      <FloatingInput name="email" label="Email" type="email" />
      <FloatingInput name="phone" label="Phone Number" type="phone" />
      <FloatingInput name="password" label="Password" type="password" />
      <Button
        onClick={(e) => handleNext(e)}
        className="py-2.5 w-[100px] self-end hover:shadow-sm
        "
        variant={"primary"}
      >
        next
      </Button>
    </form>
  );
}
