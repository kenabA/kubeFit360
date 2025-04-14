import { Button } from "@/components";
import { Heading } from "@/components/heading/Heading";
import { TUserDetails } from "@/system/stores/user/types";
import { Icon } from "@iconify/react/dist/iconify.js";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import TrainerAccountForm from "./users/trainer-account-form";
import MaintainerAccountForm from "./users/maintainer-account-form";
import AdminAccountForm from "./users/admin-account-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MemberAccountForm from "./users/member-account-form";
import { useState } from "react";
import ChangePasswordModal from "@/system/features/authentication/change-password/change-password";

export default function Settings() {
  const [openChangePasswordModal, setOpenChangePasswordModal] =
    useState<boolean>(false);
  const auth = useAuthUser<TUserDetails>();
  const role = auth?.role;

  return (
    <section className="rounded-tl-xl h-[calc(100dvh-60px)]">
      <div className="rounded-[18px] flex-1 flex flex-col py-7 px-6 gap-4 h-full">
        <Heading level={4} variant={"quaternary"}>
          Settings
        </Heading>
        {role === "admin" || role === "member" ? (
          <Tabs
            defaultValue="account"
            className="bg-white rounded-xl shadow-general p-3 flex-1 h-0 min-h-0 relative overflow-hidden"
          >
            <TabsList>
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="password">Packages</TabsTrigger>
            </TabsList>
            <TabsContent
              className="h-full  overflow-x-hidden overflow-y-auto custom-scrollbar p-3 pb-6"
              value="account"
            >
              {role === "admin" && (
                <AdminAccountForm
                  setOpenChangePasswordModal={setOpenChangePasswordModal}
                />
              )}
              {role === "member" && (
                <MemberAccountForm
                  setOpenChangePasswordModal={setOpenChangePasswordModal}
                />
              )}
            </TabsContent>
            <TabsContent value="password">
              Change your password here.
            </TabsContent>
          </Tabs>
        ) : (
          <div className="bg-white rounded-xl shadow-general  p-3 flex-1 h-0 min-h-0 relative">
            <div
              className="
           h-full  overflow-x-hidden overflow-y-auto custom-scrollbar p-3 "
            >
              <header className="flex justify-between items-center mb-6">
                <Heading
                  level={5}
                  variant={"quinary"}
                  className="text-2xl font-medium text-gray-secondary"
                >
                  Account Information
                </Heading>
                <Button
                  onClick={() => setOpenChangePasswordModal(true)}
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
              {role === "trainer" && <TrainerAccountForm />}
              {role === "maintainer" && <MaintainerAccountForm />}
            </div>
          </div>
        )}
      </div>
      <ChangePasswordModal
        setIsDialogOpen={setOpenChangePasswordModal}
        isDialogOpen={openChangePasswordModal}
      />
    </section>
  );
}
