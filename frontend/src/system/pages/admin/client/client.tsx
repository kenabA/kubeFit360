import { Heading } from "@/components/heading/Heading";
import Filter from "@/system/components/filter/Filter";
import TableSearch from "@/system/components/table-search/TableSearch";
import { motion } from "framer-motion";
import GeneralTable from "@/system/components/tables/general-table/GeneralTable";
import useMembers from "@/system/features/users/members/useMembers";
import ColumnDefinition from "@/system/features/users/members/ColumnDefinition";
import { filterFields } from "@/system/lib/data";
import { TClientDetails } from "@/system/stores/user/types";

import { useEffect, useState } from "react";
import useDeleteUser from "@/system/features/users/useDeleteUser";
import { ThemedDialog } from "@/components/dialog/Dialog";
import ViewUser from "@/system/features/users/view-user/view-user";
import EditMember from "@/system/features/users/members/edit-members/EditMember";
import ExtendClientMembership from "@/system/features/client-membership/extend-client-membership";
import { dynamicContainerVariants } from "@/lib/utils";

export default function Client() {
  const [openView, setOpenView] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [selectedIds, setSelectedIds] = useState<string>("");
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [openExtendMembership, setOpenExtendMembership] =
    useState<boolean>(false);

  const {
    data: { data: members, count },
    isPending,
  } = useMembers();

  const {
    deleteUser,
    isSuccess: isDeleteSuccess,
    isPending: isDeletePending,
  } = useDeleteUser({ role: "members" });

  useEffect(() => {
    if (isDeleteSuccess) {
      setSelectedIds("");
      setOpenDelete(false);
    }
  }, [isDeleteSuccess]);

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
              Clients
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
                isPending={false}
                placeholder="Search by Name, or Email"
              />
              <div className="flex items-center gap-4">
                <Filter entity={filterFields.members} />
              </div>
            </div>
            <GeneralTable<TClientDetails>
              paginationClassName="bg-slate-50 px-6 sticky bottom-0"
              noDataTitle="No Clients"
              noDataDescription="Get started by adding a maintainer."
              resultCount={count || 0}
              data={members}
              columns={ColumnDefinition(
                setSelectedIds,
                setOpenEdit,
                setOpenExtendMembership,
                setOpenDelete,
                setOpenView
              )}
            />
          </motion.div>
        </div>
      </section>
      <ViewUser
        edit
        selectedId={selectedIds}
        isDialogOpen={openView}
        setIsDialogOpen={setOpenView}
        setOpenEdit={setOpenEdit}
      />
      <EditMember
        selectedId={selectedIds}
        isDialogOpen={openEdit}
        setIsDialogOpen={setOpenEdit}
      />
      <ThemedDialog
        isPending={isDeletePending}
        dialogOpen={openDelete}
        setDialogOpen={setOpenDelete}
        mutationFn={() => deleteUser(selectedIds)}
        theme="destructive"
        ctaText="Delete"
        title="Delete Client"
        message="Do you really want to delete this client?"
      />
      <ExtendClientMembership
        selectedId={selectedIds || ""}
        isDialogOpen={openExtendMembership}
        setIsDialogOpen={setOpenExtendMembership}
      />
    </>
  );
}
