import { Router } from "express";
import { sendMessageToAI } from "../controllers/chatController.js";

const router = Router();

router.post("/", sendMessageToAI);

export default router;