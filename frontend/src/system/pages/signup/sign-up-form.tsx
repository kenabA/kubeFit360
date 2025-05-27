import { Button } from "@/components";
import FloatingInput from "@/system/components/input/auth-input/AuthInput";
import { useShowStore } from "@/system/stores/useShowStore";
import { MembershipCards } from "@/website/layout/sections/membership/membership-cards/MembershipCards";
import { ArrowLeft } from "lucide-react";
import { FormEvent, useEffect } from "react";
import { TSignupFormProps } from "./types";
import { signupSchema } from "./validator";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import useSignUpRequest from "@/system/features/authentication/useSignUpRequest";

export const cardVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.3 } },
};

export function SignupForm() {
  const { toggleShow, show, resetShow } = useShowStore();

  const { createSignInRequest } = useSignUpRequest();

  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<TSignupFormProps>({
    resolver: zodResolver(signupSchema),
    // Checks for real time field validation
    mode: "onChange",
  });

  const selectedMembership = watch("membershipType"); // Watch the selected plan

  useEffect(() => {
    return () => {
      if (!show) resetShow();
    };
  }, [show, resetShow]);

  async function handleNext(e: FormEvent<HTMLButtonElement>) {
    e.preventDefault();
    toggleShow();
  }

  function onSubmit(data: TSignupFormProps) {
    if (!data) return;
    data = {
      ...data,
      membershipType: data.membershipType
        ? data.membershipType.toLowerCase()
        : "",
    };
    createSignInRequest(data);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`w-full flex flex-col items-center gap-8 ${
        !show ? "max-w-[1024px]" : "max-w-[480px]"
      } `}
    >
      {!show && (
        <button className="absolute top-0 left-0" onClick={() => toggleShow()}>
          <ArrowLeft className="stroke-primary" strokeWidth={2} />
        </button>
      )}
      <AnimatePresence>
        {!show && (
          <motion.div
            className="w-full"
            initial="hidden"
            animate="visible"
            variants={cardVariants}
          >
            {" "}
            <MembershipCards
              variant="webapp"
              selectedMembership={selectedMembership || ""}
              onSelect={(value) => setValue("membershipType", value)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {show && (
        <>
          <FloatingInput
            register={register}
            name="name"
            label="Full Name"
            type="text"
            error={errors.name}
          />
          <FloatingInput
            register={register}
            name="email"
            label="Email"
            type="email"
            error={errors.email}
          />
          <FloatingInput
            register={register}
            name="phoneNumber"
            label="Phone Number"
            type="phone"
            error={errors.phoneNumber}
          />
          <FloatingInput
            register={register}
            name="password"
            label="Password"
            type="password"
            error={errors.password}
          />

          <Button
            type="button"
            onClick={(e) => handleNext(e)}
            className="py-2.5 w-[100px] self-end hover:shadow-sm"
            disabled={!isValid}
            variant={"primary"}
          >
            next
          </Button>
        </>
      )}
      {!show && (
        <Button
          disabled={!selectedMembership}
          type="submit"
          className="py-2.5 w-[100px] self-end hover:shadow-sm
        "
          variant={"primary"}
        >
          submit
        </Button>
      )}
    </form>
  );
}
