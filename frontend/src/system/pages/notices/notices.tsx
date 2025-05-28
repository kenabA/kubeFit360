import { Button } from "@/components";
import { Heading } from "@/components/heading/Heading";
import { dynamicContainerVariants } from "@/lib/utils";
import { ExpandableCardDemo } from "@/system/components/expandable-card/expandable-card";
import Filter from "@/system/components/filter/Filter";
import NoData from "@/system/components/no-data/NoData";
import Spinner from "@/system/components/spinner";
import { motion } from "framer-motion";
import TableSearch from "@/system/components/table-search/TableSearch";
import AddNotice from "@/system/features/notices/add-notice/add-notice";
import useNotices from "@/system/features/notices/useNotices";
import { filterFields } from "@/system/lib/data";
import { TUserDetails } from "@/system/stores/user/types";
import { Plus } from "lucide-react";
import { useState } from "react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

export default function Notices() {
  const user = useAuthUser<TUserDetails>();

  const [openAdd, setOpenAdd] = useState<boolean>(false);

  const { data: noticesData, isLoading } = useNotices();
  const data = Array.isArray(noticesData) ? [] : noticesData?.data;

  console.log(data);

  function handleOpenAdd() {
    setOpenAdd(true);
  }

  const notices = data;
  const role = user?.role;

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <section className="rounded-tl-xl h-[calc(100dvh-60px)] overflow-y-hidden">
      <div className="py-7 px-6 flex-1 flex flex-col gap-4 h-full">
        <motion.div
          variants={dynamicContainerVariants(0)}
          initial="hidden"
          animate="visible"
        >
          <Heading level={4} variant={"quaternary"}>
            Notices
          </Heading>
        </motion.div>
        <motion.div
          variants={dynamicContainerVariants(1)}
          initial="hidden"
          animate="visible"
          className="bg-white rounded-xl shadow-general h-full overflow-hidden overflow-y-auto custom-scrollbar"
        >
          <div className="flex items-center justify-between sticky  top-0 bg-white p-[18px] pb-[9px] z-[1]">
            <TableSearch
              isPending={false}
              placeholder="Search by Notice Title"
            />
            <div className="flex items-center gap-4">
              <Filter entity={filterFields.notices} />
              {user?.role === "admin" && (
                <Button
                  variant={"primary"}
                  className="font-medium"
                  onClick={handleOpenAdd}
                >
                  <Plus className="stroke-[3px]" /> Add Notices
                </Button>
              )}
            </div>
          </div>
          {notices.length > 0 ? (
            <ExpandableCardDemo
              noticesData={notices}
              role={role}
              setIsDialogOpen={setOpenAdd}
            />
          ) : (
            <NoData
              className="py-24 w-full"
              title="No Notices Available"
              description="There are currently no notices to display. Please check back later for updates."
            />
          )}
        </motion.div>
      </div>
      <AddNotice isDialogOpen={openAdd} setIsDialogOpen={setOpenAdd} />
    </section>
  );
}
