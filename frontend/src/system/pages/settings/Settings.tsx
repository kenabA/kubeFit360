import { Button } from "@/components";
import { Heading } from "@/components/heading/Heading";
import { motion } from "framer-motion";
import { TUserDetails } from "@/system/stores/user/types";
import { Icon } from "@iconify/react/dist/iconify.js";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import TrainerAccountForm from "./users/trainer-account-form";
import MaintainerAccountForm from "./users/maintainer-account-form";
import AdminAccountForm from "./users/admin-account-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MemberAccountForm from "./users/member-account-form";
import { useState } from "react";
import ChangePasswordModal from "@/system/features/users/change-password/change-password";
import { dynamicContainerVariants } from "@/lib/utils";

export default function Settings() {
  const [openChangePasswordModal, setOpenChangePasswordModal] =
    useState<boolean>(false);
  const auth = useAuthUser<TUserDetails>();
  const role = auth?.role;
  const userId = auth?._id || "";

  return (
    <section className="rounded-tl-xl h-[calc(100dvh-60px)] overflow-y-hidden">
      <div className="rounded-[18px] flex-1 flex flex-col py-7 px-6 gap-4 h-full">
        <motion.div
          variants={dynamicContainerVariants(0)}
          initial="hidden"
          animate="visible"
        >
          <Heading level={4} variant={"quaternary"}>
            Settings
          </Heading>
        </motion.div>

        <motion.div
          variants={dynamicContainerVariants(1)}
          initial="hidden"
          animate="visible"
          className="bg-white rounded-xl shadow-general  p-3 flex-1 h-0 min-h-0 relative"
        >
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
            {role === "admin" && <AdminAccountForm />}
            {role === "member" && <MemberAccountForm />}
          </div>
        </motion.div>
      </div>
      <ChangePasswordModal
        userId={userId}
        setIsDialogOpen={setOpenChangePasswordModal}
        isDialogOpen={openChangePasswordModal}
      />
    </section>
  );
}
