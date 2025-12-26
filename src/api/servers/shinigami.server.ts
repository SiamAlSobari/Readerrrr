import { createServerFn } from "@tanstack/react-start";
import { shinigamiService } from "../services/shinigami.service";

export const getRecomendation = createServerFn()
    .handler(async () => {
        const data = await shinigamiService.getRecomendation("manhua")
        return { data }
    })

export const getUpdate = createServerFn()
    .handler(async () => {
        const data = await shinigamiService.getUpdate("mirror")
        return { data }
    })