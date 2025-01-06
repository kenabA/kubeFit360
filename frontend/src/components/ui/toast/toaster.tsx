import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "./toast";
import { useToast } from "@/hooks/use-toast";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast
            key={id}
            {...props}
            className="
                    relative
                    "
          >
            <div className="flex flex-col !m-0 w-[237px] justify-center">
              {title && (
                <ToastTitle
                  className={`font-medium tracking-[-0.035em] text-2xl`}
                >
                  {title}
                </ToastTitle>
              )}
              {description && (
                <ToastDescription
                  className={`text-gray-tertiary !text-[14px] tracking-[2%]`}
                >
                  {description}
                </ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
