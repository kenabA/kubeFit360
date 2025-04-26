import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "capitalize inline-flex items-center rounded-md border border-slate-200 px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 dark:border-slate-800 dark:focus:ring-slate-300",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-slate-900 text-slate-50 shadow hover:bg-slate-900/80 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/80",
        secondary:
          "border-transparent bg-slate-100 text-slate-900 hover:bg-slate-100/80 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-800/80",
        destructive:
          "border-transparent bg-red-500 text-slate-50 shadow hover:bg-red-500/80 dark:bg-red-900 dark:text-slate-50 dark:hover:bg-red-900/80",
        inactive:
          "border-transparent bg-red-500 text-slate-50 shadow hover:bg-red-500/80 dark:bg-red-900 dark:text-slate-50 dark:hover:bg-red-900/80",
        expired:
          "border-destructive bg-destructive-light text-destructive shadow hover:bg-destructive-light dark:bg-destructive-900 dark:text-slate-50 dark:hover:bg-destructive-900/80",
        outline: "text-slate-950 dark:text-slate-50",
        active:
          "border-success bg-success-light text-success shadow hover:bg-success-light dark:bg-success-900 dark:text-slate-50 dark:hover:bg-success-light",
        available:
          "border-success bg-success-light text-success shadow hover:bg-success-light dark:bg-success-900 dark:text-slate-50 dark:hover:bg-success-light",
        basic:
          "border-accent bg-accent text-accent-foreground shadow hover:bg-accent-hover dark:bg-accent-900 dark:text-slate-50 dark:hover:bg-accent-900/80",
        gold: "border-[#fdc100] bg-[#fdc100] text-[#493209] shadow hover:bg-primary-light dark:bg-primary-900 dark:text-slate-50 dark:hover:bg-primary-900/80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
