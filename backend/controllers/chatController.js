import { generateGeminiReply } from "../services/geminiService.js";
import { faqData } from "../data/faqData.js";

function normalizeText(value = "") {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getTokenSet(text) {
  return new Set(normalizeText(text).split(" ").filter((token) => token.length > 2));
}

function findBestFaqMatch(message) {
  const normalizedMessage = normalizeText(message);
  const messageTokens = getTokenSet(message);

  let best = null;

  for (const item of faqData) {
    const normalizedQuestion = normalizeText(item.question);
    const questionTokens = getTokenSet(item.question);

    const overlap = [...messageTokens].filter((token) => questionTokens.has(token)).length;
    const overlapRatio = questionTokens.size ? overlap / questionTokens.size : 0;
    const includesMatch =
      normalizedMessage.includes(normalizedQuestion) || normalizedQuestion.includes(normalizedMessage);
    const score = overlapRatio + (includesMatch ? 0.5 : 0);

    if (!best || score > best.score) {
      best = { item, score };
    }
  }

  if (!best) {
    return null;
  }

  return best.score >= 0.45 ? best.item : null;
}

export async function sendMessageToAI(req, res) {
  try {
    const message = typeof req.body?.message === "string" ? req.body.message.trim() : "";
    const history = Array.isArray(req.body?.history) ? req.body.history : [];

    console.log("User message:", message);
    console.log("[chatController] /api/chat request received", {
      messageLength: message.length,
      historyCount: history.length,
    });

    if (!message) {
      return res.status(400).json({
        success: false,
        message: "Message is required.",
      });
    }

    const faqMatch = findBestFaqMatch(message);
    if (faqMatch) {
      const source = "faq";
      console.log("Response source:", source);
      return res.json({
        success: true,
        reply: faqMatch.answer,
        source,
      });
    }

    const result = await generateGeminiReply({ message, history });
    const source = "gemini";

    console.log("[chatController] Gemini reply generated", {
      replyLength: result.reply.length,
      model: result.model,
    });
    console.log("Response source:", source);
    console.log("[chatController] Returning reply to frontend");

    return res.json({
      success: true,
      reply: result.reply,
      source,
      model: result.model,
    });
  } catch (error) {
    console.error("[chatController] Failed to generate Gemini reply", {
      error: error instanceof Error ? error.message : "Unknown error",
    });

    return res.status(502).json({
      success: false,
      message: error instanceof Error ? error.message : "Unable to get AI response.",
    });
  }
}