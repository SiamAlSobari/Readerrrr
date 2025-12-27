import { createAxiosClient } from "@/common/http/axios.client";
import { ApiResponse, Comic, PopularComic, TaxonomyItem } from "@/common/interface";
import { getEnv } from "@/common/utils/env";
import { AxiosInstance } from "axios";

class ShinigamiService {
    private client: AxiosInstance;
    private baseUrl = "https://08.shinigami.asia/";

    constructor() {
        this.client = createAxiosClient(this.baseUrl);
    }

    public async getComicRecomendation(format: string) {
        const res: { data: ApiResponse<Comic> } = await this.client.get(`${getEnv().API_URL}/manga/list?format=${format}&page=1&page_size=10&is_recommended=true&sort=latest&sort_order=desc`)
        return res.data
    }

    public async getComicUpdate(type: string, page: number = 1, pageSize: number = 19) {
        const res: { data: ApiResponse<Comic> } = await this.client.get(`${getEnv().API_URL}/manga/list?type=${type}&page=${page}&page_size=${pageSize}&is_update=true&sort=latest&sort_order=desc`)
        return res.data
    }

    public async getComicStatus(status: string) {
        const res: { data: ApiResponse<Comic> } = await this.client.get(`${getEnv().API_URL}/manga/list?page=1&page_size=24&genre_include_mode=or&genre_exclude_mode=or&status=${status}&sort=latest&sort_order=desc`)
        return res.data
    }

    public async getGenreList(){
       const res: { data: ApiResponse<TaxonomyItem> } = await this.client.get(`${getEnv().API_URL}/genre/list`)
       return res.data
    }

    // public async getComicGenre(genre: string){
        
    // }

    public async getPopularComic(){
       const res: { data: ApiResponse<PopularComic> } = await this.client.get(`${getEnv().API_URL}/manga/top?filter=all_time&page=1&page_size=10`)
       return res.data
    }
}


export const shinigamiService = new ShinigamiService