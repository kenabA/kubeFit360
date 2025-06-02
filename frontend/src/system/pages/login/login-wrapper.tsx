import { ThemedDialog } from "@/components/dialog/Dialog";
import { Heading } from "@/components/heading/Heading";
import { useState } from "react";
import { useNavigate } from "react-router";

export function LoginWrapper({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  function handleSignUp() {
    setOpenDialog(true);
  }

  return (
    <>
      <div className="absolute">
        <ThemedDialog
          theme="info"
          ctaText="Yes, Proceed"
          message="Sign Up is only available for clients. If you are a client, please proceed with the signup."
          title="Only for Clients"
          mutationFn={() => navigate("/signup")}
          isPending={false}
          dialogOpen={openDialog}
          setDialogOpen={setOpenDialog}
        />
      </div>
      <div className="flex gap-[42px] flex-col items-center w-full ">
        <div className="flex flex-col gap-3 items-center">
          <Heading variant={"quinary"} level={5}>
            Login
          </Heading>
          <span className="text-gray-tertiary para-subtitle">
            Please enter your credentials.
          </span>
        </div>
        {children}
        <div className="flex items-center gap-1">
          <p className="text-sm text-gray-secondary">Don't have an account? </p>
          <button
            role="button"
            onClick={() => handleSignUp()}
            className="text-primary font-bold text-sm"
          >
            Sign Up
          </button>
        </div>
      </div>
    </>
  );
}
