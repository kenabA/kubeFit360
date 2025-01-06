import check from "@/assets/system/svg/Check.svg";

import { Button } from "@/components";
import { Heading } from "@/components/heading/Heading";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";

export default function PasswordChanged() {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-[480px]">
      <figure className="mb-6">
        <img className="mx-auto" src={check} alt=" A check mark icon" />
      </figure>
      <div className="flex gap-6 flex-col items-center w-full">
        <div className="flex flex-col gap-3 items-center mb-[18px]">
          <Heading variant={"quinary"} level={5}>
            Password Updated!
          </Heading>
          <span className="text-gray-tertiary para-subtitle">
            Your password has been updated successfully
          </span>
        </div>

        <Button
          type="submit"
          className="w-full py-3"
          variant={"primary"}
          onClick={() => {
            navigate("/login");
          }}
        >
          <ArrowLeft className="stroke-white" size={18} strokeWidth={3.8} />{" "}
          Back to login
        </Button>
      </div>
    </div>
  );
}
