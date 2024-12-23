import { Button } from "@/components";
import FloatingInput from "@/system/components/input/AuthInput";
import { useShowStore } from "@/system/stores/useShowStore";
import { MembershipCards } from "@/website/layout/sections/Membership/membership-cards/MembershipCards";
import { ArrowLeft } from "lucide-react";
import { FormEvent, useEffect } from "react";

export function SignupForm() {
  const { toggleShow, show, resetShow } = useShowStore();

  function handleNext(e: FormEvent<HTMLButtonElement>) {
    e.preventDefault();
    toggleShow();
  }

  useEffect(() => {
    return () => {
      if (!show) resetShow();
    };
  }, [show, resetShow]);

  return (
    <form
      className={`w-full flex flex-col items-center gap-8 ${
        !show ? "max-w-[1024px]" : "max-w-[480px]"
      } `}
    >
      {!show && (
        <button className="absolute top-0 left-0" onClick={() => toggleShow()}>
          <ArrowLeft className="stroke-primary" strokeWidth={2} />
        </button>
      )}
      {!show && <MembershipCards variant="webapp" />}
      {show && (
        <>
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
        </>
      )}
    </form>
  );
}
