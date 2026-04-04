import { Router } from "express";
import { checkActiveDisasters, getDisasterAlerts } from "../controllers/disasterController.js";

const router = Router();

router.get("/", getDisasterAlerts);
router.get("/active", checkActiveDisasters);

export default router;