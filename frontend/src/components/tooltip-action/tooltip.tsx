import Triangle from "@/components/triangle/Triangle";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { motion, AnimatePresence } from "framer-motion";
import React from "react";

export default function TooltipAction({
  key,
  children,
  title,
  className,
  triangleClassName,
  disabled,
}: {
  key: React.Key;
  children: React.ReactNode;
  title: string;
  className: string;
  triangleClassName: string;
  disabled: boolean;
}) {
  return (
    <React.Fragment key={key}>
      <TooltipProvider delayDuration={200}>
        <Tooltip>
          <TooltipTrigger disabled={disabled}> {children}</TooltipTrigger>
          {!disabled && (
            <TooltipContent sideOffset={12} side="top">
              <AnimatePresence initial={true}>
                <motion.div
                  className="relative"
                  initial={{ opacity: 0, y: 0 }}
                  animate={{ opacity: 1, y: -5 }}
                  exit={{ opacity: 0, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div
                    className={cn(
                      "bg-primary text-white py-1 px-2 rounded-[8px] z-[2]",
                      className
                    )}
                  >
                    {title}
                  </div>
                  <Triangle
                    className={cn(
                      "bottom-0 -rotate-180 left-1/2 translate-y-1/2 -translate-x-[45%] size-[18px]",
                      triangleClassName
                    )}
                  />
                </motion.div>
              </AnimatePresence>
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
    </React.Fragment>
  );
}
