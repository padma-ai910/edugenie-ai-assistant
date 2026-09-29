import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, CircleAlert, RefreshCw, Send, Trophy } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ErrorNotice, PageHeader, Spinner, ToolPage } from "@/components/edugenie/shared";
import { generateQuiz, type Difficulty, type QuizResponse } from "@/services/api";
import { cn } from "@/lib/utils";

const description = "Generate an AI-powered quiz by topic, difficulty, and question count with EduGenie.";

/** Ensure answer options always render as separate selectable rows. */
function normalizeOptions(value: unknown): string[] {
  const parts: string[] = [];
  const visit = (item: unknown) => {
    if (Array.isArray(item)) {
      item.forEach(visit);
    } else if (typeof item === "string") {
      const trimmed = item.trim();
      if (trimmed) parts.push(trimmed);
    }
  };
  visit(value);
  // A single string holding every option (e.g. "List\nDictionary\nTuple\nSet")
  // gets split into separate choices; well-formed arrays are kept as-is.
  if (parts.length === 1 && parts[0].length > 1 && !/\s|,/.test(parts[0]) === false) {
    const splitParts = parts[0].split(/\n+|\s*,\s*|\s*;\s*|\s*\|\s*/).map((part) => part.trim()).filter(Boolean);
    if (splitParts.length > 1) return splitParts;
  }
  return parts;
}

export const Route = createFileRoute("/quiz")({ head: () => ({ meta: [{ title: "AI Quiz Generator — EduGenie" }, { name: "description", content: description }, { property: "og:title", content: "AI Quiz Generator — EduGenie" }, { property: "og:description", content: description }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }), component: QuizPage });

function QuizPage() {
  const [topic, setTopic] = useState(""); const [difficulty, setDifficulty] = useState<Difficulty>("Medium"); const [count, setCount] = useState("5"); const [quiz, setQuiz] = useState<QuizResponse | null>(null); const [answers, setAnswers] = useState<Record<number, string>>({}); const [submitted, setSubmitted] = useState(false); const [loading, setLoading] = useState(false); const [error, setError] = useState("");
  async function handleGenerate(event: FormEvent) { event.preventDefault(); if (!topic.trim()) { setError("Please enter a topic before generating a quiz."); return; } setLoading(true); setError(""); setQuiz(null); setSubmitted(false); setAnswers({}); try { setQuiz(await generateQuiz(topic.trim(), difficulty, Number(count))); } catch (err) { setError(err instanceof Error ? err.message : "Unable to connect to EduGenie. Please check the backend and try again."); } finally { setLoading(false); } }
  const score = quiz?.questions.reduce((total, question, index) => total + (answers[index] === question.correct_answer ? 1 : 0), 0) ?? 0;
  function reset() { setQuiz(null); setAnswers({}); setSubmitted(false); setError(""); }
  return <ToolPage><PageHeader eyebrow="Practice tool" title="AI Quiz Generator" description="Create a focused quiz on any topic, then check your score and review each explanation." icon={Trophy} />
    {!quiz && <form onSubmit={handleGenerate} className="rounded-2xl border bg-card p-5 shadow-soft sm:p-7"><div className="grid gap-5 md:grid-cols-2"><label className="md:col-span-2"><span className="label">Topic</span><Input value={topic} onChange={(event) => setTopic(event.target.value)} placeholder="e.g. Data structures" className="h-11" /></label><label><span className="label">Difficulty</span><Select value={difficulty} onValueChange={(value) => setDifficulty(value as Difficulty)}><SelectTrigger className="h-11"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="Easy">Easy</SelectItem><SelectItem value="Medium">Medium</SelectItem><SelectItem value="Hard">Hard</SelectItem></SelectContent></Select></label><label><span className="label">Number of questions</span><Select value={count} onValueChange={setCount}><SelectTrigger className="h-11"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="5">5</SelectItem><SelectItem value="10">10</SelectItem></SelectContent></Select></label></div><Button type="submit" size="lg" className="mt-6 h-11" disabled={loading}>{loading ? <><Spinner />Generating quiz...</> : <><Send />Generate Quiz</>}</Button>{error && <ErrorNotice message={error} />}</form>}
    {quiz && <div><div className="mb-6 flex flex-col justify-between gap-4 rounded-xl border bg-card p-5 shadow-soft sm:flex-row sm:items-center"><div><p className="text-sm text-muted-foreground">Generated quiz</p><h2 className="text-2xl font-bold">{quiz.title}</h2></div>{submitted && <div className="flex gap-6"><div><span className="block text-2xl font-bold text-primary">{score}/{quiz.questions.length}</span><span className="text-xs text-muted-foreground">Score</span></div><div><span className="block text-2xl font-bold">{score}</span><span className="text-xs text-muted-foreground">Correct answers</span></div></div>}</div>
      <div className="space-y-5">{quiz.questions.map((question, index) => { const options = normalizeOptions(question.options); return <article key={`${index}-${question.question}`} className="rounded-xl border bg-card p-5 shadow-soft sm:p-6"><p className="text-xs font-bold uppercase text-primary">Question {index + 1} of {quiz.questions.length}</p><h3 className="mt-2 text-lg font-semibold leading-snug">{question.question}</h3><div className="mt-4 flex flex-col gap-2.5">{options.map((option, optionIndex) => { const selected = answers[index] === option; const correct = submitted && option === question.correct_answer; const wrong = submitted && selected && !correct; return <Button key={`${optionIndex}-${option}`} type="button" variant="outline" disabled={submitted} onClick={() => setAnswers((current) => ({ ...current, [index]: option }))} className={cn("h-auto w-full min-h-11 items-center justify-start gap-3 whitespace-normal rounded-lg px-3.5 py-2.5 text-left font-normal leading-relaxed shadow-none sm:px-4", selected && !submitted && "border-primary bg-primary/5 ring-1 ring-primary/30", correct && "border-success/40 bg-success/10 text-success ring-1 ring-success/30", wrong && "border-destructive/40 bg-destructive/10 text-destructive ring-1 ring-destructive/30", !selected && !correct && "hover:border-primary/30 hover:bg-accent")}><span className={cn("grid size-7 shrink-0 place-items-center rounded-md border text-xs font-bold uppercase transition-colors", selected && !submitted ? "border-primary bg-primary text-primary-foreground" : correct ? "border-success bg-success text-success-foreground" : wrong ? "border-destructive bg-destructive text-destructive-foreground" : "border-border bg-muted/60 text-muted-foreground")}>{"ABCD"[optionIndex] ?? optionIndex + 1}</span><span className="min-w-0 flex-1 break-words">{option}</span><span className={cn("size-4 shrink-0 rounded-full border-2 border-current transition-colors", (selected || correct) && "bg-current")} /></Button>; })}</div>{submitted && <div className="mt-4 flex gap-3 rounded-lg bg-accent p-4 text-sm"><CircleAlert className="mt-0.5 size-4 shrink-0 text-primary" /><div><p className="font-semibold">Explanation</p><p className="mt-1 leading-6 text-muted-foreground">{question.explanation}</p></div></div>}</article>; })}</div>
      <div className="mt-6 flex flex-wrap gap-3">{!submitted ? <Button size="lg" onClick={() => setSubmitted(true)} disabled={Object.keys(answers).length !== quiz.questions.length}><CheckCircle2 />Submit Quiz</Button> : <Button size="lg" onClick={reset}><RefreshCw />Generate New Quiz</Button>} {!submitted && Object.keys(answers).length !== quiz.questions.length && <p className="self-center text-sm text-muted-foreground">Answer every question to submit.</p>}</div></div>}
  </ToolPage>;
}
