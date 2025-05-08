import { Button } from "@/components";
import { FormModal } from "@/components/formModal/FormModal";
import { cardVariants } from "@/system/components";
import { MembershipCards } from "@/website/layout/sections/Membership/membership-cards/MembershipCards";
import { AnimatePresence, motion } from "framer-motion";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
import useExtendClientMembership from "./useExtendClientMembership";

export type TExtendClientMembership = {
  selectedId: string;
  isDialogOpen: boolean;
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
};

export default function ExtendClientMembership({
  selectedId,
  isDialogOpen,
  setIsDialogOpen,
}: TExtendClientMembership) {
  const [selectedMembership, setSelectedMembership] = useState<string>("");

  function handleCancel() {
    setIsDialogOpen(false);
    setSelectedMembership("");
  }

  const { extendMembership, isPending, isSuccess } =
    useExtendClientMembership();

  useEffect(() => {
    if (isSuccess) {
      setIsDialogOpen(false);
      setSelectedMembership("");
    }
  }, [isSuccess]);

  return (
    <FormModal
      icon="material-symbols:card-membership-outline"
      title="Extend Plan"
      className="max-w-[70%]  2xl:max-w-[60%]"
      subtitle="Select a membership plan to extend and confirm."
      open={isDialogOpen}
      setOpen={setIsDialogOpen}
      footer={
        <>
          <Button
            disabled={isPending}
            className="shadow-none hover:shadow-none bg-slate-100 text-gray-tertiary"
            variant={"ghost"}
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            form="maintainer-form"
            type="submit"
            onClick={async () => {
              await extendMembership({
                membershipType: selectedMembership,
                selectedId,
              });
            }}
            className="px-6 shadow-none hover:shadow-none h-10 w-32"
            variant={"primary"}
            disabled={!selectedMembership || isPending}
          >
            {isPending ? (
              <Oval
                height="280"
                strokeWidth={8}
                secondaryColor="white"
                width="280"
                color="white"
                wrapperStyle={{}}
              />
            ) : (
              "Extend Plan"
            )}
          </Button>
        </>
      }
    >
      <AnimatePresence>
        {
          <motion.div
            className="w-full"
            initial="hidden"
            animate="visible"
            variants={cardVariants}
          >
            <MembershipCards
              outerStyle="gap-6 py-2"
              className="border-2 shadow-none border-slate-200"
              variant="webapp"
              selectedMembership={selectedMembership}
              onSelect={setSelectedMembership}
            />
          </motion.div>
        }
      </AnimatePresence>
    </FormModal>
  );
}

// CHECK FROM THE EDIT MAINTAINER MODEL
