import { askGemini } from "./geminiHelper.js";

export const generateSummary = async (text) => {
  const prompt = `
You are an AI Study Assistant.

Analyze the following study notes.

Return ONLY valid JSON.

{
  "summary":"Write a concise summary.",
  "keyPoints":[
    "Point 1",
    "Point 2",
    "Point 3"
  ],
  "importantTerms":[
    "Term 1",
    "Term 2",
    "Term 3"
  ]
}

Study Notes:

${text}
`;

  const output = await askGemini(prompt);

console.log(output);

return JSON.parse(output);
};

export const generateFlashcards = async (text) => {
  const prompt = `
You are an AI Study Assistant.

Create exactly 10 study flashcards.

Return ONLY valid JSON.

[
  {
    "question":"Question",
    "answer":"Answer"
  }
]

Study Notes:

${text}
`;

  const output = await askGemini(prompt);

  console.log("===== FLASHCARDS RAW RESPONSE =====");
  console.log(output);

  return JSON.parse(output);
};
export const generateQuiz = async (text) => {
  const prompt = `
You are an AI Study Assistant.

Create exactly 10 multiple choice questions.

Return ONLY valid JSON.

[
  {
    "question":"Question",
    "options":[
      "Option A",
      "Option B",
      "Option C",
      "Option D"
    ],
    "answer":"Correct Option"
  }
]

Study Notes:

${text}
`;

  const output = await askGemini(prompt);

  console.log("===== QUIZ RAW RESPONSE =====");
  console.log(output);

  return JSON.parse(output);
};
export const askStudyQuestion = async (notes, question) => {
  const prompt = `
You are an AI Study Tutor.

Answer ONLY using the study notes below.

If the answer is not present in the notes, reply exactly:

"I couldn't find that in your uploaded notes."

Study Notes:

${notes}

Student Question:

${question}

Give a clear answer using headings and bullet points whenever appropriate.
`;

  return await askGemini(prompt);
};