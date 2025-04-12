import { Button } from "@/components";
import { Heading } from "@/components/heading/Heading";
import { TUserDetails } from "@/system/stores/user/types";
import { Icon } from "@iconify/react/dist/iconify.js";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import AccountDetailsForm from "./account-details-form/account-details-form";

export default function Settings() {
  const auth = useAuthUser<TUserDetails>();
  const role = auth?.role;

  return (
    <section className="rounded-tl-xl overflow-y-auto custom-scrollbar flex-1">
      <div className="py-7 px-6">
        <Heading level={4} variant={"quaternary"} className="mb-4">
          Settings
        </Heading>
        <div className="bg-white rounded-xl shadow-general h-full p-6">
          <header className="flex justify-between items-center mb-6">
            <Heading
              level={5}
              variant={"quinary"}
              className="text-2xl font-medium text-gray-secondary"
            >
              Account Information
            </Heading>
            <Button
              variant={"accentReverse"}
              className="font-medium border border-accent"
            >
              <Icon
                icon={"mdi:password-outline"}
                className="text-accent !size-[18px]"
              />
              Change Password
            </Button>
          </header>
          <AccountDetailsForm />
        </div>
      </div>
    </section>
  );
}
