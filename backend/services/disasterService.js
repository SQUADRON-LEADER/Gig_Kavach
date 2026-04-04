import axios from "axios";

const DISASTER_API_KEY = process.env.DISASTER_API_KEY;
const DISASTER_API_BASE_URL = process.env.DISASTER_API_BASE_URL || "";
const DISASTER_API_ALERTS_PATH = process.env.DISASTER_API_ALERTS_PATH || "/alerts";
const DISASTER_API_ACTIVE_PATH = process.env.DISASTER_API_ACTIVE_PATH || "/alerts/active";
const DISASTER_API_TIMEOUT = Number(process.env.DISASTER_API_TIMEOUT_MS || 10000);
const DISASTER_API_DEFAULT_REGION = process.env.DISASTER_DEFAULT_REGION || "Delhi";
const DISASTER_API_SOURCE = process.env.DISASTER_API_SOURCE || "Disaster API";
const WEATHER_API_KEY = process.env.WEATHER_API_KEY || process.env.FEATHER_API_KEY;
const WEATHER_BASE_URL = process.env.WEATHER_BASE_URL || "https://api.openweathermap.org";

function toText(...values) {
  for (const value of values) {
    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }

  return "";
}

function toSeverity(value) {
  const text = String(value || "").toLowerCase();

  if (text.includes("high") || text.includes("severe") || text.includes("critical") || text.includes("extreme")) {
    return "high";
  }

  if (text.includes("medium") || text.includes("moderate") || text.includes("watch") || text.includes("warning")) {
    return "medium";
  }

  if (text.includes("low") || text.includes("minor") || text.includes("advisory") || text.includes("info")) {
    return "low";
  }

  return "medium";
}

function toTimestamp(value) {
  if (!value) {
    return new Date().toISOString();
  }

  const parsed = new Date(value);
  if (!Number.isNaN(parsed.getTime())) {
    return parsed.toISOString();
  }

  return new Date().toISOString();
}

function toRiskScore(severity) {
  switch (severity) {
    case "high":
      return 90;
    case "medium":
      return 60;
    default:
      return 25;
  }
}

function extractAlertArray(payload) {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (Array.isArray(payload?.alerts)) {
    return payload.alerts;
  }

  if (Array.isArray(payload?.data)) {
    return payload.data;
  }

  if (Array.isArray(payload?.results)) {
    return payload.results;
  }

  if (payload?.alert) {
    return [payload.alert];
  }

  return [];
}

function normalizeAlert(alert, regionFallback = DISASTER_API_DEFAULT_REGION) {
  const severity = toSeverity(alert?.severity || alert?.level || alert?.riskLevel || alert?.status);
  const disasterType = toText(alert?.disasterType, alert?.type, alert?.hazard, alert?.category) || "Disaster Alert";
  const location = toText(alert?.location, alert?.region, alert?.area, alert?.place, regionFallback) || regionFallback;
  const description = toText(alert?.description, alert?.title, alert?.headline, alert?.summary) || `${disasterType} detected in ${location}`;
  const source = toText(alert?.source, alert?.provider, alert?.origin) || DISASTER_API_SOURCE;
  const timestamp = toTimestamp(alert?.timestamp || alert?.publishedAt || alert?.createdAt || alert?.time || alert?.updatedAt);
  const region = toText(alert?.region, alert?.state, alert?.district, regionFallback) || regionFallback;
  const active = Boolean(alert?.active ?? alert?.isActive ?? alert?.ongoing ?? (severity === "high" || severity === "medium"));

  return {
    disasterType,
    severity,
    location,
    region,
    timestamp,
    description,
    source,
    active,
    riskScore: toRiskScore(severity),
  };
}

function filterByRegion(alerts, region) {
  if (!region) {
    return alerts;
  }

  const normalizedRegion = region.trim().toLowerCase();

  return alerts.filter((alert) => {
    const candidates = [alert.location, alert.region, alert.description, alert.disasterType, alert.source]
      .filter(Boolean)
      .map((value) => String(value).toLowerCase());

    return candidates.some((value) => value.includes(normalizedRegion));
  });
}

const client = axios.create({
  baseURL: DISASTER_API_BASE_URL,
  timeout: DISASTER_API_TIMEOUT,
  headers: {
    Accept: "application/json",
    Authorization: DISASTER_API_KEY ? `Bearer ${DISASTER_API_KEY}` : undefined,
    "X-API-Key": DISASTER_API_KEY,
    "x-api-key": DISASTER_API_KEY,
  },
});

async function fetchWeatherDerivedAlerts(region = DISASTER_API_DEFAULT_REGION) {
  if (!WEATHER_API_KEY) {
    return {
      region,
      alerts: [],
      total: 0,
      activeCount: 0,
      source: "Weather Risk Monitor",
      updatedAt: new Date().toISOString(),
    };
  }

  const currentUrl = `${WEATHER_BASE_URL}/data/2.5/weather?q=${encodeURIComponent(region)}&appid=${WEATHER_API_KEY}&units=metric`;
  const currentResponse = await fetch(currentUrl);

  if (!currentResponse.ok) {
    throw new Error(`Weather fallback request failed with status ${currentResponse.status}`);
  }

  const current = await currentResponse.json();
  const lat = current?.coord?.lat;
  const lon = current?.coord?.lon;

  if (typeof lat !== "number" || typeof lon !== "number") {
    return {
      region,
      alerts: [],
      total: 0,
      activeCount: 0,
      source: "Weather Risk Monitor",
      updatedAt: new Date().toISOString(),
    };
  }

  const [forecastResponse, airResponse] = await Promise.allSettled([
    fetch(`${WEATHER_BASE_URL}/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric&cnt=1`),
    fetch(`${WEATHER_BASE_URL}/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`),
  ]);

  const forecast = forecastResponse.status === "fulfilled" && forecastResponse.value.ok
    ? await forecastResponse.value.json()
    : null;
  const air = airResponse.status === "fulfilled" && airResponse.value.ok
    ? await airResponse.value.json()
    : null;

  const temp = Number(current?.main?.temp ?? 0);
  const visibilityKm = Number(current?.visibility ?? 0) / 1000;
  const rainProbability = Number(forecast?.list?.[0]?.pop ?? 0) * 100;
  const aqiScale = Number(air?.list?.[0]?.main?.aqi ?? 1);

  const alerts = [];

  if (rainProbability >= 70) {
    alerts.push({
      disasterType: "Flood Risk",
      severity: rainProbability >= 85 ? "high" : "medium",
      location: region,
      region,
      timestamp: new Date().toISOString(),
      description: `Heavy rain probability at ${Math.round(rainProbability)}%. Potential flooding in low-lying zones.`,
      source: "Weather Risk Monitor",
      active: true,
      riskScore: rainProbability >= 85 ? 88 : 66,
    });
  }

  if (temp >= 38) {
    alerts.push({
      disasterType: "Heatwave",
      severity: temp >= 42 ? "high" : "medium",
      location: region,
      region,
      timestamp: new Date().toISOString(),
      description: `Temperature is ${Math.round(temp)}°C. Heat stress risk is elevated.`,
      source: "Weather Risk Monitor",
      active: true,
      riskScore: temp >= 42 ? 90 : 64,
    });
  }

  if (visibilityKm > 0 && visibilityKm <= 4) {
    alerts.push({
      disasterType: "Low Visibility",
      severity: visibilityKm <= 2 ? "high" : "medium",
      location: region,
      region,
      timestamp: new Date().toISOString(),
      description: `Visibility reduced to ${visibilityKm.toFixed(1)} km. Travel caution advised.`,
      source: "Weather Risk Monitor",
      active: true,
      riskScore: visibilityKm <= 2 ? 84 : 58,
    });
  }

  if (aqiScale >= 4) {
    alerts.push({
      disasterType: "Air Quality Hazard",
      severity: aqiScale >= 5 ? "high" : "medium",
      location: region,
      region,
      timestamp: new Date().toISOString(),
      description: "Poor air quality detected. Respiratory caution recommended.",
      source: "Weather Risk Monitor",
      active: true,
      riskScore: aqiScale >= 5 ? 86 : 62,
    });
  }

  if (alerts.length === 0) {
    alerts.push({
      disasterType: "Monitoring Advisory",
      severity: "low",
      location: region,
      region,
      timestamp: new Date().toISOString(),
      description: "No severe disasters detected right now. Monitoring remains active for rapid alerting.",
      source: "Weather Risk Monitor",
      active: false,
      riskScore: 20,
    });
  }

  return {
    region,
    alerts,
    total: alerts.length,
    activeCount: alerts.filter((alert) => alert.active || alert.severity === "high").length,
    source: "Weather Risk Monitor",
    updatedAt: new Date().toISOString(),
  };
}

async function requestWithRetry(path, params = {}, retries = 2) {
  if (!DISASTER_API_KEY || !DISASTER_API_BASE_URL) {
    throw new Error("Disaster API is not configured.");
  }

  let lastError = null;

  for (let attempt = 0; attempt <= retries; attempt += 1) {
    try {
      const response = await client.get(path, { params });
      return response.data;
    } catch (error) {
      lastError = error;

      const status = error?.response?.status;
      const shouldRetry = status >= 500 || status === 429 || !status;

      if (!shouldRetry || attempt === retries) {
        break;
      }

      await new Promise((resolve) => setTimeout(resolve, (attempt + 1) * 600));
    }
  }

  const message = lastError?.response?.data?.message || lastError?.message || "Unable to reach Disaster API.";
  throw new Error(message);
}

async function fetchDisasterPayload({ region = DISASTER_API_DEFAULT_REGION, activeOnly = false } = {}) {
  const path = activeOnly ? DISASTER_API_ACTIVE_PATH : DISASTER_API_ALERTS_PATH;
  return requestWithRetry(path, {
    region,
    location: region,
    active: activeOnly ? "true" : undefined,
  });
}

export async function fetchDisasterAlerts(options = {}) {
  const region = options.region || DISASTER_API_DEFAULT_REGION;
  const activeOnly = Boolean(options.activeOnly);

  if (!DISASTER_API_KEY || !DISASTER_API_BASE_URL) {
    const fallback = await fetchWeatherDerivedAlerts(region);
    const fallbackAlerts = activeOnly
      ? fallback.alerts.filter((alert) => alert.active || alert.severity === "high")
      : fallback.alerts;

    return {
      ...fallback,
      alerts: fallbackAlerts,
      total: fallbackAlerts.length,
      activeCount: fallbackAlerts.filter((alert) => alert.active || alert.severity === "high").length,
    };
  }

  const payload = await fetchDisasterPayload({ region, activeOnly });
  const normalized = extractAlertArray(payload).map((alert) => normalizeAlert(alert, region));
  const filtered = filterByRegion(normalized, region);
  const alerts = activeOnly ? filtered.filter((alert) => alert.active || alert.severity === "high") : filtered;

  return {
    region,
    alerts,
    total: alerts.length,
    activeCount: alerts.filter((alert) => alert.active || alert.severity === "high").length,
    source: DISASTER_API_SOURCE,
    updatedAt: new Date().toISOString(),
  };
}

export async function fetchActiveDisasters(options = {}) {
  return fetchDisasterAlerts({ ...options, activeOnly: true });
}

export function getDefaultDisasterRegion() {
  return DISASTER_API_DEFAULT_REGION;
}