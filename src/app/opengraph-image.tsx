import { ImageResponse } from "next/og";

export const alt = "Alvin · 獨立工程師作品集";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function fetchWithRetry(
  url: string,
  { attempts = 3, timeoutMs = 8000 }: { attempts?: number; timeoutMs?: number } = {}
): Promise<Response> {
  let lastErr: unknown;
  for (let i = 0; i < attempts; i++) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const res = await fetch(url, { signal: controller.signal });
      clearTimeout(timer);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res;
    } catch (err) {
      clearTimeout(timer);
      lastErr = err;
      if (i < attempts - 1) await new Promise((r) => setTimeout(r, 500 * (i + 1)));
    }
  }
  throw lastErr instanceof Error ? lastErr : new Error(String(lastErr));
}

async function loadGoogleFont(family: string, text: string, weight: number) {
  const url = `https://fonts.googleapis.com/css2?family=${family}:wght@${weight}&text=${encodeURIComponent(
    text
  )}&display=swap`;
  const css = await (await fetchWithRetry(url)).text();
  const resource = css.match(
    /src: url\((.+?)\) format\('(?:opentype|truetype|woff2?)'\)/
  );
  if (!resource) throw new Error(`Cannot load font: ${family}`);
  return (await fetchWithRetry(resource[1])).arrayBuffer();
}

export default async function OpengraphImage() {
  const headline = "用程式碼讓世界更便利";
  const sub = "Alvin · 獨立工程師 · LINE 生態系 / AI 應用 / 全端網站";
  const eyebrow = "PORTFOLIO · 目前接案中";
  const allText = headline + sub + eyebrow;

  const [bold, regular] = await Promise.all([
    loadGoogleFont("Noto+Sans+TC", allText, 600),
    loadGoogleFont("Noto+Sans+TC", allText, 400),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#fafafa",
          padding: "80px 88px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: 999,
              background: "#10b981",
            }}
          />
          <div
            style={{
              fontSize: 22,
              color: "#71717a",
              letterSpacing: "0.2em",
              fontWeight: 400,
            }}
          >
            {eyebrow}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          <div
            style={{
              fontSize: 104,
              fontWeight: 600,
              color: "#18181b",
              lineHeight: 1.12,
              letterSpacing: "-0.03em",
            }}
          >
            {headline}
          </div>
          <div
            style={{
              fontSize: 30,
              color: "#52525b",
              lineHeight: 1.4,
              fontWeight: 400,
            }}
          >
            {sub}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Noto Sans TC", data: bold, style: "normal", weight: 600 },
        { name: "Noto Sans TC", data: regular, style: "normal", weight: 400 },
      ],
    }
  );
}
