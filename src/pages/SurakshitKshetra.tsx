import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { Map, Circle } from "lucide-react";
import { CircleMarker, MapContainer, Popup, TileLayer } from "react-leaflet";
import { PageHeader } from "@/components/shared/PageHeader";

type RiskLevel = "low" | "medium" | "high";

interface ZoneData {
  name: string;
  risk: RiskLevel;
  deliveries: number;
  earnings: string;
  coordinates: [number, number];
  incidents: number;
}

const zones: ZoneData[] = [
  { name: "Koramangala", risk: "low", deliveries: 42, earnings: "INR 3,200", coordinates: [12.9352, 77.6245], incidents: 1 },
  { name: "Electronic City", risk: "high", deliveries: 8, earnings: "INR 600", coordinates: [12.8456, 77.6603], incidents: 7 },
  { name: "Indiranagar", risk: "low", deliveries: 35, earnings: "INR 2,800", coordinates: [12.9784, 77.6408], incidents: 2 },
  { name: "Whitefield", risk: "medium", deliveries: 22, earnings: "INR 1,500", coordinates: [12.9698, 77.7499], incidents: 4 },
  { name: "MG Road", risk: "low", deliveries: 30, earnings: "INR 2,400", coordinates: [12.9755, 77.6065], incidents: 1 },
  { name: "Yelahanka", risk: "high", deliveries: 5, earnings: "INR 350", coordinates: [13.1007, 77.5963], incidents: 8 },
  { name: "JP Nagar", risk: "medium", deliveries: 18, earnings: "INR 1,200", coordinates: [12.9095, 77.5858], incidents: 3 },
  { name: "HSR Layout", risk: "low", deliveries: 38, earnings: "INR 3,000", coordinates: [12.9116, 77.6474], incidents: 1 },
];

const riskColors: Record<string, string> = {
  low: "text-success",
  medium: "text-warning",
  high: "text-destructive",
};
const riskBg: Record<string, string> = {
  low: "bg-success/10",
  medium: "bg-warning/10",
  high: "bg-destructive/10",
};
const riskLabels: Record<string, string> = { low: "Safe Zone", medium: "Moderate", high: "High Risk" };
const riskFill: Record<RiskLevel, string> = { low: "#16a34a", medium: "#f59e0b", high: "#ef4444" };
const riskRadius: Record<RiskLevel, number> = { low: 12, medium: 15, high: 18 };

export default function SurakshitKshetra() {
  const [selectedRisk, setSelectedRisk] = useState<RiskLevel | "all">("all");

  const filteredZones = useMemo(() => {
    if (selectedRisk === "all") return zones;
    return zones.filter((zone) => zone.risk === selectedRisk);
  }, [selectedRisk]);

  return (
    <div>
      <PageHeader title="Surakshit Kshetra Map" subtitle="Zone safety & earnings heatmap" icon={Map} />

      <div className="flex flex-wrap gap-2 mb-4">
        {(["all", "low", "medium", "high"] as const).map((risk) => (
          <button
            key={risk}
            onClick={() => setSelectedRisk(risk)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
              selectedRisk === risk ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border text-muted-foreground hover:bg-accent"
            }`}
          >
            {risk === "all" ? "All Zones" : riskLabels[risk]}
          </button>
        ))}
      </div>

      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-card p-4 mb-6">
        <div className="aspect-video rounded-2xl bg-muted relative overflow-hidden">
          <MapContainer center={[12.9716, 77.5946]} zoom={11} scrollWheelZoom className="h-full w-full z-0">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {filteredZones.map((zone) => (
              <CircleMarker
                key={zone.name}
                center={zone.coordinates}
                radius={riskRadius[zone.risk]}
                pathOptions={{
                  color: "#ffffff",
                  weight: 2,
                  fillColor: riskFill[zone.risk],
                  fillOpacity: 0.72,
                }}
              >
                <Popup>
                  <div className="space-y-1 min-w-36">
                    <p className="font-semibold">{zone.name}</p>
                    <p>Risk: {riskLabels[zone.risk]}</p>
                    <p>Deliveries: {zone.deliveries}</p>
                    <p>Earnings: {zone.earnings}</p>
                    <p>Incidents: {zone.incidents}</p>
                  </div>
                </Popup>
              </CircleMarker>
            ))}
          </MapContainer>

          <div className="absolute bottom-3 right-3 glass-card px-3 py-2 flex gap-4 text-[10px] z-[400]">
            <span className="flex items-center gap-1"><Circle className="w-2 h-2 text-success fill-current" />Safe</span>
            <span className="flex items-center gap-1"><Circle className="w-2 h-2 text-warning fill-current" />Moderate</span>
            <span className="flex items-center gap-1"><Circle className="w-2 h-2 text-destructive fill-current" />High Risk</span>
          </div>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-3">
        {filteredZones.map((zone, i) => (
          <motion.div key={zone.name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="glass-card p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Circle className={`w-4 h-4 ${riskColors[zone.risk]} fill-current`} />
              <div>
                <p className="font-medium text-sm text-foreground">{zone.name}</p>
                <p className="text-xs text-muted-foreground">{zone.deliveries} deliveries | {zone.incidents} incidents</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold text-foreground text-sm">{zone.earnings}</p>
              <p className={`text-[10px] font-medium ${riskColors[zone.risk]}`}>{riskLabels[zone.risk]}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
