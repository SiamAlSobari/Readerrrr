import { createServerFn } from "@tanstack/react-start";
import { shinigamiService } from "../services/shinigami.service";
import { comicValidation } from "@/common/validation/comic.validation";


export const getComicRecomendation = createServerFn()
    .handler(async () => {
        const data = await shinigamiService.getComicRecomendation("manhua")
        return { data }
    })

export const getComicUpdate = createServerFn()
    .handler(async () => {
        const data = await shinigamiService.getComicUpdate("mirror",1,6)
        return { data }
    })

export const getGenreList = createServerFn()
    .handler(async () => {
        const data = await shinigamiService.getGenreList()
        return { data }
    })

export const getPopularComic = createServerFn()
    .handler(async () => {
        const data = await shinigamiService.getPopularComic()
        return { data }
    })

export const getComicDetail = createServerFn()
    .inputValidator(comicValidation.detail)
    .handler(async ({data}) => {
        const comic = await shinigamiService.getComicDetail(data.comicId)
        return { data: comic }
    })

export const getChapterList = createServerFn()
    .inputValidator(comicValidation.chapterList)
    .handler(async ({data}) => {
        const chapters = await shinigamiService.getChapterList(data.comicId,data.page,data.pageSize)
        return { data: chapters }
    })