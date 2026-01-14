import { createAxiosClient } from "@/common/http/axios.client";
import { ApiResponse, ApiResponseDetail, ChapterDetail, ChapterList, Comic, ComicDetail, PopularComic, TaxonomyItem, UpdateComic } from "@/common/interface";
import { client } from "@/common/libs/redis";
import { getEnv } from "@/common/utils/env";
import { AxiosInstance } from "axios";

class ShinigamiService {
    private client: AxiosInstance;
    private baseUrl = "https://09.shinigami.asia/";

    constructor() {
        this.client = createAxiosClient(this.baseUrl);
    }

    public async getComicRecomendation(format: string) {
        const cacheKey = `comic_recomendation_${format}`;

        const cached = await client.get(cacheKey);
        if (cached) {
            console.log("📌 Recomendation dari Redis cache");
            return JSON.parse(cached) as ApiResponse<Comic>;
        }
        const res: { data: ApiResponse<Comic> } = await this.client.get(`${getEnv().API_URL}/manga/list?format=${format}&page=1&page_size=10&is_recommended=true&sort=latest&sort_order=desc`)
        // Simpan object lengkap, sama seperti API
        await client.set(cacheKey, JSON.stringify(res.data), "EX", 604800); // 7 hari
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

    public async getGenreList(): Promise<ApiResponse<TaxonomyItem>> {
        const cacheKey = "genre_list";

        const cached = await client.get(cacheKey);
        if (cached) {
            console.log("📌 Genre dari Redis cache");
            return JSON.parse(cached) as ApiResponse<TaxonomyItem>;
        }

        const res: { data: ApiResponse<TaxonomyItem> } = await this.client.get(
            `${getEnv().API_URL}/genre/list`
        );

        // Simpan object lengkap, sama seperti API
        await client.set(cacheKey, JSON.stringify(res.data), "EX", 604800); // 7 hari

        console.log("📌 Genre dari API");
        return res.data;
    }


    public async getComicGenre(genre: string) {
        const cacheKey = `comic_genre_${genre}`;

        const cached = await client.get(cacheKey);
        if (cached) {
            console.log("📌 Genre dari Redis cache");
            return JSON.parse(cached) as ApiResponse<Comic>;
        }
        // 1️⃣ Cek cache dulu
        const res: { data: ApiResponse<Comic> } = await this.client.get(`${getEnv().API_URL}/manga/list?page=1&page_size=24&genre_include=${genre}&genre_include_mode=or&genre_exclude_mode=or&sort=latest&sort_order=desc`)
        // Simpan object lengkap, sama seperti API
        await client.set(cacheKey, JSON.stringify(res.data), "EX", 172800); // 2 hari

        console.log("📌 Genre dari API");
        return res.data
    }

    public async getPopularComic(page: number = 1, pageSize: number = 16) {
        const cacheKey = `popular_comic_${page}_${pageSize}`;

        const cached = await client.get(cacheKey);
        if (cached) {
            console.log("📌 Popular dari Redis cache");
            return JSON.parse(cached) as ApiResponse<PopularComic>;
        }
        const res: { data: ApiResponse<PopularComic> } = await this.client.get(`${getEnv().API_URL}/manga/top?filter=all_time&page=${page}&page_size=${pageSize}`)
        // Simpan object lengkap, sama seperti API
        await client.set(cacheKey, JSON.stringify(res.data), "EX", 172000); // 2 hari

        console.log("📌 Popular dari API");
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