import { motion } from "motion/react";
import { TNoticeCard } from "../expandable-card/expandable-card";
import { Heading } from "@/components/heading/Heading";
import { CountDown } from "./Countdown";

export default function NoticeBar({
  card,
  id,
  setActive,
}: {
  card: TNoticeCard;
  id: string;
  setActive: React.Dispatch<React.SetStateAction<TNoticeCard | boolean | null>>;
}) {
  return (
    <motion.div
      layoutId={`card-${card.title}-${id}`}
      key={`card-${card.title}-${id}`}
      onClick={() => setActive(card)}
      className=" hover:bg-neutral-50 cursor-pointer rounded-xl bg-[#fcfcfc] grid grid-cols-[auto,1fr] overflow-hidden shadow-[0_0_4px_rgba(0,0,0,0.25)]"
    >
      <motion.div
        layoutId={`card-${card.date}-${id}`}
        className="flex flex-col -space-y-1 items-center justify-center bg-accent p-3 h-full shadow-[0_0_4px_rgba(0,0,0,0.25)]"
      >
        <span className="text-white font-bold text-lg block">20</span>
        <span className="text-white font-normal text-sm uppercase block">
          AUG
        </span>
      </motion.div>
      <motion.div className="p-3 grid grid-cols-[1fr,8fr] gap-3">
        <motion.figure
          layoutId={`image-${card.date}-${id}`}
          className="size-full min-w-[150px] min-h-[110px] bg-secondary rounded-[8px] overflow-hidden"
        >
          <motion.img
            src="https://media.istockphoto.com/id/2170450588/photo/interior-of-modern-light-gym-is-well-equipped-with-modern-machines-and-fitness-gear-offering.jpg?s=612x612&w=is&k=20&c=DSa3xRH3ZAjOFBV-QvkTDV1f3LHRpWs5YxRVJ0qiFT0="
            className="size-full object-cover"
            alt="Image of the Notice"
          />
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
            <CountDown expiryDate="2025-04-18T00:00:00Z" />
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
    </motion.div>
  );
}

// <div className="flex gap-4 flex-col md:flex-row ">
//         <motion.div layoutId={`image-${card.title}-${id}`}>
//           {/* <img
//             width={100}
//             height={100}
//             src={card.src}
//             alt={card.title}
//             className="h-40 w-40 md:h-14 md:w-14 rounded-lg object-cover object-top"
//           /> */}
//         </motion.div>
//         <div className="">
//           <motion.h3
//             layoutId={`title-${card.title}-${id}`}
//             className="font-medium text-neutral-800 dark:text-neutral-200 text-center md:text-left"
//           >
//             {card.title}
//           </motion.h3>
//           <motion.p
// layoutId={`description-${card.description}-${id}`}
//             className="text-neutral-600 dark:text-neutral-400 text-center md:text-left"
//           >
//             {card.description}
//           </motion.p>
//         </div>
//       </div>
//       <motion.button
//         layoutId={`button-${card.title}-${id}`}
//         className="px-4 py-2 text-sm rounded-full font-bold bg-gray-100 hover:bg-green-500 hover:text-white text-black mt-4 md:mt-0"
//       >
//         View
//       </motion.button>
