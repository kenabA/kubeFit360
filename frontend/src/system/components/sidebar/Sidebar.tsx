import kf from "@/assets/shared/svg/kubeFitLogo/kubeFit360°-logo-black.svg";
import { Icon } from "@iconify/react/dist/iconify.js";

import { NavLink, useLocation } from "react-router";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { AnimatePresence, motion } from "framer-motion";
import Triangle from "@/components/triangle/Triangle";
import { ThemedDialog } from "@/components/dialog/Dialog";
import React from "react";
import { useSidebarData } from "./useSidebar";

export default function Sidebar() {
  const location = useLocation();
  // TODO Get the role of the user from the global state
  const sidebarData = useSidebarData("admin");

  return (
    <div className="z-10 h-full flex flex-col p-3 pt-0 bg-white shadow-general">
      <figure className="py-[20px] border-slate-300 border-b flex items-center justify-center">
        <img src={kf} alt="kubeFit Logo" />
      </figure>
      <ul className="flex-1 py-[14px] border-b flex flex-col items-center gap-[14px]">
        {sidebarData.map((data) => {
          return (
            <React.Fragment key={data.title}>
              <TooltipProvider delayDuration={200}>
                <Tooltip>
                  <TooltipTrigger>
                    <li
                      key={data.title}
                      className="flex w-full items-center transition-all justify-center"
                    >
                      <NavLink
                        to={data.to}
                        className={({ isActive }) =>
                          `py-2 px-3 rounded-[8px] ${
                            isActive
                              ? "bg-primary !pointer-events-none !cursor-default"
                              : "bg-none group hover:bg-tertiary"
                          }`
                        }
                      >
                        {({ isActive }) => (
                          <Icon
                            icon={data.icon}
                            className={`text-[clamp(1.25rem,1.1883rem+0.2597vw,1.5rem)] ${
                              isActive
                                ? "text-white"
                                : "text-gray-tertiary group-hover:text-primary"
                            }`}
                          />
                        )}
                      </NavLink>
                    </li>
                  </TooltipTrigger>
                  {location.pathname !== data.to && (
                    <TooltipContent sideOffset={5} side="left">
                      <AnimatePresence initial={true}>
                        <motion.div
                          className="relative"
                          initial={{ opacity: 0, x: 0 }}
                          animate={{ opacity: 1, x: 10 }}
                          exit={{ opacity: 0, x: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Triangle />
                          <div className="bg-primary text-white py-2 px-4 rounded-[8px]">
                            {data.title}
                          </div>
                        </motion.div>
                      </AnimatePresence>
                    </TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
            </React.Fragment>
          );
        })}
      </ul>
      <div className="pt-[14px] w-full flex justify-center">
        {/* TODO  : Add a logout functionality */}
        <ThemedDialog
          theme="warn"
          ctaText="Logout"
          title="Logout"
          message="Do you really want to logout?"
        >
          <Icon
            icon={"material-symbols:logout-rounded"}
            className="text-[22px]  text-gray-tertiary"
          />
        </ThemedDialog>
      </div>
    </div>
  );
}
