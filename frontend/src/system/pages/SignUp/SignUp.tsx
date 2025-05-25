import { ThemedDialog } from "@/components/dialog/Dialog";
import { SignupForm, SignupWrapper } from "@/system/components/index";

import { useState } from "react";

export default function Signup() {
  const [openDialog, setOpenDialog] = useState<boolean>(true);
  return (
    <>
      <ThemedDialog
        theme="info"
        ctaText="Understood"
        message="Sign Up is only available for clients. If you are a client, please proceed with the signup."
        title="Only for Clients"
        mutationFn={() => setOpenDialog(false)}
        isPending={false}
        dialogOpen={openDialog}
        setDialogOpen={setOpenDialog}
        cancelButton={false}
      />
      <SignupWrapper>
        <SignupForm />
      </SignupWrapper>
    </>
  );
}
