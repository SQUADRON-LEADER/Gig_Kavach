type RiskLevel = "low" | "medium" | "high";

export interface FeatherRiskData {
  aqi: number;
  temperatureC: number;
  rainProbability: number;
  visibilityKm: number;
  riskLevel: RiskLevel;
  summary: string;
  updatedAt: string;
}

const WEATHER_PROXY_BASE = import.meta.env.VITE_WEATHER_PROXY_BASE ?? "";

function toNumber(...values: unknown[]): number | null {
  for (const value of values) {
    if (typeof value === "number" && Number.isFinite(value)) {
      return value;
    }

    if (typeof value === "string") {
      const parsed = Number(value.replace(/[^0-9.-]/g, ""));
      if (Number.isFinite(parsed)) {
        return parsed;
      }
    }
  }

  return null;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function deriveRiskLevel(aqi: number, temperatureC: number, rainProbability: number): RiskLevel {
  if (aqi >= 180 || temperatureC >= 40 || rainProbability >= 80) {
    return "high";
  }

  if (aqi >= 110 || temperatureC >= 34 || rainProbability >= 50) {
    return "medium";
  }

  return "low";
}

function normalizeProxyRiskData(raw: unknown): FeatherRiskData {
  const payload = (raw as Record<string, unknown>)?.data ?? (raw as Record<string, unknown>);

  const aqi = clamp(toNumber((payload as Record<string, unknown>)?.aqi) ?? 120, 0, 500);
  const temperatureC = clamp(toNumber((payload as Record<string, unknown>)?.temperatureC) ?? 32, -50, 60);
  const rainProbability = clamp(toNumber((payload as Record<string, unknown>)?.rainProbability) ?? 30, 0, 100);
  const visibilityKm = clamp(toNumber((payload as Record<string, unknown>)?.visibilityKm) ?? 8, 0, 30);
  const riskLevelRaw = (payload as Record<string, unknown>)?.riskLevel;
  const riskLevel: RiskLevel = riskLevelRaw === "low" || riskLevelRaw === "medium" || riskLevelRaw === "high"
    ? riskLevelRaw
    : deriveRiskLevel(aqi, temperatureC, rainProbability);

  const summaryRaw = (payload as Record<string, unknown>)?.summary;
  const summary = typeof summaryRaw === "string" ? summaryRaw : "Live weather and air quality insights.";

  const updatedAtRaw = (payload as Record<string, unknown>)?.updatedAt;
  const updatedAt = typeof updatedAtRaw === "string" ? updatedAtRaw : new Date().toISOString();

  return { aqi, temperatureC, rainProbability, visibilityKm, riskLevel, summary, updatedAt };
}

async function delay(ms: number): Promise<void> {
  await new Promise((resolve) => window.setTimeout(resolve, ms));
}

async function fetchWithRetry(url: string, retries = 2): Promise<Response> {
  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= retries; attempt += 1) {
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 10_000);

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: { Accept: "application/json" },
        signal: controller.signal,
      });

      if (response.ok) {
        return response;
      }

      const shouldRetry = response.status >= 500 || response.status === 429;
      if (!shouldRetry || attempt === retries) {
        throw new Error(`Weather API request failed with status ${response.status}.`);
      }

      await delay((attempt + 1) * 600);
    } catch (error) {
      lastError = error instanceof Error ? error : new Error("Unknown Weather API error.");
      if (attempt === retries) {
        break;
      }
      await delay((attempt + 1) * 600);
    } finally {
      window.clearTimeout(timeoutId);
    }
  }

  throw new Error(lastError?.message ?? "Could not fetch weather data.");
}

export async function getFeatherRiskData(location: string): Promise<FeatherRiskData> {
  const endpoint = `${WEATHER_PROXY_BASE}/api/weather/data?location=${encodeURIComponent(location)}`;
  const response = await fetchWithRetry(endpoint, 2);
  const json = await response.json();
  return normalizeProxyRiskData(json);
}