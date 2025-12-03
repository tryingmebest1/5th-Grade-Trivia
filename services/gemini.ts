import { GoogleGenAI, Type, Schema } from "@google/genai";
import { TriviaQuestion } from "../types";

const subjects = [
  "Mathematics",
  "Science (Biology, Physics, Earth Science)",
  "History (World & US)",
  "Geography",
  "English Language Arts (Grammar, Literature)",
  "General Knowledge"
];

const questionSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    question: {
      type: Type.STRING,
      description: "The trivia question suitable for a 5th grader.",
    },
    options: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "A list of 4 possible answers. One is correct, three are distractors.",
    },
    correctAnswerIndex: {
      type: Type.INTEGER,
      description: "The index (0-3) of the correct answer in the options array.",
    },
    subject: {
      type: Type.STRING,
      description: "The subject of the question.",
    },
    explanation: {
      type: Type.STRING,
      description: "A brief, fun explanation of why the answer is correct.",
    }
  },
  required: ["question", "options", "correctAnswerIndex", "subject", "explanation"],
};

export const generateTriviaQuestion = async (): Promise<TriviaQuestion> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Pick a random subject to ensure variety
    const randomSubject = subjects[Math.floor(Math.random() * subjects.length)];
    
    const prompt = `Generate a challenging but fair multiple-choice trivia question suitable for a smart 5th grader. 
    The subject is: ${randomSubject}.
    Ensure the distractors are plausible.
    Return the response in strict JSON format.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: questionSchema,
        temperature: 0.8, // Slightly higher for variety
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("No text returned from Gemini");
    }

    const data = JSON.parse(text) as TriviaQuestion;
    return data;
  } catch (error) {
    console.error("Error generating question:", error);
    // Fallback question in case of API failure to prevent crash
    return {
      question: "Which planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Jupiter", "Venus"],
      correctAnswerIndex: 1,
      subject: "Science",
      explanation: "Mars appears red because of iron oxide (rust) in its soil."
    };
  }
};