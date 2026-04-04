import { motion } from "framer-motion";
import { AlertTriangle, Wind, Thermometer, Droplets, Eye } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { getFeatherRiskData } from "@/services/featherService";
import { DisasterAlertsSection } from "@/components/shared/DisasterAlertsSection";

type RiskStatus = "low" | "medium" | "high";

const statusColors: Record<RiskStatus, string> = {
  low: "bg-success/10 text-success border-success/20",
  medium: "bg-warning/10 text-warning border-warning/20",
  high: "bg-destructive/10 text-destructive border-destructive/20",
};

const statusLabels: Record<RiskStatus, string> = { low: "Safe", medium: "Moderate", high: "High Risk" };

function detailForAqi(aqi: number): string {
  if (aqi >= 180) return "Unhealthy air quality detected.";
  if (aqi >= 110) return "Air quality is moderate.";
  return "Air quality is in safer range.";
}

function detailForTemperature(temperatureC: number): string {
  if (temperatureC >= 40) return "Heat advisory active.";
  if (temperatureC >= 34) return "High temperature expected.";
  return "Temperature within normal band.";
}

function detailForRain(rainProbability: number): string {
  if (rainProbability >= 80) return "Heavy rainfall likely.";
  if (rainProbability >= 50) return "Carry rain protection.";
  return "Low chance of rainfall.";
}

function detailForVisibility(visibilityKm: number): string {
  if (visibilityKm < 3) return "Low visibility. Drive carefully.";
  if (visibilityKm < 8) return "Moderate visibility conditions.";
  return "Clear visibility conditions.";
}

export default function JokhimSoochak() {
  const {
    data,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["feather-risk", "Delhi"],
    queryFn: () => getFeatherRiskData("Delhi"),
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });

  const overallRisk: RiskStatus = data?.riskLevel ?? "medium";
  const riskFactors = [
    {
      label: "AQI Level",
      value: data?.aqi ?? "--",
      status: ((data?.aqi ?? 120) >= 180 ? "high" : (data?.aqi ?? 120) >= 110 ? "medium" : "low") as RiskStatus,
      icon: Wind,
      detail: detailForAqi(data?.aqi ?? 120),
    },
    {
      label: "Temperature",
      value: data ? `${Math.round(data.temperatureC)}°C` : "--",
      status: ((data?.temperatureC ?? 32) >= 40 ? "high" : (data?.temperatureC ?? 32) >= 34 ? "medium" : "low") as RiskStatus,
      icon: Thermometer,
      detail: detailForTemperature(data?.temperatureC ?? 32),
    },
    {
      label: "Rain Probability",
      value: data ? `${Math.round(data.rainProbability)}%` : "--",
      status: ((data?.rainProbability ?? 30) >= 80 ? "high" : (data?.rainProbability ?? 30) >= 50 ? "medium" : "low") as RiskStatus,
      icon: Droplets,
      detail: detailForRain(data?.rainProbability ?? 30),
    },
    {
      label: "Visibility",
      value: data ? `${data.visibilityKm.toFixed(1)} km` : "--",
      status: ((data?.visibilityKm ?? 8) < 3 ? "high" : (data?.visibilityKm ?? 8) < 8 ? "medium" : "low") as RiskStatus,
      icon: Eye,
      detail: detailForVisibility(data?.visibilityKm ?? 8),
    },
  ];

  return (
    <div>
      <PageHeader title="Jokhim Soochak" subtitle="Real-time risk indicator for your safety" icon={AlertTriangle} />

      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-card p-6 mb-6 text-center">
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl border font-semibold text-lg ${statusColors[overallRisk]}`}>
          <AlertTriangle className="w-5 h-5" />
          Overall Risk: {statusLabels[overallRisk]}
        </div>
        <p className="text-muted-foreground text-sm mt-2">{data?.summary ?? "Based on current weather, air quality & traffic conditions"}</p>
        <p className="text-xs text-muted-foreground mt-2">
          {isFetching ? "Refreshing data..." : `Updated: ${data ? new Date(data.updatedAt).toLocaleTimeString() : "--"}`}
        </p>
      </motion.div>

      {isLoading ? (
        <div className="glass-card p-5 mb-6 text-sm text-muted-foreground">Loading Feather weather insights...</div>
      ) : null}

      {isError ? (
        <div className="glass-card p-5 mb-6 border border-destructive/20 bg-destructive/5">
          <p className="text-sm text-destructive font-medium">Unable to load live Feather weather data.</p>
          <p className="text-xs text-muted-foreground mt-1">{error instanceof Error ? error.message : "Please try again in a moment."}</p>
          <Button className="mt-3" variant="outline" onClick={() => refetch()}>
            Retry
          </Button>
        </div>
      ) : null}

      <div className="grid md:grid-cols-2 gap-4">
        {riskFactors.map((factor, i) => (
          <motion.div key={factor.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card-hover p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
                  <factor.icon className="w-5 h-5 text-accent-foreground" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{factor.label}</p>
                  <p className="text-xs text-muted-foreground">{factor.detail}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-xl border text-xs font-medium ${statusColors[factor.status]}`}>
                {statusLabels[factor.status]}
              </span>
            </div>
            <div className="text-2xl font-display font-bold text-foreground">{factor.value}</div>
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="glass-card p-5 mt-6">
        <h3 className="font-display font-semibold mb-3 text-foreground">Safety Tips</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-center gap-2">• Carry extra water due to high temperature</li>
          <li className="flex items-center gap-2">• Avoid peak pollution hours (2-5 PM)</li>
          <li className="flex items-center gap-2">• Keep rain gear ready for evening shifts</li>
        </ul>
      </motion.div>

      <DisasterAlertsSection region="Delhi" />
    </div>
  );
}
