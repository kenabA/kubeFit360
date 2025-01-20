import { Heading } from "../heading/Heading";

export default function ErrorPage({ errMsg }: { errMsg: string }) {
  return (
    <div className="h-dvh w-dvw overflow-hidden flex  justify-center items-center">
      <Heading
        variant={"primary"}
        level={1}
        className="text-center font-bold text-destructive"
      >
        {errMsg}
      </Heading>
    </div>
  );
}
