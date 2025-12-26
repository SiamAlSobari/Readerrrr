import axios, { AxiosInstance } from "axios";
import { getScraperHeaders } from "./headers";

export function createAxiosClient(baseUrl: string): AxiosInstance {
    return axios.create({
        baseURL: baseUrl,
        timeout: 30000,
        headers: getScraperHeaders(baseUrl),
    });
}
