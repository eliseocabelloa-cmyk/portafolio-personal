"use client"

import { PERSONAL_INFO } from "@/lib/portfolio-data"
import { usePortfolio } from "@/components/portfolio-context"

const LINKS = [
  { id: "home", label: "Inicio" },
  { id: "skills", label: "Habilidades" },
  { id: "projects", label: "Proyectos" },
  { id: "contact", label: "Contacto" },
]

export function NavBar() {
  const { scrollTo, setContactOpen } = usePortfolio()

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-border/60 bg-[#080C14]/70 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <button
          onClick={() => scrollTo("home")}
          className="font-mono text-sm font-bold tracking-widest text-neon-cyan text-glow-cyan"
        >
          {PERSONAL_INFO.shortName.split(" ")[0]}
          <span className="text-neon-purple">.dev</span>
        </button>
        <div className="hidden items-center gap-6 md:flex">
          {LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => scrollTo(l.id)}
              className="font-mono text-xs text-muted-foreground transition-colors hover:text-neon-cyan"
            >
              {l.label}
            </button>
          ))}
        </div>
        <button
          onClick={() => setContactOpen(true)}
          className="rounded-full border border-neon-cyan/40 bg-neon-cyan/10 px-4 py-1.5 font-mono text-xs text-neon-cyan transition-colors hover:bg-neon-cyan/20"
        >
          Contáctame
        </button>
      </nav>
    </header>
  )
}
