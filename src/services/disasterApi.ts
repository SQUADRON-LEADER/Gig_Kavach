import axios from "axios";

export type DisasterSeverity = "low" | "medium" | "high";

export interface DisasterAlert {
  disasterType: string;
  severity: DisasterSeverity;
  location: string;
  region: string;
  timestamp: string;
  description: string;
  source: string;
  active: boolean;
  riskScore?: number;
}

interface DisasterApiResponse {
  success?: boolean;
  data?: DisasterAlert[];
  alerts?: DisasterAlert[];
  meta?: {
    region?: string;
    total?: number;
    activeCount?: number;
    source?: string;
    updatedAt?: string;
  };
  message?: string;
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "",
  timeout: 10000,
});

function normalizeResponse(payload: DisasterApiResponse): DisasterAlert[] {
  if (Array.isArray(payload.data)) {
    return payload.data;
  }

  if (Array.isArray(payload.alerts)) {
    return payload.alerts;
  }

  return [];
}

async function fetchDisasterData(path: string, region = "Delhi"): Promise<DisasterAlert[]> {
  const response = await api.get<DisasterApiResponse>(path, {
    params: { region },
  });

  return normalizeResponse(response.data);
}

export async function fetchDisasterAlerts(region = "Delhi"): Promise<DisasterAlert[]> {
  return fetchDisasterData("/api/disasters", region);
}

export async function fetchActiveDisasters(region = "Delhi"): Promise<DisasterAlert[]> {
  return fetchDisasterData("/api/disasters/active", region);
}