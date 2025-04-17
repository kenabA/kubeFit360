import { Dispatch, SetStateAction, useEffect, useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import NoticeBar from "../notice/notice-bar";
import NoticeCard from "../notice/notice-card";
import { TNoticeData } from "@/system/features/notices/type";

export type TNoticeCard = {
  id: string;
  date: string;
  title: string;
  description: string;
  status: string;
};

export const announcementsData: TNoticeCard[] = [
  {
    id: "12",
    date: "2025-04-15",
    title: "New Zumba Classes",
    description:
      "nemo cupiditate ea accusantium fugiat ipsa, blanditiis, veniam quia labore eaque placeat sit doloribus laborum obcaecati ducimus nobis Repudiandae dolorem, ipsam alias dolorum ad rerum rem nesciunt. Aut quae aliquam consequuntur cum doloribus dignissimos, explicabo perspiciatis in nihil repellat voluptatum autem! Aliquid aperiam commodi omnis, deserunt saepe iusto. Doloremque sed accusantium sapiente maxime aut expedita quod aperiam illo dolor iure, aliquid reiciendis nihil veritatis rerum distinctio obcaecati sit blanditiis dignissimos itaque! Provident dolorum esse iure officiis pariatur laudantium? Hic enim ea blanditiis ullam, magni possimus, esse, perferendis quo reprehenderit accusamus a nam? Repudiandae, maxime officiis nulla commodi consectetur rerum illum eaque eos deserunt, minima autem necessitatibus unde. Minima?",
    status: "active",
  },
  {
    id: "13",
    date: "2025-04-10",
    title: "Gym Maintenance",
    description:
      "The gym will be closed for maintenance on April 18th from 10 AM to 2 PM.",
    status: "upcoming",
  },
  {
    id: "14",
    date: "2025-04-05",
    title: "Protein Shakes Offer",
    description:
      "Get 20% off on all protein shakes till April 20th. Ask at the front desk!",
    status: "active",
  },
  {
    id: "15",
    date: "2025-03-30",
    title: "Trainer Workshop",
    description:
      "Advanced workshop for personal trainers was successfully conducted on March 28th.",
    status: "expired",
  },
  {
    id: "16",
    date: "2025-03-25",
    title: "Feedback Reminder",
    description:
      "Don’t forget to fill out your workout feedback forms by end of this week!",
    status: "reminder",
  },
];

export function ExpandableCardDemo({
  noticesData,
  role,
  setIsDialogOpen,
}: {
  noticesData: TNoticeData[];
  role: "maintainer" | "admin" | "trainer" | "member" | undefined;
  // isDialogOpen: boolean;
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [active, setActive] = useState<TNoticeData | boolean | null>(null);

  const id = useId();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  return (
    <div className="px-[18px] pb-[18px] pt-[9px]">
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      {/* When Active */}
      <NoticeCard active={active} id={id} setActive={setActive} />
      {/* RENDER LISTS */}
      <ul className="flex flex-col gap-6">
        {noticesData.map((data, index) => (
          <NoticeBar
            role={role}
            setIsDialogOpen={setIsDialogOpen}
            setActive={setActive}
            card={data}
            key={index}
            id={id}
          />
        ))}
      </ul>
    </div>
  );
}
