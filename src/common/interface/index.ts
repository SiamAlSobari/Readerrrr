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

