import SetPasswordModal from "@/system/features/users/set-password/set-password";
import { ReactNode } from "react";

export default function SetPasswordLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <SetPasswordModal />
      {children}
    </>
  );
}
