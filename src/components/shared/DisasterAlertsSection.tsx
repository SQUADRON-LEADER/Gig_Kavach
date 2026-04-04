import { motion } from "framer-motion";
import { AlertTriangle, Clock3, MapPin, ShieldAlert } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { fetchActiveDisasters, fetchDisasterAlerts, type DisasterAlert, type DisasterSeverity } from "@/services/disasterApi";

const severityClasses: Record<DisasterSeverity, string> = {
  low: "bg-success/10 text-success border-success/20",
  medium: "bg-warning/10 text-warning border-warning/20",
  high: "bg-destructive/10 text-destructive border-destructive/20",
};

const severityLabels: Record<DisasterSeverity, string> = {
  low: "Advisory",
  medium: "Watch",
  high: "Alert",
};

function formatTimestamp(timestamp: string) {
  const date = new Date(timestamp);

  if (Number.isNaN(date.getTime())) {
    return "Recently";
  }

  return date.toLocaleString();
}

function AlertCard({ alert }: { alert: DisasterAlert }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card-hover p-5 border border-border/40"
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center shrink-0">
            <ShieldAlert className="w-5 h-5 text-accent-foreground" />
          </div>
          <div>
            <p className="font-semibold text-foreground">{alert.disasterType}</p>
            <p className="text-xs text-muted-foreground mt-1">{alert.description}</p>
          </div>
        </div>

        <span className={`px-3 py-1 rounded-xl border text-xs font-medium ${severityClasses[alert.severity]}`}>
          {severityLabels[alert.severity]}
        </span>
      </div>

      <div className="grid sm:grid-cols-2 gap-3 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-primary" />
          <span>{alert.location}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock3 className="w-4 h-4 text-primary" />
          <span>{formatTimestamp(alert.timestamp)}</span>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <span className="text-xs text-muted-foreground">Source: {alert.source}</span>
        <span className="text-xs font-medium text-foreground">Risk score: {alert.riskScore ?? 0}/100</span>
      </div>
    </motion.div>
  );
}

export function DisasterAlertsSection({ region = "Delhi" }: { region?: string }) {
  const alertsQuery = useQuery({
    queryKey: ["disaster-alerts", region],
    queryFn: () => fetchDisasterAlerts(region),
    staleTime: 60_000,
    retry: 2,
  });

  const activeQuery = useQuery({
    queryKey: ["active-disaster-alerts", region],
    queryFn: () => fetchActiveDisasters(region),
    staleTime: 60_000,
    retry: 2,
  });

  const isLoading = alertsQuery.isLoading || activeQuery.isLoading;
  const isError = alertsQuery.isError || activeQuery.isError;
  const errorMessage = alertsQuery.error instanceof Error
    ? alertsQuery.error.message
    : activeQuery.error instanceof Error
      ? activeQuery.error.message
      : "Unable to load disaster alerts.";

  const alerts = activeQuery.data?.length ? activeQuery.data : alertsQuery.data || [];
  const activeCount = activeQuery.data?.length || 0;

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between gap-3 mb-4">
        <div>
          <h3 className="font-display font-semibold text-foreground text-lg">Disaster Alerts</h3>
          <p className="text-xs text-muted-foreground">Live disaster monitoring for {region}</p>
        </div>
        <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border bg-background text-xs font-medium text-foreground">
          <AlertTriangle className="w-4 h-4 text-destructive" />
          {activeCount} active
        </div>
      </div>

      {isLoading ? (
        <div className="glass-card p-5 text-sm text-muted-foreground">Loading disaster alerts...</div>
      ) : null}

      {isError ? (
        <div className="glass-card p-5 border border-destructive/20 bg-destructive/5">
          <p className="text-sm text-destructive font-medium">Unable to load disaster alerts.</p>
          <p className="text-xs text-muted-foreground mt-1">{errorMessage}</p>
          <Button className="mt-3" variant="outline" onClick={() => {
            alertsQuery.refetch();
            activeQuery.refetch();
          }}>
            Retry
          </Button>
        </div>
      ) : null}

      {!isLoading && !isError ? (
        <div className="grid md:grid-cols-2 gap-4">
          {alerts.length > 0 ? (
            alerts.slice(0, 4).map((alert, index) => (
              <motion.div key={`${alert.disasterType}-${alert.timestamp}-${index}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: index * 0.08 }}>
                <AlertCard alert={alert} />
              </motion.div>
            ))
          ) : (
            <div className="glass-card p-5 md:col-span-2 text-sm text-muted-foreground">
              No active disaster alerts were returned for this region.
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}