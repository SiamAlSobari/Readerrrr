import { createAxiosClient } from "@/common/http/axios.client";
import { ApiResponse, Comic } from "@/common/interface";
import { getEnv } from "@/common/utils/env";
import { AxiosInstance } from "axios";

class ShinigamiService {
    private client: AxiosInstance;
    private baseUrl = "https://08.shinigami.asia/";

    constructor() {
        this.client = createAxiosClient(this.baseUrl);
    }

    public async getRecomendation(format: string) {
        const res: { data: ApiResponse<Comic> } = await this.client.get(`${getEnv().API_URL}/manga/list?format=${format}&page=1&page_size=10&is_recommended=true&sort=latest&sort_order=desc`)
        return res.data
    }

    public async getUpdate(type: string, page: number = 1, pageSize: number = 19) {
        const res: { data: ApiResponse<Comic> } = await this.client(`${getEnv().API_URL}/manga/list?type=${type}&page=${page}&page_size=${pageSize}&is_update=true&sort=latest&sort_order=desc`)
        return res.data
    }
}


export const shinigamiService = new ShinigamiService