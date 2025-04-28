import { Link } from "react-router";
import kubeFitLogo from "@/assets/shared/svg/kubeFitLogo/kubeFit360°-logo-white.svg";
import alert from "@/assets/system/svg/alert.svg";
import { Button } from "@/components";
import { Heading } from "@/components/heading/Heading";
import { ArrowLeft } from "lucide-react";
import useHandleNavigate from "@/hooks/useHandleNavigate";

export default function PaymentFailure() {
  const handleNavigate = useHandleNavigate();
  return (
    <section className="h-dvh w-dvw flex items-center justify-center relative">
      <Link to={"/"} className="hover:cursor-pointer w-fit">
        <img
          className="absolute top-5 left-5"
          src={kubeFitLogo}
          alt="Logo of kubeFit"
        />
      </Link>
      <div className="w-full max-w-[480px]">
        <figure className="mb-6">
          <img className="mx-auto" src={alert} alt=" A check mark icon" />
        </figure>
        <div className="flex gap-6 flex-col items-center w-full">
          <div className="flex flex-col gap-3 items-center mb-[18px]">
            <Heading variant={"quinary"} level={5}>
              Payment Failure!
            </Heading>
            <span className="text-gray-tertiary para-subtitle text-center">
              Your payment could not be processed. Please attempt the
              transaction again.
            </span>
          </div>

          <Button
            type="submit"
            className="w-full py-3"
            variant={"destructive"}
            onClick={() => {
              handleNavigate("/");
            }}
          >
            <ArrowLeft className="stroke-white" size={18} strokeWidth={3.8} />
            Go Back
          </Button>
        </div>
      </div>
    </section>
  );
}
