# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Pembaca manga, manhwa, dan manhua berbahasa Indonesia di perangkat mobile maupun desktop yang menginginkan akses cepat ke rilisan chapter terbaru maupun katalog populer tanpa gangguan iklan pop-up, dengan pelacakan progres baca otomatis.

## Product Purpose

KOMIK READER adalah aplikasi web pembaca komik digital (Manga Jepang, Manhwa Korea, dan Manhua Tiongkok) yang menyajikan katalog rilisan terbaru, peringkat populer, eksplorasi genre, dan ruang baca vertikal berkecepatan tinggi.

## Positioning

Pengalaman membaca komik langsung yang menggabungkan kurasi katalog live (cached via Redis di sisi server) dengan panggung visual interaktif 3D serta ruang baca (reader) yang dioptimalkan untuk kecepatan memuat halaman gambar dan pencatatan riwayat baca otomatis di perangkat pengguna.

## Operating Context

Pengguna mengunjungi halaman utama untuk melihat rilisan komik yang sedang hangat, memutar atau memilih volume komik di panggung 3D, mengecek daftar chapter yang baru rilis hari ini, atau langsung mencari judul/genre spesifik untuk dibaca secara maraton di layar ponsel maupun monitor desktop.

## Capabilities and Constraints

- Katalog live dari backend melalui TanStack Start Server Functions (`getPopularComic`, `getComicUpdate`, `getComicRecommendation`, `getComicDetail`, `getChapterDetail`, `searchComicServer`).
- Eksplorasi berdasarkan genre (`/genre`), rilisan terbaru (`/update`), komik populer (`/popular`), katalog utama (`/home`), dan riwayat baca (`/history`).
- Pencarian cepat komik terintegrasi dengan pintasan keyboard `⌘K` / `Ctrl+K`.
- Tidak ada sistem akun/login berbayar (100% gratis, riwayat tersimpan di `localStorage`).

## Brand Commitments

- Nama: **KOMIK READER** (`COMICREADER`).
- Arah visual landing page yang dipilih pengguna: **3D Interactive Manga Volumes & Panel Stage** berbasis **Three.js / React Three Fiber WebGL** dengan karakter cetak editorial komik (Tankōbon spine depth, panel komik berlapis, aksen vermilion/merah tinta di atas kanvas gelap pekat) dan bebas dari klise AI slop.

## Evidence on Hand

- Data komik real-time dari API (`manga_id`, `title`, `cover_image_url`, `latest_chapter_number`, `latest_chapter_id`, `latest_chapter_time`, `user_rate`, `view_count`, `taxonomy` Genre/Format/Author).
- Aset ikon aplikasi: `/komik_reader.png`.
- Absensi yang pantang difabrikasi: dilarang menampilkan angka klaim tak berdasar (seperti "10,000+ Judul", "100K+ Pembaca Aktif"), testimoni fiktif, atau tombol mati.

## Product Principles

1. **Tunjukkan Komiknya, Bukan Klaimnya:** Pengunjung datang untuk membaca komik. Panggung utama wajib langsung memamerkan volume komik asli yang sedang tren beserta akses instan untuk membaca atau melihat detail seri.
2. **Karakter Fisik Tankōbon & Panel Komik:** Setiap elemen visual (mulai dari punggung buku 3D di kanvas WebGL hingga pembatas asimetris bergaya panel manga) harus terasa seperti artefak komik nyata, bukan template landing page SaaS.
3. **Interaktivitas yang Bermakna:** Setiap klik pada objek 3D maupun panel di landing page memilih komik aktif, memperbarui panel inspeksi seri, atau mengarahkan langsung ke halaman baca/seri yang valid.
4. **Cepat & Tangguh di Semua Perangkat:** Kanvas 3D WebGL di-lazy-load dengan fallback anggun serta mendukung penuh kontrol sentuh (touch) di mobile dan aksesibilitas keyboard.

## Accessibility & Inclusion

- Kontras warna wajib memenuhi WCAG AA (minimal 4.5:1 untuk teks isi dan 3:1 untuk teks judul besar serta batas kontrol interaktif).
- Seluruh kontrol dan pilihan volume komik di panggung 3D memiliki padanan tombol HTML yang dapat diakses dengan keyboard (`Tab`, `Enter`, `Space`) dan pembaca layar.
- Tata letak merespons secara khusus dari layar ponsel sempit hingga layar lebar desktop tanpa overflow horizontal.
