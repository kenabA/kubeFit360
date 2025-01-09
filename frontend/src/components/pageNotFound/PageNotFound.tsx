import { CircleX } from "lucide-react";

export default function PageNotFound({ errMsg }: { errMsg: string }) {
  return (
    <div className="flex flex-col gap-6 justify-center items-center">
      <div className="size-14 bg-error flex items-center justify-center rounded-full ">
        <CircleX size={32} fill="white" />
      </div>
      <p className="text-center font-bold text-red-500">{errMsg}</p>
    </div>
  );
}
