import { createAxiosClient } from "@/common/http/axios.client";
import { ApiResponse, ApiResponseDetail, ChapterDetail, ChapterList, Comic, ComicDetail, PopularComic, TaxonomyItem, UpdateComic } from "@/common/interface";
import { getEnv } from "@/common/utils/env";
import { AxiosInstance } from "axios";

class ShinigamiService {
    private client: AxiosInstance;
    private baseUrl = "https://09.shinigami.asia/";

    constructor() {
        this.client = createAxiosClient(this.baseUrl);
    }

    public async getComicRecomendation(format: string) {
        const res: { data: ApiResponse<Comic> } = await this.client.get(`${getEnv().API_URL}/manga/list?format=${format}&page=1&page_size=10&is_recommended=true&sort=latest&sort_order=desc`)
        return res.data
    }

    public async getComicUpdate(type: string, page: number = 1, pageSize: number = 19) {
        const res: { data: ApiResponse<UpdateComic> } = await this.client.get(`${getEnv().API_URL}/manga/list?type=${type}&page=${page}&page_size=${pageSize}&is_update=true&sort=latest&sort_order=desc`)
        return res.data
    }

    public async getComicStatus(status: string) {
        const res: { data: ApiResponse<Comic> } = await this.client.get(`${getEnv().API_URL}/manga/list?page=1&page_size=24&genre_include_mode=or&genre_exclude_mode=or&status=${status}&sort=latest&sort_order=desc`)
        return res.data
    }

    public async getGenreList() {
        const res: { data: ApiResponse<TaxonomyItem> } = await this.client.get(`${getEnv().API_URL}/genre/list`)
        return res.data
    }

    // public async getComicGenre(genre: string){

    // }

    public async getPopularComic(page: number = 1, pageSize: number = 16) {
        const res: { data: ApiResponse<PopularComic> } = await this.client.get(`${getEnv().API_URL}/manga/top?filter=all_time&page=${page}&page_size=${pageSize}`)
        return res.data
    }

    public async getComicDetail(comicId: string) {
        const res: { data: ApiResponseDetail<ComicDetail> } = await this.client.get(`${getEnv().API_URL}/manga/detail/${comicId}`)
        return res.data

    }
    public async getChapterList(comicId: string, page: number = 1, pageSize: number = 24) {
        const res: { data: ApiResponse<ChapterList> } = await this.client.get(`${getEnv().API_URL}/chapter/${comicId}/list?page=${page}&page_size=${pageSize}&sort_by=chapter_number&sort_order=desc`)
        return res.data
    }

    public async getChapterDetail(chapterId: string) {
        const res: { data: ApiResponseDetail<ChapterDetail> } = await this.client.get(`${getEnv().API_URL}/chapter/detail/${chapterId}`)
        return res.data
    }
}


export const shinigamiService = new ShinigamiService