import { Button } from "@/components";
import FloatingInput from "@/system/components/input/AuthInput";
import { FormEvent, useState } from "react";

export function SignupForm() {
  const [isAnimate, setIsAnimate] = useState(false);

  function handleNext(e: FormEvent<HTMLButtonElement>) {
    e.preventDefault();
    setIsAnimate(true);
  }

  return (
    <form className="w-full flex flex-col items-center gap-8 max-w-[480px]">
      <FloatingInput name="name" label="Full Name" type="text" />
      <FloatingInput name="email" label="Email" type="email" />
      <FloatingInput name="phone" label="Phone Number" type="phone" />
      <FloatingInput name="password" label="Password" type="password" />
      <Button
        onClick={(e) => handleNext(e)}
        className="py-3 w-[100px] self-end bg-tertiary hover:shadow-sm
        "
        variant={"primaryReverse"}
      >
        next
      </Button>
    </form>
  );
}
