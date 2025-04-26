import { EllipsisVertical } from "lucide-react";
import { motion } from "motion/react";
import { Heading } from "@/components/heading/Heading";
import warn from "@/assets/system/svg/warn.svg";
import { CountDown } from "./Countdown";
import React, { Dispatch, SetStateAction, useState } from "react";
import ActionPopover from "@/components/action-popover/action-popover";
import EditNotice from "@/system/features/notices/edit-notice/edit-notice";
import { ThemedDialog } from "@/components/dialog/Dialog";
import { TNoticeData } from "@/system/features/notices/type";
import { useGetDayMonth } from "@/hooks/useGetDayMonth";
import useDeleteNotice from "@/system/features/notices/delete-notice/useDeleteNotice";
import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";

export default function NoticeBar({
  role,
  card,
  id,
  setIsDialogOpen,
  setActive,
}: {
  role: "maintainer" | "admin" | "trainer" | "member" | undefined;
  card: TNoticeData;
  id: string;
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
  setActive: React.Dispatch<React.SetStateAction<TNoticeData | boolean | null>>;
}) {
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [openActionPopover, setOpenActionPopover] = useState<boolean>(false);

  const { deleteNotice, isPending } = useDeleteNotice();

  const { day, month } = useGetDayMonth(card.createdAt);

  function handleSelectId() {
    setSelectedId(card._id);
  }

  return (
    <motion.div
      layoutId={`card-${card.title}-${id}`}
      key={`card-${card.title}-${id}`}
      onClick={() => {
        if (!openEdit) {
          setActive(card);
        }
      }}
      className=" hover:bg-neutral-50 cursor-pointer rounded-xl bg-[#fcfcfc] grid grid-cols-[auto,1fr] overflow-hidden shadow-[0_0_4px_rgba(0,0,0,0.25)]"
    >
      <motion.div
        layoutId={`card-${card.createdAt}-${id}`}
        className="flex flex-col -space-y-1 items-center justify-center bg-accent p-3 h-full shadow-[0_0_4px_rgba(0,0,0,0.25)]"
      >
        <span className="text-white font-bold text-lg block">{day}</span>
        <span className="text-white font-normal text-sm uppercase block">
          {month}
        </span>
      </motion.div>
      <motion.div className="p-3 grid grid-cols-[1fr,8fr] gap-3">
        <motion.figure
          layoutId={`image-${card.title}-${id}`}
          className={cn(
            "size-full min-w-[150px] h-[120px] rounded-[8px] overflow-hidden shadow-[0_0_4px_rgba(0,0,0,0.06)]",
            !card.representativeImg &&
              "flex items-center justify-center relative bg-slate-100 shadow-inner"
          )}
        >
          {card.representativeImg ? (
            <motion.img
              src={card.representativeImg}
              className="size-full object-cover"
              alt="Image of the Notice"
            />
          ) : (
            <img
              className="mx-auto size-20"
              src={warn}
              alt=" An warning icon"
            />
          )}
        </motion.figure>
        <motion.article className="flex flex-col gap-[6px] items-start">
          <motion.header className="flex items-center justify-between w-full">
            <Heading
              variant={"quinary"}
              level={5}
              className="text-gray-secondary text-[20px] font-semibold"
            >
              {card.title}
            </Heading>
            <div className="flex gap-2 items-center">
              <CountDown expiryDate={card.expiresAt} />
              <Badge variant={card.status}>{card.status}</Badge>
              {role === "admin" && (
                <ActionPopover
                  openActionPopover={openActionPopover}
                  setOpenActionPopover={setOpenActionPopover}
                  setOpenDelete={setOpenDelete}
                  setOpenEdit={setOpenEdit}
                  handleSelectId={handleSelectId}
                >
                  <EllipsisVertical className="size-[16px]" />
                </ActionPopover>
              )}
            </div>
          </motion.header>
          <motion.p
            layoutId={`description-${card.description}-${id}`}
            className="text-[14px]  text-gray-tertiary line-clamp-2 leading-[21px] break-words overflow-hidden "
          >
            {card.description}
          </motion.p>
          <motion.button className="text-sm text-primary font-semibold mt-auto">
            View Details
          </motion.button>
        </motion.article>
      </motion.div>
      <EditNotice
        selectedId={selectedId || ""}
        isDialogOpen={openEdit}
        setIsDialogOpen={setOpenEdit}
      />
      <ThemedDialog
        isPending={isPending}
        dialogOpen={openDelete}
        setDialogOpen={setOpenDelete}
        mutationFn={() => {
          deleteNotice(card._id);
        }}
        theme="destructive"
        ctaText="Delete"
        title="Delete Notice"
        message="Do you really want to delete this notice?"
      />
    </motion.div>
  );
}
