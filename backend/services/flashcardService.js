import { GoogleGenAI } from "@google/genai";
import { config } from "../config/config.js";

const ai = new GoogleGenAI({
  apiKey: config.gemini.apiKey,
});

export const generateFlashcards = async (text) => {

  const prompt = `
You are an AI Study Assistant.

Create 10 flashcards from these study notes.

Return ONLY JSON.

{
  "cards":[
    {
      "question":"...",
      "answer":"..."
    }
  ]
}

Study Notes:

${text}
`;

  const response = await ai.models.generateContent({
    model: config.gemini.model,
    contents: prompt,
  });

  let output = response.text.trim();

  output = output.replace(/```json/g, "");
  output = output.replace(/```/g, "");

  return JSON.parse(output);
};