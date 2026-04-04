import "./loadEnv.js";
import express from "express";
import chatRoutes from "../backend/routes/chatRoutes.js";
import disasterRoutes from "../backend/routes/disasterRoutes.js";
import { connectDatabase } from "../backend/config/database.js";
import { startDisasterMonitor } from "../backend/cron/disasterMonitor.js";

const app = express();
const PORT = Number(process.env.PORT || 8787);

app.use(express.json({ limit: "1mb" }));

const WEATHER_API_KEY = process.env.WEATHER_API_KEY || process.env.FEATHER_API_KEY;
const WEATHER_BASE_URL = process.env.WEATHER_BASE_URL || "https://api.openweathermap.org";

function toNumber(value) {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string") {
    const parsed = Number(value.replace(/[^0-9.-]/g, ""));
    if (Number.isFinite(parsed)) {
      return parsed;
    }
  }

  return null;
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function deriveRiskLevel(aqi, temperatureC, rainProbability) {
  if (aqi >= 180 || temperatureC >= 40 || rainProbability >= 80) {
    return "high";
  }

  if (aqi >= 110 || temperatureC >= 34 || rainProbability >= 50) {
    return "medium";
  }

  return "low";
}

function mapOpenWeatherAqi(aqiScale) {
  switch (aqiScale) {
    case 1:
      return 40;
    case 2:
      return 80;
    case 3:
      return 130;
    case 4:
      return 190;
    case 5:
      return 260;
    default:
      return 120;
  }
}

async function delay(ms) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchJsonWithRetry(url, retries = 2) {
  let lastError = null;

  for (let attempt = 0; attempt <= retries; attempt += 1) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: { Accept: "application/json" },
        signal: controller.signal,
      });

      if (response.ok) {
        return await response.json();
      }

      const shouldRetry = response.status >= 500 || response.status === 429;
      if (!shouldRetry || attempt === retries) {
        throw new Error(`Weather API request failed with status ${response.status}`);
      }

      await delay((attempt + 1) * 600);
    } catch (error) {
      lastError = error instanceof Error ? error : new Error("Unknown Weather API error");
      if (attempt === retries) {
        break;
      }
      await delay((attempt + 1) * 600);
    } finally {
      clearTimeout(timeoutId);
    }
  }

  throw new Error(lastError?.message || "Could not fetch weather data");
}

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.use("/api/chat", chatRoutes);
app.use("/api/disasters", disasterRoutes);

app.get("/api/weather/data", async (req, res) => {
  try {
    if (!WEATHER_API_KEY) {
      return res.status(500).json({ message: "Missing WEATHER_API_KEY (or FEATHER_API_KEY) in environment." });
    }

    const location = typeof req.query.location === "string" && req.query.location.trim() ? req.query.location.trim() : "Delhi";

    const currentUrl = `${WEATHER_BASE_URL}/data/2.5/weather?q=${encodeURIComponent(location)}&appid=${WEATHER_API_KEY}&units=metric`;
    const current = await fetchJsonWithRetry(currentUrl, 2);

    const lat = toNumber(current?.coord?.lat);
    const lon = toNumber(current?.coord?.lon);

    if (lat === null || lon === null) {
      return res.status(502).json({ message: "Weather API did not return valid coordinates." });
    }

    const forecastUrl = `${WEATHER_BASE_URL}/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric&cnt=1`;
    const airUrl = `${WEATHER_BASE_URL}/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`;

    const [forecastResult, airResult] = await Promise.allSettled([
      fetchJsonWithRetry(forecastUrl, 2),
      fetchJsonWithRetry(airUrl, 2),
    ]);

    const forecast = forecastResult.status === "fulfilled" ? forecastResult.value : null;
    const air = airResult.status === "fulfilled" ? airResult.value : null;

    const temperatureC = clamp(toNumber(current?.main?.temp) ?? 32, -50, 60);
    const visibilityKm = clamp((toNumber(current?.visibility) ?? 8000) / 1000, 0, 30);
    const pop = forecast?.list?.[0]?.pop;
    const rainProbability = clamp(toNumber(pop) !== null ? toNumber(pop) * 100 : 30, 0, 100);
    const aqi = clamp(mapOpenWeatherAqi(air?.list?.[0]?.main?.aqi), 0, 500);
    const riskLevel = deriveRiskLevel(aqi, temperatureC, rainProbability);

    const condition = current?.weather?.[0]?.description;
    const summary = condition
      ? `Current condition: ${condition}. Live weather and air quality insights.`
      : "Live weather and air quality insights.";

    const updatedAt = current?.dt ? new Date(current.dt * 1000).toISOString() : new Date().toISOString();

    return res.json({
      aqi,
      temperatureC,
      rainProbability,
      visibilityKm,
      riskLevel,
      summary,
      updatedAt,
    });
  } catch (error) {
    return res.status(502).json({
      message: error instanceof Error ? error.message : "Unable to fetch weather data right now.",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Weather proxy listening on http://localhost:${PORT}`);
});

connectDatabase()
  .then(() => {
    startDisasterMonitor();
  })
  .catch((error) => {
    console.error("[database] Connection or monitor start failed:", error);
  });