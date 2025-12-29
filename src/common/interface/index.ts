export interface ApiResponse<T> {
  retcode: number;
  message: string;
  meta: Meta;
  data: T[];
}

export interface Meta {
  request_id: string;
  timestamp: number;
  process_time: string;
  page: number;
  page_size: number;
  total_page: number;
  total_record: number;
}


export interface Comic {
  manga_id: string;
  title: string;
  alternative_title: string;

  description: string;
  country_id: string;
  release_year: string;

  cover_image_url: string;
  cover_portrait_url: string;

  bookmark_count: number;
  view_count: number;
  rank: number;

  status: number;
  is_recommended: boolean;
  user_rate: number;

  latest_chapter_id: string;
  latest_chapter_number: number;
  latest_chapter_time: string;

  created_at: string;
  updated_at: string;
  deleted_at: string | null;

  taxonomy: Taxonomy;
}

export interface PopularComic {
  manga_id: string;
  title: string;
  alternative_title: string;

  description: string;
  release_year: string;
  status: number;

  country_id: "KR" | "JP" | "CN";

  cover_image_url: string;
  cover_portrait_url: string;

  view_count: number;
  bookmark_count: number;
  rank: number;
  user_rate: number;

  latest_chapter_id: string;
  latest_chapter_number: number;
  latest_chapter_time: string;

  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}


export interface UpdateComic {
  manga_id: string;
  title: string;
  alternative_title: string;

  description: string;
  release_year: string;
  status: number;

  country_id: "KR" | "JP" | "CN" | string;

  cover_image_url: string;
  cover_portrait_url: string;

  bookmark_count: number;
  view_count: number;
  user_rate: number;
  rank: number;

  is_recommended: boolean;

  chapters: Chapter[];

  latest_chapter_id: string;
  latest_chapter_number: number;
  latest_chapter_time: string;

  taxonomy: Taxonomy;

  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface Chapter {
  chapter_id: string;
  chapter_number: number;
  created_at: string; // ISO date
}

export interface ComicDetail {
  manga_id: string
  title: string
  description: string
  alternative_title: string
  release_year: string
  status: number
  cover_image_url: string
  cover_portrait_url: string
  view_count: number
  user_rate: number
  latest_chapter_id: string
  latest_chapter_number: number
  latest_chapter_time: string // ISO string
  country_id: string
  bookmark_count: number
  rank: number
  taxonomy: Taxonomy
  created_at: string
  updated_at: string
  deleted_at: string | null
}

export interface ChapterList {
  chapter_id: string
  manga_id: string
  chapter_title: string
  chapter_number: number
  thumbnail_image_url: string
  view_count: number
  release_date: string // ISO string
}

export interface Taxonomy {
  Artist?: TaxonomyItem[];
  Author?: TaxonomyItem[];
  Genre?: TaxonomyItem[];
  Format?: TaxonomyItem[];
  Type?: TaxonomyItem[];
}


export interface TaxonomyItem {
  name: string;
  slug: string;
}

