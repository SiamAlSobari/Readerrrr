import { randomString } from "../utils/random-string";

export function getScraperHeaders(baseUrl: string): Record<string, string> {
    return {
        Accept: "application/json",
        DNT: "1",
        Origin: baseUrl,
        "Sec-GPC": "1",
        "X-Requested-With": randomString(Math.floor(Math.random() * 20) + 1),
    };
}
