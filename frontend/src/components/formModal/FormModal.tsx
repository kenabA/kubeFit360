import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

import { Icon } from "@iconify/react/dist/iconify.js";
import { Dispatch, SetStateAction } from "react";

export function FormModal({
  open,
  setOpen,
  children,
  icon,
  title,
  subtitle,
  className,
  footer,
  stuck,
  variation = "default",
}: {
  open: boolean;
  icon: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
  subtitle: string;
  className?: string;
  title: string;
  footer: React.ReactNode;
  stuck?: boolean;
  variation?: "default" | "center";
}) {
  const isCenter = variation === "center";
  return (
    <Dialog
      modal={true}
      open={open}
      onOpenChange={(value) => {
        setOpen(value);
      }}
    >
      <DialogContent
        stuck={stuck}
        autoFocus={false}
        onOpenAutoFocus={(e) => e.preventDefault()}
        className={cn("!rounded-2xl p-0 gap-0", className)}
      >
        <DialogHeader
          className={cn(
            "gap-3 items-center space-y-0  px-6 border-b",
            isCenter ? "flex-col justify-center py-6 gap-4" : "flex-row py-4"
          )}
        >
          <div
            className={cn(
              "rounded-[10px] flex items-center justify-center",
              isCenter
                ? "p-2 bg-tertiary border-primary border"
                : "p-3 border-secondary border-2"
            )}
          >
            <Icon
              icon={icon}
              className={cn(
                "text-[28px]",
                isCenter ? "text-primary" : "text-primary"
              )}
            />
          </div>
          <div
            className={cn(
              "gap-2 flex flex-col",
              isCenter ? "items-center" : "items-start"
            )}
          >
            <DialogTitle className="font-bold text-gray">{title}</DialogTitle>
            <DialogDescription
              className="font-normal text-gray-tertiary
               text-sm"
            >
              {subtitle}
            </DialogDescription>
          </div>
        </DialogHeader>
        <div className="py-4 px-6 max-h-[550px] overflow-hidden overflow-y-auto custom-scrollbar w-full">
          {children}
        </div>
        <DialogFooter
          className={cn(
            "flex items-center gap-1 px-6 border-t",
            isCenter ? "py-6" : "py-4"
          )}
        >
          {footer}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
