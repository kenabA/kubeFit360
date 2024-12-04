import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const headingVariants = cva("capitalize", {
  variants: {
    variant: {
      primary: "font-bold leading-header tracking-sm primary",
      secondary: "font-bold tracking-sm secondary",
      tertiary: "font-bold tertiary",
      quinary: "font-semibold leading-[22px] para-3xl",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

export interface HeaderProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  asChild?: boolean;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

const Heading = React.forwardRef<HTMLHeadingElement, HeaderProps>(
  ({ className, variant, level, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : `h${level}`;
    return (
      <Comp
        className={cn(headingVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Heading.displayName = "Heading";

export { Heading, headingVariants };
