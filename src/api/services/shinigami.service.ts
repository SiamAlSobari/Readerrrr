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

    private async safeGetCache<T>(key: string): Promise<T | null> {
        try {
            const cached = await client.get(key);
            if (cached) {
                return JSON.parse(cached) as T;
            }
        } catch (e) {
            console.warn(`[Redis Cache Error] GET ${key}:`, e);
        }
        return null;
    }

    private async safeSetCache(key: string, data: unknown, ttlSeconds: number): Promise<void> {
        try {
            await client.set(key, JSON.stringify(data), "EX", ttlSeconds);
        } catch (e) {
            console.warn(`[Redis Cache Error] SET ${key}:`, e);
        }
    }

    private normalizeListResponse<T>(resp: ApiResponse<T> | null | undefined): ApiResponse<T> {
        if (!resp) {
            return {
                retcode: 0,
                message: "OK",
                meta: {
                    request_id: "",
                    timestamp: Date.now(),
                    process_time: "0ms",
                    page: 1,
                    page_size: 24,
                    total_page: 1,
                    total_record: 0,
                },
                data: [],
            };
        }
        return {
            ...resp,
            data: Array.isArray(resp.data) ? resp.data : [],
        };
    }

    public async getComicRecomendation(format: string) {
        const cacheKey = `comic_recomendation_${format}`;
        const cached = await this.safeGetCache<ApiResponse<Comic>>(cacheKey);
        if (cached && Array.isArray(cached.data)) return this.normalizeListResponse(cached);

        const res: { data: ApiResponse<Comic> } = await this.client.get(
            `${getEnv().API_URL}/manga/list?format=${format}&page=1&page_size=10&is_recommended=true&sort=latest&sort_order=desc`
        );
        const normalized = this.normalizeListResponse(res.data);
        if (normalized.data.length > 0) {
            await this.safeSetCache(cacheKey, normalized, 604800); // 7 hari
        }
        return normalized;
    }

    public async getComicUpdate(type: string, page: number = 1, pageSize: number = 19) {
        const cacheKey = `comic_update_${type}_${page}_${pageSize}`;
        const cached = await this.safeGetCache<ApiResponse<UpdateComic>>(cacheKey);
        if (cached && Array.isArray(cached.data)) return this.normalizeListResponse(cached);

        const res: { data: ApiResponse<UpdateComic> } = await this.client.get(
            `${getEnv().API_URL}/manga/list?type=${type}&page=${page}&page_size=${pageSize}&is_update=true&sort=latest&sort_order=desc`
        );
        const normalized = this.normalizeListResponse(res.data);
        if (normalized.data.length > 0) {
            await this.safeSetCache(cacheKey, normalized, 600); // 10 menit
        }
        return normalized;
    }

    public async getComicStatus(status: string) {
        const cacheKey = `comic_status_${status}`;
        const cached = await this.safeGetCache<ApiResponse<Comic>>(cacheKey);
        if (cached && Array.isArray(cached.data)) return this.normalizeListResponse(cached);

        const res: { data: ApiResponse<Comic> } = await this.client.get(
            `${getEnv().API_URL}/manga/list?page=1&page_size=24&genre_include_mode=or&genre_exclude_mode=or&status=${status}&sort=latest&sort_order=desc`
        );
        const normalized = this.normalizeListResponse(res.data);
        if (normalized.data.length > 0) {
            await this.safeSetCache(cacheKey, normalized, 86400); // 1 hari
        }
        return normalized;
    }

    public async getGenreList(): Promise<ApiResponse<TaxonomyItem>> {
        const cacheKey = "genre_list";
        const cached = await this.safeGetCache<ApiResponse<TaxonomyItem>>(cacheKey);
        if (cached && Array.isArray(cached.data)) return this.normalizeListResponse(cached);

        const res: { data: ApiResponse<TaxonomyItem> } = await this.client.get(
            `${getEnv().API_URL}/genre/list`
        );
        const normalized = this.normalizeListResponse(res.data);
        if (normalized.data.length > 0) {
            await this.safeSetCache(cacheKey, normalized, 604800); // 7 hari
        }
        return normalized;
    }

    public async getComicGenre(genre: string) {
        const cacheKey = `comic_genre_${genre}`;
        const cached = await this.safeGetCache<ApiResponse<Comic>>(cacheKey);
        if (cached && Array.isArray(cached.data)) return this.normalizeListResponse(cached);

        const res: { data: ApiResponse<Comic> } = await this.client.get(
            `${getEnv().API_URL}/manga/list?page=1&page_size=24&genre_include=${genre}&genre_include_mode=or&genre_exclude_mode=or&sort=latest&sort_order=desc`
        );
        const normalized = this.normalizeListResponse(res.data);
        if (normalized.data.length > 0) {
            await this.safeSetCache(cacheKey, normalized, 172800); // 2 hari
        }
        return normalized;
    }

    public async getPopularComic(page: number = 1, pageSize: number = 16) {
        const cacheKey = `popular_comic_${page}_${pageSize}`;
        const cached = await this.safeGetCache<ApiResponse<PopularComic>>(cacheKey);
        if (cached && Array.isArray(cached.data)) return this.normalizeListResponse(cached);

        const res: { data: ApiResponse<PopularComic> } = await this.client.get(
            `${getEnv().API_URL}/manga/top?filter=all_time&page=${page}&page_size=${pageSize}`
        );
        const normalized = this.normalizeListResponse(res.data);
        if (normalized.data.length > 0) {
            await this.safeSetCache(cacheKey, normalized, 172800); // 2 hari
        }
        return normalized;
    }

    public async getComicDetail(comicId: string) {
        const cacheKey = `comic_detail_${comicId}`;
        const cached = await this.safeGetCache<ApiResponseDetail<ComicDetail>>(cacheKey);
        if (cached) return cached;

        const res: { data: ApiResponseDetail<ComicDetail> } = await this.client.get(
            `${getEnv().API_URL}/manga/detail/${comicId}`
        );
        await this.safeSetCache(cacheKey, res.data, 7200); // 2 jam
        return res.data;
    }

    public async getChapterList(comicId: string, page: number = 1, pageSize: number = 24) {
        const cacheKey = `chapter_list_${comicId}_${page}_${pageSize}`;
        const cached = await this.safeGetCache<ApiResponse<ChapterList>>(cacheKey);
        if (cached && Array.isArray(cached.data) && cached.data.length > 0) {
            return this.normalizeListResponse(cached);
        }

        const res: { data: ApiResponse<ChapterList> } = await this.client.get(
            `${getEnv().API_URL}/chapter/${comicId}/list?page=${page}&page_size=${pageSize}&sort_by=chapter_number&sort_order=desc`
        );
        const normalized = this.normalizeListResponse(res.data);
        if (normalized.data.length > 0) {
            await this.safeSetCache(cacheKey, normalized, 3600); // 1 jam
        }
        return normalized;
    }

    public async getChapterDetail(chapterId: string) {
        const cacheKey = `chapter_detail_${chapterId}`;
        const cached = await this.safeGetCache<ApiResponseDetail<ChapterDetail>>(cacheKey);
        if (cached) return cached;

        const res: { data: ApiResponseDetail<ChapterDetail> } = await this.client.get(
            `${getEnv().API_URL}/chapter/detail/${chapterId}`
        );
        await this.safeSetCache(cacheKey, res.data, 21600); // 6 jam
        return res.data;
    }

    public async searchComic(q: string, page: number = 1, pageSize: number = 12) {
        if (!q || !q.trim()) {
            return this.normalizeListResponse<Comic>(null);
        }
        const cacheKey = `comic_search_${encodeURIComponent(q.trim())}_${page}_${pageSize}`;
        const cached = await this.safeGetCache<ApiResponse<Comic>>(cacheKey);
        if (cached && Array.isArray(cached.data)) return this.normalizeListResponse(cached);

        const res: { data: ApiResponse<Comic> } = await this.client.get(
            `${getEnv().API_URL}/manga/list?page=${page}&page_size=${pageSize}&q=${encodeURIComponent(q.trim())}`
        );
        const normalized = this.normalizeListResponse(res.data);
        if (normalized.data.length > 0) {
            await this.safeSetCache(cacheKey, normalized, 3600); // 1 jam
        }
        return normalized;
    }
}

export const shinigamiService = new ShinigamiService();