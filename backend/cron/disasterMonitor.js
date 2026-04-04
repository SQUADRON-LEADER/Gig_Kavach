import cron from "node-cron";
import DisasterAlert from "../models/DisasterAlert.js";
import { connectDatabase, hasDatabaseUri } from "../config/database.js";
import { fetchActiveDisasters } from "../services/disasterService.js";

const MONITOR_REGION = process.env.DISASTER_MONITOR_REGION || process.env.DISASTER_DEFAULT_REGION || "Delhi";
const MONITOR_SCHEDULE = process.env.DISASTER_MONITOR_CRON || "*/5 * * * *";
const MONITOR_TIMEZONE = process.env.DISASTER_MONITOR_TIMEZONE || "Asia/Kolkata";

let scheduledTask = null;

async function persistAlerts(alerts) {
  if (!hasDatabaseUri()) {
    return { skipped: true, reason: "MONGO_URI not configured." };
  }

  await connectDatabase();

  const saved = [];

  for (const alert of alerts) {
    const filter = {
      disasterType: alert.disasterType,
      location: alert.location,
      timestamp: new Date(alert.timestamp),
    };

    const update = {
      ...alert,
      lastSeenAt: new Date(),
      active: Boolean(alert.active || alert.severity === "high"),
    };

    const document = await DisasterAlert.findOneAndUpdate(filter, update, {
      new: true,
      upsert: true,
      setDefaultsOnInsert: true,
    });

    saved.push(document);
  }

  return { savedCount: saved.length };
}

export async function runDisasterMonitorOnce(region = MONITOR_REGION) {
  const result = await fetchActiveDisasters({ region });
  const severeAlerts = result.alerts.filter((alert) => alert.severity === "high" || alert.active);

  const persistence = await persistAlerts(severeAlerts);

  if (severeAlerts.length > 0) {
    console.log(`[disasterMonitor] ${severeAlerts.length} active disaster alerts detected for ${region}.`);
  }

  return {
    region,
    checked: result.total,
    severeAlerts: severeAlerts.length,
    persisted: persistence.savedCount || 0,
  };
}

export function startDisasterMonitor() {
  if (!process.env.DISASTER_API_KEY || !process.env.DISASTER_API_BASE_URL) {
    console.log("[disasterMonitor] Monitoring not started until DISASTER_API_KEY and DISASTER_API_BASE_URL are configured.");
    return null;
  }

  if (scheduledTask) {
    return scheduledTask;
  }

  scheduledTask = cron.schedule(
    MONITOR_SCHEDULE,
    async () => {
      try {
        await runDisasterMonitorOnce(MONITOR_REGION);
      } catch (error) {
        console.error("[disasterMonitor] Scheduled poll failed:", error);
      }
    },
    {
      scheduled: true,
      timezone: MONITOR_TIMEZONE,
    }
  );

  return scheduledTask;
}