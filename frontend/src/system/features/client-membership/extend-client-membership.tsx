import { Button } from "@/components";
import { FormModal } from "@/components/formModal/FormModal";
import { cardVariants } from "@/system/components";
import { MembershipCards } from "@/website/layout/sections/Membership/membership-cards/MembershipCards";
import { AnimatePresence, motion } from "framer-motion";
import { Dispatch, SetStateAction, useState } from "react";
import { Oval } from "react-loader-spinner";

export type TExtendClientMembership = {
  isDialogOpen: boolean;
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
};

export default function ExtendClientMembership({
  isDialogOpen,
  setIsDialogOpen,
}: TExtendClientMembership) {
  const [selectedMembership, setSelectedMembership] = useState<string>("");

  function handleCancel() {
    setIsDialogOpen(false);
  }

  return (
    <FormModal
      icon="material-symbols:card-membership-outline"
      title="Extend Plan"
      className="max-w-[60%]"
      subtitle="Select a membership plan to extend and confirm."
      open={isDialogOpen}
      setOpen={setIsDialogOpen}
      footer={
        <>
          <Button
            disabled={false}
            className="shadow-none hover:shadow-none bg-slate-100 text-gray-tertiary"
            variant={"ghost"}
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            form="maintainer-form"
            type="submit"
            onClick={() => null}
            className="px-6 shadow-none hover:shadow-none h-10 w-32"
            variant={"primary"}
            disabled={!selectedMembership}
          >
            {false ? (
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
              outerStyle="gap-5"
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
