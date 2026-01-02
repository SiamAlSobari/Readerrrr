import { createServerFn } from "@tanstack/react-start";
import { shinigamiService } from "../services/shinigami.service";
import { comicChapterDetailValidation, comicChapterListValidation, comicDetailValidation, comicGenreValidation, comicPaginationValidation, comicRecomendationValidation } from "@/common/validation/comic.validation";


export const getComicRecomendation = createServerFn()
    .inputValidator(comicRecomendationValidation)
    .handler(async ({data}) => {
        const comic = await shinigamiService.getComicRecomendation(data.format)
        return { data: comic }
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
    .inputValidator(comicPaginationValidation)
    .handler(async ({data}) => {
        const popular = await shinigamiService.getPopularComic(data.page,data.pageSize)
        return { data: popular }
    })

export const getComicDetail = createServerFn()
    .inputValidator(comicDetailValidation)
    .handler(async ({data}) => {
        const comic = await shinigamiService.getComicDetail(data.comicId)
        return { data: comic }
    })

export const getChapterList = createServerFn()
    .inputValidator(comicChapterListValidation)
    .handler(async ({data}) => {
        const chapters = await shinigamiService.getChapterList(data.comicId,data.page,data.pageSize)
        return { data: chapters }
    })

export const getChapterDetail = createServerFn()
    .inputValidator(comicChapterDetailValidation)
    .handler(async ({data}) => {
        const chapter = await shinigamiService.getChapterDetail(data.chapterId)
        return { data: chapter }
    })

export const genGenreList = createServerFn()
    .handler(async () => {
        const data = await shinigamiService.getGenreList()
        return { data }
    })

export const getComicGenre = createServerFn()
    .inputValidator(comicGenreValidation)
    .handler(async ({data}) => {
        const comic = await shinigamiService.getComicGenre(data.genre)
        return { data: comic }
    })