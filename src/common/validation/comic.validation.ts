import { z } from "zod";

export const comicDetailValidation = z.object({
  comicId: z.string(),
});

export const comicChapterListValidation = z.object({
  comicId: z.string(),
  page: z.number(),
  pageSize: z.number(),
});

export const comicPaginationValidation = z.object({
  page: z.number(),
  pageSize: z.number(),
});

export const comicChapterDetailValidation = z.object({
  chapterId: z.string(),
});