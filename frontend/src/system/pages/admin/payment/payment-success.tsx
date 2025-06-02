import check from "@/assets/system/svg/Check.svg";

import { Button } from "@/components";
import { Heading } from "@/components/heading/Heading";
import useHandleNavigate from "@/hooks/useHandleNavigate";
import { capitalize } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import kubeFitLogo from "@/assets/shared/svg/kubeFitLogo/kubeFit360-logo-white.svg";
import { Link, useLocation } from "react-router";
import { base64Decode } from "esewajs";

import { useEffect } from "react";
import useEsewaPaymentStatus from "./useEsewaPaymentStatus";
import Spinner from "@/system/components/spinner";
import { ROUTES } from "@/config/appRoutes";

export default function PaymentSuccess({
  status,
}: {
  status: "success" | "failure";
}) {
  const location = useLocation();
  // Create a new URLSearchParams object using the search string from location
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("data");
  // Decode the JWT without verifying the signature
  const decoded = base64Decode(token);

  const handleNavigate = useHandleNavigate();

  const { verifyPaymentStatus, isPending } = useEsewaPaymentStatus();

  useEffect(() => {
    verifyPaymentStatus(decoded.transaction_uuid);
  }, []);

  if (isPending) {
    return <Spinner />;
  }

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
          <img className="mx-auto" src={check} alt=" A check mark icon" />
        </figure>
        <div className="flex gap-6 flex-col items-center w-full">
          <div className="flex flex-col gap-3 items-center mb-[18px]">
            <Heading variant={"quinary"} level={5}>
              Payment {capitalize(status)}!
            </Heading>
            <span className="text-gray-tertiary para-subtitle">
              Your payment has been successfully made.
            </span>
          </div>

          <div className="border p-4 rounded-sm bg-slate-100 w-full space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-tertiary font-semibold text-sm">
                Transaction Code
              </span>
              <span className="text-gray text-sm font-semibold">
                {decoded.transaction_code}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-tertiary font-semibold text-sm">
                Amount Paid
              </span>
              <span className="text-gray text-sm font-semibold">
                Rs. {decoded.total_amount}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-tertiary font-semibold text-sm">
                Product Code
              </span>
              <span className="text-gray text-sm font-semibold">
                {decoded.product_code}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-tertiary font-semibold text-sm">
                Product Status
              </span>
              <span className="text-success text-sm font-semibold">Paid</span>
            </div>
          </div>
          <Button
            type="submit"
            className="w-full py-3"
            variant={"primary"}
            onClick={() => {
              handleNavigate(ROUTES.DASHBOARD.MEMBER);
            }}
          >
            Proceed
            <ArrowRight className="stroke-white" size={18} strokeWidth={3.8} />
          </Button>
        </div>
      </div>
    </section>
  );
}
