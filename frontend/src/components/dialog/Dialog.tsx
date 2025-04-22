import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { themeStyles } from "./helpers";
import { cn } from "@/lib/utils";
import { Oval } from "react-loader-spinner";
import { TDialog } from "./type";

export function ThemedDialog({
  mutationFn,
  isPending,
  dialogOpen,
  setDialogOpen,
  children,
  title,
  message,
  theme,
  className,
  ctaText,
}: TDialog) {
  return (
    <Dialog
      open={dialogOpen}
      onOpenChange={(value) => {
        setDialogOpen(value);
      }}
    >
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className={cn("sm:w-[400px] !rounded-2xl", className)}>
        <DialogHeader className="px-6 py-3">
          <DialogTitle
            className={`${cn(
              "text-2xl mb-3 flex flex-col items-center justify-center",
              themeStyles[theme]?.text
            )}`}
          >
            <img
              src={themeStyles[theme].icon}
              className="mb-4"
              alt="Icon representing the dialog"
            />
            <span className="text-center">{title}</span>
          </DialogTitle>
          <DialogDescription className="text-[16px] font-normal text-gray-tertiary text-center !mb-8">
            {message}
          </DialogDescription>
          <DialogFooter className="flex items-center gap-1 gap-y-2">
            <Button
              disabled={isPending}
              className={`${cn(
                "w-full shadow-md md:h-11",
                themeStyles[theme].backgroundLight,
                themeStyles[theme].text
              )}`}
              onClick={(e) => {
                setDialogOpen(false);
                e.stopPropagation();
              }}
              variant={"ghost"}
            >
              Cancel
            </Button>
            <Button
              onClick={(e) => {
                mutationFn();
                e.stopPropagation();
              }}
              className="w-full shadow-md hover:shadow-md md:h-11"
              variant={theme}
              disabled={isPending}
            >
              {isPending ? (
                <Oval
                  height="280"
                  strokeWidth={8}
                  secondaryColor="white"
                  width="280"
                  color="white"
                  wrapperStyle={{}}
                />
              ) : (
                ctaText
              )}
            </Button>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
