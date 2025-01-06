import * as React from "react";
import { Icon } from "@iconify/react";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import ToastIcon from "./ToastIcon";

const ToastProvider = ToastPrimitives.Provider;

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      "fixed z-[100] flex flex-col-reverse p-4 sm:top-0 sm:right-0",
      className
    )}
    {...props}
  />
));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;

const toastVariants = cva(
  "group pointer-events-auto  flex w-full items-center  justify-between space-x-2 rounded-md border p-4 pr-6 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=closed]:animate-out data-[state=open]:animate-in data-[swipe=end]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-right-full data-[state=open]:duration-300 data-[state=closed]:duration-300",

  {
    variants: {
      variant: {
        success:
          "border-success text-success w-[332px] bg-white border rounded-3xl pe-[53px] ps-[42px] shadow-[4px_4px_16px_0px_rgba(0,0,0,0.05)]",
        error:
          "border-destructive text-destructive w-[332px] bg-white border rounded-3xl pe-[53px] ps-[42px]  shadow-[4px_4px_16px_0px_rgba(0,0,0,0.05)]",
        warning:
          "border-warn text-warn w-[332px] bg-white border rounded-3xl pe-[53px] ps-[42px]  shadow-[4px_4px_16px_0px_rgba(0,0,0,0.05)]",
        info: "border-info text-info w-[332px] bg-white border rounded-3xl pe-[53px] ps-[42px]  shadow-[4px_4px_16px_0px_rgba(0,0,0,0.05)]",
      },
    },
    defaultVariants: {
      variant: "info",
    },
  }
);

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> &
    VariantProps<typeof toastVariants>
>(({ className, variant, children, ...props }, ref) => {
  let radialTheme;
  switch (variant) {
    case "success":
      radialTheme =
        "bg-[radial-gradient(50%_50%_at_50%_50%,rgba(71,_172,_72,_0.12),rgba(71,_172,_72,_0))]";
      break;
    case "warning":
      radialTheme =
        "bg-[radial-gradient(50%_50%_at_50%_50%,rgba(249,_161,_34,_0.12),rgba(249,_161,_34,_0))]";
      break;
    case "error":
      radialTheme =
        "bg-[radial-gradient(50%_50%_at_50%_50%,rgba(232,_62,_52,_0.12),rgba(232,_62,_52,_0))]";
      break;
    default:
      radialTheme =
        "bg-[radial-gradient(50%_50%_at_50%_50%,rgba(10,_102,_178,_0.12),rgba(10,_102,_178,_0))]";
      break;
  }
  return (
    <>
      <ToastPrimitives.Root
        ref={ref}
        className={cn(toastVariants({ variant }), className)}
        {...props}
      >
        {/* ICON */}
        <ToastIcon variant={variant} />

        {/* GRADIENT */}
        <div
          className={`w-[212px] h-[212px] left-[-20%] absolute  opacity-100 rounded-full
                    ${radialTheme}
                `}
        ></div>

        {children}
      </ToastPrimitives.Root>
    </>
  );
});
Toast.displayName = ToastPrimitives.Root.displayName;

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border px-3 text-sm font-medium transition-colors hover:bg-secondary focus:outline-none focus:ring-1 focus:ring-ring disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",
      className
    )}
    {...props}
  />
));
ToastAction.displayName = ToastPrimitives.Action.displayName;

// THIS IS FOR THE CLOSE ICON
const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(
      "absolute right-[18px] top-[18px] text-foreground p-0.5 transition-opacity hover:text-foreground",
      className
    )}
    toast-close=""
    {...props}
  >
    <Icon icon="ic:round-close" className="text-[18px]" />
  </ToastPrimitives.Close>
));
ToastClose.displayName = ToastPrimitives.Close.displayName;

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={cn("text-[40px] font-semibold [&+div]:text-xs", className)}
    {...props}
  />
));

ToastTitle.displayName = ToastPrimitives.Title.displayName;

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className={cn("text-sm opacity-90", className)}
    {...props}
  />
));
ToastDescription.displayName = ToastPrimitives.Description.displayName;

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>;

type ToastActionElement = React.ReactElement<typeof ToastAction>;

export {
  type ToastProps,
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
};
