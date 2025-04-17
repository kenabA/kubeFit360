import { AnimatePresence, motion } from "motion/react";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { useRef } from "react";
import { CountDown } from "./Countdown";
import { Badge } from "@/components/ui/badge";
import { TNoticeData } from "@/system/features/notices/type";
import { useGetDayMonth } from "@/hooks/useGetDayMonth";
import { cn } from "@/lib/utils";

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};

export default function NoticeCard({
  active,
  id,
  setActive,
}: {
  active: TNoticeData | boolean | null;
  id: string;
  setActive: React.Dispatch<React.SetStateAction<TNoticeData | boolean | null>>;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const { day, month } = useGetDayMonth(
    typeof active === "object" && active?.createdAt ? active.createdAt : ""
  );

  useOutsideClick(ref, () => setActive(null));
  return (
    <AnimatePresence>
      {active && typeof active === "object" ? (
        <div className="fixed inset-0 grid place-items-center z-20">
          <motion.div
            layoutId={`card-${active.title}-${id}`}
            ref={ref}
            className="w-full max-w-[600px] flex flex-col bg-white sm:rounded-3xl overflow-hidden"
          >
            <motion.figure
              className="size-full flex items-center justify-center relative"
              layoutId={`image-${active.representativeImg}-${id}`}
            >
              <img
                src={active.representativeImg}
                alt={`${active.title}'s image representation`}
                className="max-w-[300px] max-h-[300px] object-contain z-10 object-center
                "
              />
              <img
                alt="Image of the entity"
                src={active.representativeImg}
                className={cn(
                  "absolute inset-0 w-full h-full object-cover scale-110 transition-opacity duration-300 filter blur-sm opacity-50"
                )}
              />
            </motion.figure>

            <div className="bg-white flex flex-col h-fit max-h-[350px] overflow-y-auto custom-scrollbar">
              <div className="sticky top-0 p-4 bg-white border-b">
                <div className="flex justify-between mb-3 items-center">
                  <div className="flex gap-2 items-center">
                    <Badge
                      className="text-white bg-accent hover:bg-accent-hover cursor-default
                    "
                    >
                      {day} {month}
                    </Badge>
                    <Badge
                      className="text-gray-primary bg-[#E2E7EB] hover:bg-slate-300
                       cursor-default
                    "
                    >
                      Admin
                    </Badge>
                  </div>
                  <CountDown expiryDate={active.expiresAt} />
                </div>
                <motion.h3
                  layoutId={`title-${active.title}-${id}`}
                  className="text-gray-primary font-semibold text-[20px]"
                >
                  {active.title}
                </motion.h3>
              </div>
              <motion.p
                layoutId={`description-${active.description}-${id}`}
                className="text-neutral-600 dark:text-neutral-400 p-4 "
              >
                {active.description}
              </motion.p>
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
