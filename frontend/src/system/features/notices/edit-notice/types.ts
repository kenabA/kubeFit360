import { z } from "zod";
import { noticeSchema } from "./validator";
import { Dispatch, SetStateAction } from "react";

export type TEditNoticeFormProps = z.infer<typeof noticeSchema>;

export type TEditNoticeProps = {
  isDialogOpen: boolean;
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
};
