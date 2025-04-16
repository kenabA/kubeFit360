import { AnimatePresence, motion } from "motion/react";
import { TNoticeCard } from "../expandable-card/expandable-card";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { useRef } from "react";
import { CountDown } from "./Countdown";
import { Badge } from "@/components/ui/badge";

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
  active: TNoticeCard | boolean | null;
  id: string;
  setActive: React.Dispatch<React.SetStateAction<TNoticeCard | boolean | null>>;
}) {
  const ref = useRef<HTMLDivElement>(null);

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
              className="size-full"
              layoutId={`image-${active.date}-${id}`}
            >
              <img
                src={
                  "https://media.istockphoto.com/id/2170450588/photo/interior-of-modern-light-gym-is-well-equipped-with-modern-machines-and-fitness-gear-offering.jpg?s=612x612&w=is&k=20&c=DSa3xRH3ZAjOFBV-QvkTDV1f3LHRpWs5YxRVJ0qiFT0="
                }
                alt={active.title}
                className="size-full object-cover object-center
                "
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
                      20 AUG
                    </Badge>
                    <Badge
                      className="text-gray-primary bg-[#E2E7EB] hover:bg-slate-300
                       cursor-default
                    "
                    >
                      Admin
                    </Badge>
                  </div>
                  <CountDown expiryDate="2025-04-18T00:00:00Z" />
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

{
  /* <div>
              <div className="flex justify-between items-start p-4">
                <div className="">
                  <motion.h3
                    layoutId={`title-${active.title}-${id}`}
                    className="font-bold text-neutral-700 dark:text-neutral-200"
                  >
                    {active.title}
                  </motion.h3>
                  <motion.p
                    layoutId={`description-${active.description}-${id}`}
                    className="text-neutral-600 dark:text-neutral-400"
                  >
                    {active.description}
                  </motion.p>
                </div>

                <motion.a
                  layoutId={`button-${active.title}-${id}`}
                  href={active.status}
                  target="_blank"
                  className="px-4 py-3 text-sm rounded-full font-bold bg-green-500 text-white"
                >
                  {active.status}
                </motion.a>
              </div>
              <div className="pt-4 relative px-4">
                <motion.div
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-neutral-600 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400 [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                >
                  {typeof active.description === "function"
                    ? active.description
                    : active.description}
                </motion.div>
              </div>
            </div> */
}
