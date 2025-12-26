import { createServerFn } from "@tanstack/react-start";
import { shinigamiService } from "../services/shinigami.service";

export const getRecomendation = createServerFn()
    .handler(async () => {
        const data = await shinigamiService.getComicRecomendation("manhua")
        return { data }
    })

export const getUpdate = createServerFn()
    .handler(async () => {
        const data = await shinigamiService.getComicUpdate("mirror")
        return { data }
    })