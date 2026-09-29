import { Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, BrainCircuit, FileText, Layers3, Sparkles, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const tools = [
  { title: "AI Quiz Generator", short: "Quiz", description: "Create focused quizzes from any topic and check your understanding.", to: "/quiz" as const, icon: BrainCircuit, tone: "blue" },
  { title: "Smart Summarizer", short: "Summarizer", description: "Turn lengthy study material into a clear, useful summary.", to: "/summarize" as const, icon: FileText, tone: "violet" },
  { title: "AI Tutor", short: "AI Tutor", description: "Ask a question and receive a simple, step-by-step explanation.", to: "/tutor" as const, icon: Sparkles, tone: "cyan" },
  { title: "Smart Content Structurer", short: "Structurer", description: "Organize raw notes into topics, key points, definitions, and examples.", to: "/structure" as const, icon: Layers3, tone: "purple" },
];

export function Logo() {
  return <Link to="/" className="flex items-center gap-2.5 font-bold text-foreground"><span className="grid size-9 place-items-center rounded-lg bg-primary text-primary-foreground shadow-glow"><BookOpen className="size-5" /></span><span className="text-lg">Edu<span className="text-primary">Genie</span></span></Link>;
}

export function FeatureCard({ title, description, to, icon: Icon, action = "Open tool", tone = "blue", index }: { title: string; description: string; to: "/quiz" | "/summarize" | "/tutor" | "/structure"; icon: LucideIcon; action?: string; tone?: string; index?: string }) {
  return <article className="group flex min-h-64 flex-col rounded-2xl border border-border/80 bg-card p-6 shadow-soft transition duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lift">
    <div className="flex items-start justify-between"><span className={cn("grid size-12 place-items-center rounded-xl", `tool-${tone}`)}><Icon className="size-6" /></span>{index && <span className="text-sm font-semibold text-muted-foreground">{index}</span>}</div>
    <h3 className="mt-6 text-xl font-bold text-card-foreground">{title}</h3><p className="mt-2 flex-1 text-sm leading-6 text-muted-foreground">{description}</p>
    <Button asChild variant="ghost" className="mt-5 w-fit px-0 text-primary hover:bg-transparent hover:text-primary/80"><Link to={to}>{action}<ArrowRight className="transition-transform group-hover:translate-x-1" /></Link></Button>
  </article>;
}

export function PageHeader({ eyebrow, title, description, icon: Icon }: { eyebrow: string; title: string; description: string; icon: LucideIcon }) {
  return <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center"><span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-glow"><Icon className="size-7" /></span><div><p className="mb-2 text-xs font-bold uppercase text-primary">{eyebrow}</p><h1 className="text-3xl font-bold text-foreground sm:text-4xl">{title}</h1><p className="mt-2 max-w-2xl text-muted-foreground">{description}</p></div></div>;
}

export function ToolPage({ children }: { children: ReactNode }) { return <main className="min-h-[calc(100vh-4.5rem)] bg-app"><div className="mx-auto max-w-5xl px-5 py-10 sm:px-8 sm:py-14">{children}</div></main>; }

export function ErrorNotice({ message }: { message: string }) { return <div role="alert" className="mt-5 rounded-lg border border-destructive/25 bg-destructive/10 px-4 py-3 text-sm text-destructive">{message}</div>; }

export function Spinner() { return <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" aria-hidden />; }
