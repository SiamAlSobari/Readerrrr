import { z } from "zod"

export const comicValidation ={
    detail: z.object({
        comicId: z.string()
    }),
    chapterList : z.object({
        comicId: z.string(),
        page: z.number(),
        pageSize: z.number()
    })
}