import { z } from "zod";
import { noticeSchema } from "./validator";
import { Dispatch, SetStateAction } from "react";

export type TAddNoticeFormProps = z.infer<typeof noticeSchema>;

export type TAddNoticeProps = {
  isDialogOpen: boolean;
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
};
