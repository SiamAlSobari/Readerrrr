
export function getScraperHeaders(baseUrl: string): Record<string, string> {
    return {
        // ===== BASIC =====
        Accept: "application/json, text/plain, */*",
        "Accept-Language": "en-US,en;q=0.9,id;q=0.8",
        DNT: "1",

        // ===== ORIGIN & REFERER =====
        Origin: baseUrl,
        Referer: `${baseUrl}/`,

        // ===== USER AGENT (WAJIB BROWSER) =====
        "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) " +
            "AppleWebKit/537.36 (KHTML, like Gecko) " +
            "Chrome/120.0.0.0 Safari/537.36",

        // ===== FETCH METADATA (PENTING) =====
        "Sec-Fetch-Site": "same-origin",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Dest": "empty",

        // ===== PRIVACY =====
        "Sec-GPC": "1",

        // ===== AJAX =====
        "X-Requested-With": "XMLHttpRequest",

        // ===== OPTIONAL (kadang dipakai) =====
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
    };
}
