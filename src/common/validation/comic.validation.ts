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

export const comicRecomendationValidation = z.object({
  format: z.string(),
});

export const comicGenreValidation = z.object({
  genre: z.string(),
});

export const comicUpdateValidation = z.object({
  type: z.string().default("mirror"),
  page: z.number().default(1),
  pageSize: z.number().default(16),
}).default({
  type: "mirror",
  page: 1,
  pageSize: 16,
});

export const comicSearchValidation = z.object({
  q: z.string(),
  page: z.number().default(1),
  pageSize: z.number().default(12),
});
