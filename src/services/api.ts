export type Difficulty = "Easy" | "Medium" | "Hard";

export interface QuizQuestion {
  question: string;
  options: string[];
  correct_answer: string;
  explanation: string;
}

export interface QuizResponse {
  title: string;
  questions: QuizQuestion[];
}

export interface StructureResponse {
  title: string;
  topics: string[];
  key_points: string[];
  definitions: Array<{ term: string; meaning: string }>;
  examples: string[];
  summary: string;
}

const API_URL = import.meta.env["VITE_API_URL"] || "https://bash-whoops-spectator.ngrok-free.dev";
const CONNECTION_ERROR = "Unable to connect to EduGenie. Please check the backend and try again.";

async function post<T>(path: string, body: unknown): Promise<T> {
  try {
    const response = await fetch(`${API_URL}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!response.ok) throw new Error(CONNECTION_ERROR);
    return (await response.json()) as T;
  } catch (error) {
    if (error instanceof Error && error.message === CONNECTION_ERROR) throw error;
    throw new Error(CONNECTION_ERROR);
  }
}

export function generateQuiz(topic: string, difficulty: Difficulty, numQuestions: number) {
  return post<QuizResponse>("/api/quiz", { topic, difficulty, num_questions: numQuestions });
}

export function summarizeText(text: string) {
  return post<{ summary: string }>("/api/summarize", { text });
}

export function askTutor(question: string, subject: string) {
  return post<{ answer: string }>("/api/tutor", { question, subject });
}

export function structureContent(text: string) {
  return post<StructureResponse>("/api/structure", { text });
}
