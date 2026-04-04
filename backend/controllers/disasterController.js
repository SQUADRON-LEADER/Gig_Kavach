import { fetchActiveDisasters, fetchDisasterAlerts } from "../services/disasterService.js";

function getRegion(req) {
  return typeof req.query.region === "string" && req.query.region.trim() ? req.query.region.trim() : undefined;
}

export async function getDisasterAlerts(req, res) {
  try {
    const result = await fetchDisasterAlerts({ region: getRegion(req) });

    return res.json({
      success: true,
      data: result.alerts,
      meta: {
        region: result.region,
        total: result.total,
        source: result.source,
        updatedAt: result.updatedAt,
      },
    });
  } catch (error) {
    return res.status(502).json({
      success: false,
      message: error instanceof Error ? error.message : "Unable to fetch disaster alerts.",
    });
  }
}

export async function checkActiveDisasters(req, res) {
  try {
    const result = await fetchActiveDisasters({ region: getRegion(req) });

    return res.json({
      success: true,
      data: result.alerts,
      meta: {
        region: result.region,
        total: result.total,
        activeCount: result.activeCount,
        source: result.source,
        updatedAt: result.updatedAt,
      },
    });
  } catch (error) {
    return res.status(502).json({
      success: false,
      message: error instanceof Error ? error.message : "Unable to check active disasters.",
    });
  }
}