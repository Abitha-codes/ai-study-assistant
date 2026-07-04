import { GoogleGenAI } from "@google/genai";
import { config } from "../config/config.js";

const ai = new GoogleGenAI({
  apiKey: config.gemini.apiKey,
});

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const askGemini = async (prompt) => {
  let lastError;

  for (let attempt = 1; attempt <= 5; attempt++) {
    try {
      console.log(`Gemini Request Attempt ${attempt}`);

      const response = await ai.models.generateContent({
        model: config.gemini.model,
        contents: prompt,
      });

      let output = response.text.trim();

      output = output.replace(/```json/g, "");
      output = output.replace(/```/g, "");
      output = output.trim();

      return output;

    } catch (err) {
      lastError = err;

      const status = err.status || err?.error?.code;

      console.log(`Gemini Error: ${status}`);

      // Retry temporary errors
      if ([429, 500, 503].includes(status)) {
        const delay = attempt * 5000;

        console.log(`Retrying in ${delay / 1000} seconds...`);

        await sleep(delay);

        continue;
      }

      throw err;
    }
  }

  throw lastError;
};