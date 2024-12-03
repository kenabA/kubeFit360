import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center capitalize justify-center gap-2 whitespace-nowrap rounded-md text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 dark:focus-visible:ring-slate-300 text-[clamp(0.875rem,0.8012rem+0.3106vw,1rem)]",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground  hover:bg-primary-hover hover:shadow-button",
        outline:
          "bg-none text-primary hover:border-primary-hover border-primary border-2 hover:text-primary-hover",
        accentUnderline:
          "bg-none text-accent hover:text-accent-hover hover:border-b-accent-hover hover:border-b",
        ghost: "bg-none text-gray-primary",
        primaryReverse:
          "bg-primary-foreground text-primary hover:shadow-button",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive hover:bg-destructive-hover hover:shadow-button",
        info: "bg-info text-info-foreground hover:bg-info hover:bg-info-hover hover:shadow-button",
        warn: "bg-warn text-warn-foreground hover:bg-warn hover:bg-warn-hover hover:shadow-button",
        success:
          "bg-success text-success-foreground hover:bg-success hover:bg-success-hover hover:shadow-button",
        link: "text-slate-900 underline-offset-4 hover:underline dark:text-slate-50",
      },
      size: {
        default: "px-4 py-2",
        sm: "px-2 py-1",
      },
      rounded: {
        default: "rounded-lg",
        none: "rounded-none",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
      rounded: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, rounded, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, rounded, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
