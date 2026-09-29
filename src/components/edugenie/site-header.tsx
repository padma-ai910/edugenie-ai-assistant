import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Logo, tools } from "./shared";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const links = [{ label: "Dashboard", to: "/dashboard" as const }, ...tools.map((tool) => ({ label: tool.short, to: tool.to }))];
  return <header className="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur-xl"><div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-5 sm:px-8"><Logo />
    <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">{links.map((link) => <Link key={link.to} to={link.to} className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground" activeProps={{ className: "bg-accent text-primary" }}>{link.label}</Link>)}</nav>
    <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setOpen((value) => !value)} aria-label={open ? "Close menu" : "Open menu"}>{open ? <X /> : <Menu />}</Button>
  </div>{open && <nav className="border-t border-border bg-background px-5 py-3 lg:hidden" aria-label="Mobile navigation">{links.map((link) => <Link key={link.to} to={link.to} onClick={() => setOpen(false)} className="block rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground" activeProps={{ className: "bg-accent text-primary" }}>{link.label}</Link>)}</nav>}</header>;
}
