import { useNavigate } from "react-router";
import { Button } from "../ui/button";

import warn from "@/assets/system/svg/warn.svg";
import useLogout from "@/system/features/authentication/useLogout";

export default function Unauthorized() {
  const navigate = useNavigate();
  const { isPending, logoutUser } = useLogout();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md text-center">
        <figure className="flex justify-center items-center mb-4">
          <img src={warn} alt="A svg of warning icon" />
        </figure>
        <h1 className="text-2xl font-bold mb-4">Unauthorized Access</h1>
        <p className="text-gray-600 mb-6">
          You don't have permission to access this page.
        </p>
        <div className="space-x-4">
          <Button
            disabled={isPending}
            onClick={() => logoutUser()}
            className="border-primary border"
          >
            Logout
          </Button>
          <Button
            disabled={isPending}
            variant="ghost"
            onClick={() => navigate(-1)}
            className="bg-slate-300 text-gray"
          >
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
}
