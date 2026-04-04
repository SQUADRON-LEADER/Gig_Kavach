import axios from "axios";

const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-1.5-flash";
const GEMINI_API_BASE_URL = process.env.GEMINI_API_BASE_URL || "https://generativelanguage.googleapis.com/v1beta";
const GEMINI_TIMEOUT_MS = Number(process.env.GEMINI_TIMEOUT_MS || 15000);

// Platform-scoped instruction to keep replies focused on product workflows.
const SYSTEM_PROMPT =
  "You are the AI assistant for the Jokhim Soochak platform. Help users understand risk scores, disaster alerts, earnings protection, and dashboard features. Give short and helpful answers.";

function normalizeHistory(history = []) {
  if (!Array.isArray(history)) {
    return [];
  }

  return history
    .filter((item) => item && typeof item.content === "string" && item.content.trim())
    .slice(-12)
    .map((item) => ({
      role: item.role === "assistant" ? "model" : "user",
      parts: [{ text: item.content.trim() }],
    }));
}

function extractReply(payload) {
  const candidate = payload?.candidates?.[0];
  const parts = candidate?.content?.parts;

  if (Array.isArray(parts)) {
    const text = parts.map((part) => part?.text || "").join("\n").trim();
    if (text) {
      return text;
    }
  }

  return "I could not generate a response at the moment. Please try again.";
}

function getGeminiApiKey() {
  return process.env.GEMINI_API_KEY || process.env.GOOGLE_GEMINI_API_KEY || process.env.GOOGLE_API_KEY || "";
}

export async function generateGeminiReply({ message, history = [] }) {
  const geminiApiKey = getGeminiApiKey();
  const hasApiKey = Boolean(geminiApiKey);

  console.log("[geminiService] GEMINI key available:", hasApiKey);

  if (!geminiApiKey) {
    throw new Error("Gemini is not configured. Add GEMINI_API_KEY to .env.local and restart the backend server.");
  }

  if (!message || typeof message !== "string") {
    throw new Error("Message is required.");
  }

  const endpoint = `${GEMINI_API_BASE_URL}/models/${GEMINI_MODEL}:generateContent?key=${geminiApiKey}`;

  const compactHistory = normalizeHistory(history)
    .map((entry) => `${entry.role === "model" ? "Assistant" : "User"}: ${entry.parts?.[0]?.text || ""}`)
    .join("\n");

  const promptText = compactHistory
    ? `${SYSTEM_PROMPT}\n\nConversation history:\n${compactHistory}\n\nUser message: ${message.trim()}`
    : `${SYSTEM_PROMPT}\n\nUser message: ${message.trim()}`;

  // Keep payload in the official generateContent content/parts format.
  const requestBody = {
    contents: [
      {
        parts: [{ text: promptText }],
      },
    ],
    generationConfig: {
      temperature: 0.5,
      topP: 0.9,
      maxOutputTokens: 512,
    },
  };

  try {
    console.log("[geminiService] Sending request to Gemini", {
      model: GEMINI_MODEL,
      historyCount: history.length,
      userMessageLength: message.length,
    });

    const response = await axios.post(
      endpoint,
      requestBody,
      {
        timeout: GEMINI_TIMEOUT_MS,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("[geminiService] Gemini response received", {
      hasCandidates: Array.isArray(response.data?.candidates),
      candidatesCount: response.data?.candidates?.length || 0,
    });

    const aiText = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || extractReply(response.data);

    return {
      reply: aiText,
      model: GEMINI_MODEL,
    };
  } catch (error) {
    const status = error?.response?.status;
    const providerMessage = error?.response?.data?.error?.message;
    const messageText = providerMessage || error?.message || "Gemini request failed.";

    console.error("[geminiService] Gemini request failed", {
      status,
      message: messageText,
    });

    if (status === 401 || status === 403) {
      throw new Error("Gemini authentication failed. Check GEMINI_API_KEY.");
    }

    throw new Error(messageText);
  }
}