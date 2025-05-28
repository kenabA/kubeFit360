import { Oval } from "react-loader-spinner";

export default function Spinner() {
  return (
    <div className="h-dvh w-dvw flex items-center justify-center">
      <Oval
        height="48"
        strokeWidth={8}
        secondaryColor="hsl(var(--primary))"
        width="48"
        color="hsl(var(--primary))"
        wrapperStyle={{}}
      />
    </div>
  );
}
