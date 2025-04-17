import { z } from "zod";
import { noticeSchema } from "./edit-notice/validator";

export type TNoticeData = z.infer<typeof noticeSchema> & {
  _id: string;
  createdAt: string;
};
