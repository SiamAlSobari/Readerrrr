import { createServerFn } from "@tanstack/react-start";
import { shinigamiService } from "../services/shinigami.service";


export const getComicRecomendation = createServerFn()
    .handler(async () => {
        const data = await shinigamiService.getComicRecomendation("manhua")
        return { data }
    })

export const getComicUpdate = createServerFn()
    .handler(async () => {
        const data = await shinigamiService.getComicUpdate("mirror")
        return { data }
    })

export const getGenreList = createServerFn()
    .handler(async () => {
        const data = await shinigamiService.getGenreList()
        return { data }
    })