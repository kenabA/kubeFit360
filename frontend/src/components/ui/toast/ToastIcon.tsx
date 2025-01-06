import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";

export default function ToastIcon({
  variant,
}: {
  variant: string | null | undefined;
}) {
  const [canAnimate, setCanAnimate] = useState(false);

  useEffect(function () {
    const id = setInterval(() => setCanAnimate(true), 200);
    return () => clearInterval(id);
  }, []);

  let iconName;
  let iconTheme;

  switch (variant) {
    case "success":
      iconName = "mingcute:check-fill";
      iconTheme = "fill-success";

      break;
    case "warning":
      iconName = "ion:alert-outline";
      iconTheme = "fill-warn";

      break;
    case "error":
      iconName = "tabler:x";
      iconTheme = "fill-destructive";

      break;
    default:
      iconName = "fa6-solid:question";
      iconTheme = "fill-info";
  }

  return (
    <div
      className={`absolute left-[-15.54px]  transition  ${
        canAnimate ? "animate-toast-icon " : ""
      }`}
    >
      <svg
        width="53"
        height="58"
        viewBox="0 0 53 58"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M26.5448 51.9991C40.9039 51.9991 52.5444 40.3587 52.5444 25.9995C52.5444 11.6403 40.9039 -7.62939e-05 26.5448 -7.62939e-05C12.1856 -7.62939e-05 0.545166 11.6403 0.545166 25.9995C0.545166 34.0847 4.23571 41.308 10.0241 46.0765C10.0332 46.084 10.0251 46.0986 10.0139 46.0948V46.0948C10.0071 46.0924 9.99992 46.0976 9.99992 46.1048V54.1688C9.99992 56.4258 12.3788 57.8906 14.3942 56.8747L23.4934 52.2879C23.996 52.0345 24.559 51.9305 25.121 51.9608C25.5924 51.9862 26.0671 51.9991 26.5448 51.9991Z"
          className={iconTheme}
        />
      </svg>
      <Icon
        className="text-2xl  absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-60%] text-white"
        icon={iconName}
      />
    </div>
  );
}
