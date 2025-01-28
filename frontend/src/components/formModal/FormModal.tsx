import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Icon } from "@iconify/react/dist/iconify.js";
import { Dispatch, SetStateAction } from "react";

export function FormModal({
  open,
  setOpen,
  children,
  className,
  title,
  subtitle,
  footer,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
  subtitle: string;
  className?: string;
  title: string;
  footer: React.ReactNode;
}) {
  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        setOpen(value);
      }}
    >
      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="!rounded-2xl p-0 gap-0"
      >
        <DialogHeader className=" gap-3 flex-row items-center space-y-0 py-4 px-6 border-b">
          <div className="p-3 border-secondary border-2 rounded-[10px] flex items-center justify-center ">
            <Icon
              icon={"lucide:package"}
              className="text-[28px] text-primary "
            />
          </div>
          <div className="gap-2 flex flex-col ">
            <DialogTitle className="font-bold text-gray">{title}</DialogTitle>
            <DialogDescription
              className="font-normal text-gray-tertiary
               text-sm"
            >
              {subtitle}
            </DialogDescription>
          </div>
        </DialogHeader>
        <div className="py-4 px-6 border-b">{children}</div>
        <DialogFooter className="flex items-center gap-1 px-6 py-4">
          {footer}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
