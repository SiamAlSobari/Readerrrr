import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/cover")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const { searchParams } = new URL(request.url);
        const rawUrl = searchParams.get("url");

        if (!rawUrl) {
          return new Response("Missing url parameter", { status: 400 });
        }

        let parsed: URL;
        try {
          parsed = new URL(rawUrl);
        } catch {
          return new Response("Invalid url parameter", { status: 400 });
        }

        if (parsed.protocol !== "https:" && parsed.protocol !== "http:") {
          return new Response("Unsupported protocol", { status: 400 });
        }

        // Prevent SSRF to localhost / private networks
        const host = parsed.hostname.toLowerCase();
        if (
          host === "localhost" ||
          host === "127.0.0.1" ||
          host === "0.0.0.0" ||
          host.startsWith("192.168.") ||
          host.startsWith("10.") ||
          host.endsWith(".local")
        ) {
          return new Response("Forbidden host", { status: 403 });
        }

        try {
          const upstream = await fetch(parsed.toString(), {
            headers: {
              Accept: "image/webp,image/avif,image/apng,image/*,*/*;q=0.8",
              "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
            },
            redirect: "follow",
          });

          if (!upstream.ok) {
            return new Response("Upstream image fetch failed", {
              status: upstream.status,
            });
          }

          const contentType =
            upstream.headers.get("content-type") || "image/jpeg";
          const buffer = await upstream.arrayBuffer();

          return new Response(buffer, {
            status: 200,
            headers: {
              "Content-Type": contentType,
              "Cache-Control": "public, max-age=604800, s-maxage=604800, immutable",
              "Access-Control-Allow-Origin": "*",
            },
          });
        } catch {
          return new Response("Error fetching cover", { status: 502 });
        }
      },
    },
  },
});
