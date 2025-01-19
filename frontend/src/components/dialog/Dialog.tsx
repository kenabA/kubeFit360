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

export function ThemedDialog({
  children,
  title,
  message,
  theme,
  ctaText,
}: {
  children: React.ReactNode;
  title: string;
  theme: "success" | "destructive" | "warn" | "info";
  message: string;
  ctaText: string;
}) {
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="sm:w-[400px] !rounded-2xl">
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

            {title}
          </DialogTitle>
          <DialogDescription className="text-[16px] font-normal text-gray-tertiary text-center !mb-8">
            {message}
          </DialogDescription>
          <DialogFooter className="flex items-center gap-1 gap-y-2">
            <Button
              className={`${cn(
                "w-full  py-3 shadow-md",
                themeStyles[theme].backgroundLight,
                themeStyles[theme].text
              )}`}
              variant={"ghost"}
            >
              Cancel
            </Button>
            <Button
              className="w-full py-3 shadow-md hover:shadow-md"
              variant={theme}
            >
              {ctaText}
            </Button>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
