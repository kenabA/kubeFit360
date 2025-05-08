import { cn, dynamicContainerVariants } from "@/lib/utils";
import React from "react";
import { motion } from "framer-motion";

type Props = {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
};

const AnimatedBorderWrapper = ({
  children,
  className,
  innerClassName,
}: Props) => {
  return (
    <motion.div
      variants={dynamicContainerVariants(0)}
      initial="hidden"
      animate="visible"
      className={cn(
        "relative inline-flex overflow-hidden rounded-2xl p-[4px] shadow-[0_4px_20px_rgba(227,139,55,0.3)]",
        className
      )}
    >
      <span
        className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] 
        bg-[conic-gradient(from_90deg_at_50%_50%,#ff9027_0%,#ffb347_25%,#e38b37_50%,#b65f28_75%,#e38b37_100%)]"
      />
      <div
        className={cn(
          "relative w-full h-full rounded-2xl backdrop-blur-xl bg-gradient-to-br from-[#1a1a1a] to-[#111010]/90",
          innerClassName
        )}
      >
        {children}
      </div>
    </motion.div>
  );
};

export default AnimatedBorderWrapper;
