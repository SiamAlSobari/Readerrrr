import { ChapterDetail, Comic, PopularComic, UpdateComic } from "@/common/interface";

export const DUMMY_COMICS: Comic[] = [
  {
    manga_id: "c0f1d049-ff7f-474d-8c6a-3a55e4c44147",
    title: "Demonic Emperor",
    alternative_title: "Magic Emperor, 魔皇大管家",
    description:
      "Zhuo Yifan, Demonic Emperor yang dikhianati muridnya sendiri, terlahir kembali sebagai pengurus rumah tangga dan perlahan bangkit kembali ke puncak dunia.",
    country_id: "CN",
    release_year: "2019",

    cover_image_url:
      "https://storage.shngm.id/low/unsafe/filters:format(webp):quality(70)/thumbnail/image/8c4fdbee-ffb8-427d-ace7-f21fe6b72f77.jpg",
    cover_portrait_url:
      "https://storage.shngm.id/low/unsafe/filters:format(webp):quality(70)/thumbnail/image/d00e4253-656d-481e-b3ef-701e4c6d451e.jpg",

    bookmark_count: 37962,
    view_count: 54826491,
    rank: 1,

    status: 1,
    is_recommended: true,
    user_rate: 8.6,

    latest_chapter_id: "acdad680-7ec5-4a0b-bd5c-220b3c3c3602",
    latest_chapter_number: 797,
    latest_chapter_time: "2025-12-27T01:07:36Z",

    created_at: "2024-11-23T22:43:06Z",
    updated_at: "2025-12-27T17:11:32Z",
    deleted_at: null,

    taxonomy: {
      Artist: [{ name: "Wuer Manhua", slug: "wuer-manhua" }],
      Author: [
        { name: "Wuer Manhua", slug: "wuer-manhua" },
        { name: "Ye Xiao", slug: "ye-xiao" },
      ],
      Format: [{ name: "Manhua", slug: "manhua" }],
      Genre: [
        { name: "Action", slug: "action" },
        { name: "Adventure", slug: "adventure" },
        { name: "Fantasy", slug: "fantasy" },
      ],
      Type: [{ name: "Project", slug: "project" }],
    },
  },

  {
    manga_id: "db3daa3b-3799-40c4-b4b7-fc06b0cbba8d",
    title: "My Disciples Are All Big Villains",
    alternative_title: "My Apprentices Are All Great Villains",
    description:
      "Lu Zhou terbangun sebagai patriark jahat terkuat dengan sembilan murid super berbahaya. Tanpa basis kultivasi, ia harus bertahan hidup di antara para muridnya.",
    country_id: "CN",
    release_year: "2022",

    cover_image_url:
      "https://storage.shngm.id/thumbnail/cover/3adb88c47fed.jpeg",
    cover_portrait_url: "",

    bookmark_count: 8455,
    view_count: 9341731,
    rank: 77,

    status: 1,
    is_recommended: true,
    user_rate: 0,

    latest_chapter_id: "44065e64-9fdf-4e4d-877c-9ae22a7a17e2",
    latest_chapter_number: 458,
    latest_chapter_time: "2025-12-27T17:22:39Z",

    created_at: "2024-11-23T11:38:00Z",
    updated_at: "2025-12-27T17:22:40Z",
    deleted_at: null,

    taxonomy: {
      Artist: [{ name: "月天", slug: "yue-tian" }],
      Author: [{ name: "月天", slug: "yue-tian" }],
      Format: [{ name: "Manhua", slug: "manhua" }],
      Genre: [
        { name: "Action", slug: "action" },
        { name: "Fantasy", slug: "fantasy" },
        { name: "Drama", slug: "drama" },
      ],
      Type: [{ name: "Mirror", slug: "mirror" }],
    },
  },
];


export const POPULAR_COMICS_DUMMY: PopularComic[] = [
  {
    manga_id: "05bbcbc4-56a6-47e6-ac36-1d482339a322",
    title: "Eleceed",
    description:
      "Kaiden, pengguna kemampuan misterius yang bersembunyi di dalam tubuh kucing jalanan, bertemu Jiwoo, siswa SMA baik hati dengan kemampuan khusus.",
    alternative_title: "일렉시드",
    release_year: "2020",
    status: 1,
    cover_image_url:
      "https://storage.shngm.id/low/unsafe/filters:format(webp):quality(70)/thumbnail/image/08d8cb84-973a-4995-8b3e-bdfd9e305174.jpg",
    cover_portrait_url:
      "https://storage.shngm.id/low/unsafe/filters:format(webp):quality(70)/thumbnail/image/6c83f3db-948b-426f-a0ad-7074d8118632.jpg",
    view_count: 31263730,
    bookmark_count: 56540,
    user_rate: 8.7,
    rank: 2,
    latest_chapter_id: "80ea00b9-5952-40c8-8975-d8d5bacf5ccc",
    latest_chapter_number: 382,
    latest_chapter_time: "2025-12-24T00:06:16Z",
    country_id: "KR",
    created_at: "2024-11-23T21:50:08Z",
    updated_at: "2025-12-27T16:26:37Z",
    deleted_at: null,
  },
  {
    manga_id: "f70af567-5f45-4859-8222-e41eb10ac169",
    title: "Swordmaster’s Youngest Son",
    description:
      "Jin Runcandel, putra bungsu Swordmaster terhebat, mendapat kesempatan kedua dari Dewa untuk membuktikan kekuatannya.",
    alternative_title:
      "The Swordmaster's Son; 검술명가 막내아들",
    release_year: "2022",
    status: 1,
    cover_image_url:
      "https://storage.shngm.id/low/unsafe/filters:format(webp):quality(70)/thumbnail/image/2068be5a-410a-46cc-ae9f-580aeb7dd0a9.jpg",
    cover_portrait_url:
      "https://storage.shngm.id/low/unsafe/filters:format(webp):quality(70)/thumbnail/image/9dadcd86-4ee5-4b94-90f3-be19955078a8.jpg",
    view_count: 30529540,
    bookmark_count: 41202,
    user_rate: 9.9,
    rank: 3,
    latest_chapter_id: "a71517fc-726b-4371-aeae-593f6479e00a",
    latest_chapter_number: 191,
    latest_chapter_time: "2025-12-27T14:33:56Z",
    country_id: "KR",
    created_at: "2024-11-23T12:52:32Z",
    updated_at: "2025-12-27T16:42:32Z",
    deleted_at: null,
  },
  {
    manga_id: "6193d77a-1470-4365-9663-33027409325f",
    title: "The Greatest Estate Developer",
    description:
      "Seorang insinyur sipil bereinkarnasi menjadi bangsawan dan harus menyelamatkan wilayahnya dengan ilmu teknik.",
    alternative_title:
      "The World's Best Engineer, 대급 영지 설계사",
    release_year: "2021",
    status: 1,
    cover_image_url:
      "https://storage.shngm.id/thumbnail/cover/873573ffed79.jpeg",
    cover_portrait_url:
      "https://storage.shngm.id/low/unsafe/filters:format(webp):quality(70)/thumbnail/image/1fc811da-99f2-4fe8-9c34-c9d7f12185ec.jpg",
    view_count: 30014281,
    bookmark_count: 56470,
    user_rate: 9.5,
    rank: 4,
    latest_chapter_id: "f4c2a3b2-1f1d-40b3-8ed9-8e9895d0f2ba",
    latest_chapter_number: 221,
    latest_chapter_time: "2025-12-25T16:22:21Z",
    country_id: "KR",
    created_at: "2024-11-23T22:32:08Z",
    updated_at: "2025-12-27T16:35:36Z",
    deleted_at: null,
  },
  {
    manga_id: "f166beb7-67d8-47ea-9fa2-54aea1df6dd7",
    title: "The Villain Of Destiny",
    description:
      "Gu Changge bereinkarnasi sebagai villain dan memanfaatkan sistem untuk merebut takdir protagonis.",
    alternative_title: "I Am The Fated Villain",
    release_year: "2021",
    status: 1,
    cover_image_url:
      "https://storage.shngm.id/low/unsafe/filters:format(webp):quality(70)/thumbnail/image/4629d00c-a3c0-414b-a8bd-b64a53f45723.jpg",
    cover_portrait_url:
      "https://storage.shngm.id/low/unsafe/filters:format(webp):quality(70)/thumbnail/image/e6ba24d4fbd0.jpeg",
    view_count: 25774501,
    bookmark_count: 26027,
    user_rate: 8.7,
    rank: 9,
    latest_chapter_id: "05f1b7cf-219c-49ff-8ea5-22094393bf0b",
    latest_chapter_number: 300,
    latest_chapter_time: "2025-12-23T02:23:00Z",
    country_id: "CN",
    created_at: "2024-11-23T22:16:06Z",
    updated_at: "2025-12-27T16:24:11Z",
    deleted_at: null,
  },
];

export const UPDATE_COMICS_DUMMY: UpdateComic[] =[
  {
    "manga_id": "a1b2c3d4-1111-2222-3333-aaaaaaa0001",
    "title": "Chronicles of the Time Blade",
    "alternative_title": "시간의 검 연대기",
    "description": "Seorang pendekar legendaris terlempar ke masa lalu dan harus memperbaiki takdir yang telah hancur.",
    "release_year": "2025",
    "status": 1,
    "country_id": "KR",
    "cover_image_url": "https://dummyimage.com/600x800/1f2937/ffffff&text=Time+Blade",
    "cover_portrait_url": "",
    "bookmark_count": 3421,
    "view_count": 185432,
    "user_rate": 7.8,
    "rank": 512,
    "is_recommended": false,
    "chapters": [
      {
        "chapter_id": "ch-001",
        "chapter_number": 12,
        "created_at": "2025-12-20T10:12:00Z"
      },
      {
        "chapter_id": "ch-002",
        "chapter_number": 11,
        "created_at": "2025-12-13T09:10:00Z"
      },
      {
        "chapter_id": "ch-003",
        "chapter_number": 10,
        "created_at": "2025-12-06T08:05:00Z"
      }
    ],
    "latest_chapter_id": "ch-001",
    "latest_chapter_number": 12,
    "latest_chapter_time": "2025-12-20T10:12:00Z",
    "taxonomy": {
      "Artist": [{ "name": "Studio Alpha", "slug": "studio-alpha" }],
      "Author": [{ "name": "Kim Han", "slug": "kim-han" }],
      "Format": [{ "name": "Manhwa", "slug": "manhwa" }],
      "Genre": [
        { "name": "Action", "slug": "action" },
        { "name": "Fantasy", "slug": "fantasy" }
      ],
      "Type": [{ "name": "Mirror", "slug": "mirror" }]
    },
    "created_at": "2025-10-01T07:00:00Z",
    "updated_at": "2025-12-20T10:12:00Z",
    "deleted_at": null
  },

  {
    "manga_id": "a1b2c3d4-1111-2222-3333-aaaaaaa0002",
    "title": "Tower Reset Strategy",
    "alternative_title": "나만 아는 탑 리셋 공략",
    "description": "Dunia runtuh dan menara muncul. Hanya satu orang yang tahu cara menyelesaikannya dari awal.",
    "release_year": "2024",
    "status": 1,
    "country_id": "KR",
    "cover_image_url": "https://dummyimage.com/600x800/111827/ffffff&text=Tower+Reset",
    "cover_portrait_url": "",
    "bookmark_count": 8290,
    "view_count": 2450031,
    "user_rate": 0,
    "rank": 210,
    "is_recommended": false,
    "chapters": [
      {
        "chapter_id": "ch-101",
        "chapter_number": 56,
        "created_at": "2025-12-27T17:33:42Z"
      },
      {
        "chapter_id": "ch-102",
        "chapter_number": 55,
        "created_at": "2025-12-20T14:10:00Z"
      },
      {
        "chapter_id": "ch-103",
        "chapter_number": 54,
        "created_at": "2025-12-13T14:10:00Z"
      }
    ],
    "latest_chapter_id": "ch-101",
    "latest_chapter_number": 56,
    "latest_chapter_time": "2025-12-27T17:33:42Z",
    "taxonomy": {
      "Artist": [{ "name": "Redice Studio", "slug": "redice-studio" }],
      "Author": [{ "name": "GoodLuck", "slug": "goodluck" }],
      "Format": [{ "name": "Manhwa", "slug": "manhwa" }],
      "Genre": [
        { "name": "Action", "slug": "action" },
        { "name": "Adventure", "slug": "adventure" },
        { "name": "Fantasy", "slug": "fantasy" }
      ],
      "Type": [{ "name": "Mirror", "slug": "mirror" }]
    },
    "created_at": "2024-11-23T20:58:09Z",
    "updated_at": "2025-12-27T17:33:42Z",
    "deleted_at": null
  },

  {
    "manga_id": "a1b2c3d4-1111-2222-3333-aaaaaaa0003",
    "title": "Rune of Destruction",
    "alternative_title": "파멸의 룬",
    "description": "Rune terkutuk membangkitkan prajurit yang terperangkap selama ratusan tahun.",
    "release_year": "2025",
    "status": 1,
    "country_id": "KR",
    "cover_image_url": "https://dummyimage.com/600x800/020617/ffffff&text=Rune+of+Destruction",
    "cover_portrait_url": "",
    "bookmark_count": 2140,
    "view_count": 345900,
    "user_rate": 7.4,
    "rank": 690,
    "is_recommended": false,
    "chapters": [
      {
        "chapter_id": "ch-201",
        "chapter_number": 18,
        "created_at": "2025-12-27T17:31:53Z"
      },
      {
        "chapter_id": "ch-202",
        "chapter_number": 17,
        "created_at": "2025-12-18T07:02:08Z"
      },
      {
        "chapter_id": "ch-203",
        "chapter_number": 16,
        "created_at": "2025-12-11T07:02:08Z"
      }
    ],
    "latest_chapter_id": "ch-201",
    "latest_chapter_number": 18,
    "latest_chapter_time": "2025-12-27T17:31:53Z",
    "taxonomy": {
      "Artist": [{ "name": "Kang Han", "slug": "kang-han" }],
      "Author": [{ "name": "Kang Han", "slug": "kang-han" }],
      "Format": [{ "name": "Manhwa", "slug": "manhwa" }],
      "Genre": [
        { "name": "Action", "slug": "action" },
        { "name": "Fantasy", "slug": "fantasy" }
      ],
      "Type": [{ "name": "Mirror", "slug": "mirror" }]
    },
    "created_at": "2025-08-28T20:49:34Z",
    "updated_at": "2025-12-27T17:31:54Z",
    "deleted_at": null
  }
]



export const DUMMY_COMIC_DETAIL = {
  manga_id: "84561956-c987-491d-a189-ba1af3c22810",
  title: "Became The Patron Of Villains",
  alternative_title: "악당들의 후원자가 되었다",
  description: `Aku, seorang budak yang bereinkarnasi menjadi seorang bangsawan di dalam game.

Tapi katanya aku cuma karakter figuran yang nanti akan mati dibunuh oleh para penjahat masa depan?

Tidak bisa begitu! Aku akan menuntun mereka ke jalan yang benar dan menikmati hidup mewah sebagai bangsawan!

Untuk mencegah para calon penjahat kecil itu berubah menjadi jahat, aku menjadi dermawan dan membantu mereka mengatasi lingkungan yang keras.

Hasilnya? Mereka semua tumbuh menjadi anak-anak yang luar biasa dan… sepenuhnya normal.

Namun pada akhirnya...

Aku malah menjadi dalang terakhir dari kerajaan.

…Hah?`,
  release_year: "2025",
  status: 1,
  country_id: "KR",
  cover_image_url:
    "https://storage.shngm.id/low/unsafe/filters:format(webp):quality(70)/thumbnail/image/06b7fcc3-026d-47e5-b12d-78e68f8547fd.jpg",
  cover_portrait_url:
    "https://storage.shngm.id/low/unsafe/filters:format(webp):quality(70)/thumbnail/image/f1e0bd9d-fa26-4d0b-88f0-2de2d2321f76.jpg",
  view_count: 2045733,
  user_rate: 8.5,
  bookmark_count: 31199,
  rank: 259,
  latest_chapter_number: 15,
  taxonomy: {
    Genre: [
      { slug: "action", name: "Action" },
      { slug: "fantasy", name: "Fantasy" },
      { slug: "drama", name: "Drama" },
    ],
    Author: [
      { slug: "menyusul", name: "Menyusul" },
    ],
    Artist: [
      { slug: "menyusul-0", name: "Menyusul" },
    ],
    Format: [
      { slug: "manhwa", name: "Manhwa" },
    ],
    Type: [
      { slug: "project", name: "Project" },
    ],
  },
}


export const DUMMY_CHAPTERS = [
  {
    chapter_id: "95eacb40-1532-42bd-b39f-87ce42a00dce",
    chapter_number: 15,
    thumbnail_image_url:
      "https://storage.shngm.id/low/unsafe/filters:format(webp):quality(70)/thumbnail/image/c930004a-4a23-45a9-ae6a-57d5606936de.jpg",
    view_count: 89258,
    release_date: "2025-12-26T08:50:30Z",
  },
  {
    chapter_id: "ff2d34aa-cd5d-490c-8768-87f7e2597153",
    chapter_number: 14,
    thumbnail_image_url:
      "https://storage.shngm.id/low/unsafe/filters:format(webp):quality(70)/thumbnail/image/13037c47-6e77-421f-8585-8c21ea4fda89.jpg",
    view_count: 121499,
    release_date: "2025-12-19T13:25:28Z",
  },
  {
    chapter_id: "5f3edd2c-0810-478b-bca2-834b2d257e96",
    chapter_number: 13,
    thumbnail_image_url:
      "https://storage.shngm.id/low/unsafe/filters:format(webp):quality(70)/thumbnail/image/0de53d63-5526-4be1-a549-be929f02c176.jpg",
    view_count: 141760,
    release_date: "2025-12-12T11:32:28Z",
  },
  {
    chapter_id: "8a5674eb-c0ca-44dc-8e35-b61484d9162e",
    chapter_number: 12,
    thumbnail_image_url:
      "https://storage.shngm.id/low/unsafe/filters:format(webp):quality(70)/thumbnail/image/c38096a6-b045-4a7c-aa3d-4bc76b1a7048.jpg",
    view_count: 156241,
    release_date: "2025-12-05T09:24:26Z",
  },
  {
    chapter_id: "5545204a-f5ed-406f-ae7a-971dd63a7cd6",
    chapter_number: 11,
    thumbnail_image_url:
      "https://storage.shngm.id/low/unsafe/filters:format(webp):quality(70)/thumbnail/image/97afaa79-36ce-4ed2-83d2-cb66d5f03856.jpg",
    view_count: 154440,
    release_date: "2025-11-28T18:33:16Z",
  },
]

export const DUMMY_CHAPTER_DETAIL: ChapterDetail = {
  chapter_id: 'a71517fc-726b-4371-aeae-593f6479e00a',
  manga_id: 'f70af567-5f45-4859-8222-e41eb10ac169',
  chapter_number: 191,
  chapter_title: '',
  base_url: 'https://delivery.shngm.id',
  base_url_low:
    'https://delivery.shngm.id/low/unsafe/filters:format(webp):quality(70)',
  chapter: {
    path: '/chapter/manga_f70af567-5f45-4859-8222-e41eb10ac169/chapter_a71517fc-726b-4371-aeae-593f6479e00a/',
    data: [
      '00-583379.jpg',
      '01-e42fbb.jpg',
      '02-48e508.jpg',
      '03-05230b.jpg',
      '04-92594a.jpg',
      '05-de9a6c.jpg',
      '06-946ebc.jpg',
    ],
  },
  thumbnail_image_url:
    'https://storage.shngm.id/low/unsafe/filters:format(webp):quality(70)/thumbnail/image/1b1f854d-bdff-49d0-95a4-f73efd6edc67.jpg',
  view_count: 81020,
  prev_chapter_id: '1458673d-b8ce-4a6e-a5db-5966b2959701',
  prev_chapter_number: 190,
  next_chapter_id: null,
  next_chapter_number: null,
  release_date: '2025-12-27T14:33:56Z',
  created_at: '2025-12-27T14:33:56Z',
  updated_at: '2025-12-30T15:50:53Z',
}

