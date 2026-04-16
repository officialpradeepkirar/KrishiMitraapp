const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;
const CLAUDE_API_KEY = process.env.CLAUDE_API_KEY;
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || "*";

app.use(cors({ origin: ALLOWED_ORIGIN === "*" ? true : ALLOWED_ORIGIN }));
app.use(express.json({ limit: "10mb" }));
app.use("/vendor", express.static(path.join(__dirname, "node_modules")));
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "KrishiMitra", time: new Date().toISOString() });
});

app.post("/api/claude", async (req, res) => {
  try {
    const { prompt, img64 = null, sys = null } = req.body || {};

    if (!prompt || typeof prompt !== "string") {
      return res.status(400).json({ error: "Prompt is required." });
    }

    if (!CLAUDE_API_KEY) {
      return res.status(500).json({ error: "CLAUDE_API_KEY is not configured." });
    }

    const content = [];
    if (img64 && typeof img64 === "string") {
      content.push({
        type: "image",
        source: {
          type: "base64",
          media_type: "image/jpeg",
          data: img64,
        },
      });
    }

    content.push({ type: "text", text: prompt });

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": CLAUDE_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: process.env.CLAUDE_MODEL || "claude-sonnet-4-20250514",
        max_tokens: 1000,
        system:
          sys ||
          `Tu KrishiMitra AI hai — India ka sabse smart krishi sahayak (30 saal ka anubhav).\nHamesha Hindi mein jawab de. Practical, warm, simple bhasha.\nNumbers clearly do. MP/Madhya Pradesh context dhyan rakho. Emojis se structure karo.`,
        messages: [{ role: "user", content }],
      }),
    });

    const data = await response.json();

    if (!response.ok || data?.error) {
      return res.status(response.status || 500).json({
        error: data?.error?.message || "Claude API request failed.",
      });
    }

    return res.json({ text: data.content?.[0]?.text || "Jawab nahi mila." });
  } catch (error) {
    return res.status(500).json({ error: error.message || "Internal server error." });
  }
});

app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`KrishiMitra server running on port ${PORT}`);
});
