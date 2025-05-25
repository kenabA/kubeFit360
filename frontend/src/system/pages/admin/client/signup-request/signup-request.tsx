import { ThemedDialog } from "@/components/dialog/Dialog";
import { Heading } from "@/components/heading/Heading";
import { dynamicContainerVariants } from "@/lib/utils";
import Filter from "@/system/components/filter/Filter";
import TableSearch from "@/system/components/table-search/TableSearch";
import GeneralTable from "@/system/components/tables/general-table/GeneralTable";
import ColumnDefinition from "@/system/features/authentication/ColumnDefinition";
import { motion } from "framer-motion";
import useGetSignUpRequests, {
  TSignUpRequests,
} from "@/system/features/authentication/useGetSignUpRequests";
import useValidateSIgnUpRequest from "@/system/features/users/members/useValidateSignUpRequest";
import { filterFields } from "@/system/lib/data";

import { useEffect, useState } from "react";

export default function SignUpRequest() {
  const [selectedIds, setSelectedIds] = useState<string>("");
  const [dialogTheme, setDialogTheme] = useState<
    "success" | "destructive" | "warn" | "info"
  >("info");
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const {
    isSuccess,
    validateSignUpRequest,
    isPending: isValidatingSignUpRequest,
  } = useValidateSIgnUpRequest();

  const {
    isPending,
    data: { data: clientRequests, count },
  } = useGetSignUpRequests();

  useEffect(() => {
    if (isSuccess) {
      setOpenDialog(false);
    }
  }, [isSuccess]);

  const status = dialogTheme === "success" ? "Approve" : "Reject";
  return (
    <>
      <section className="rounded-tl-xl h-[calc(100dvh-60px)] overflow-hidden">
        <div className="py-7 px-6 flex-1 flex flex-col gap-4 h-full">
          <motion.div
            variants={dynamicContainerVariants(0)}
            initial="hidden"
            animate="visible"
          >
            <Heading level={4} variant={"quaternary"}>
              Client Requests
            </Heading>
          </motion.div>
          <motion.div
            variants={dynamicContainerVariants(1)}
            initial="hidden"
            animate="visible"
            className="bg-white rounded-xl shadow-general overflow-hidden h-full"
          >
            <div className="flex shadow-elevation items-center justify-between sticky top-0 bg-white p-[18px] z-[1]">
              <TableSearch
                isPending={isPending}
                placeholder="Search by Name, or Email"
              />
              <div className="flex items-center gap-4">
                <Filter entity={filterFields.signUpRequests} />
              </div>
            </div>
            <GeneralTable<TSignUpRequests>
              paginationClassName="bg-slate-50 px-6 sticky bottom-0"
              noDataTitle="No Client Requests"
              noDataDescription="Comeback later to view client's request."
              resultCount={count || 0}
              data={clientRequests}
              columns={ColumnDefinition(
                setSelectedIds,
                setOpenDialog,
                setDialogTheme
              )}
            />
          </motion.div>
        </div>
      </section>
      <ThemedDialog
        isPending={isValidatingSignUpRequest}
        dialogOpen={openDialog}
        setDialogOpen={setOpenDialog}
        mutationFn={() => {
          validateSignUpRequest({
            data: dialogTheme === "success" ? "approved" : "rejected",
            selectedId: selectedIds,
          });
        }}
        theme={dialogTheme}
        ctaText={status}
        title={`${status} Client`}
        message={`Do you really want to ${status} this client?`}
      />
    </>
  );
}
