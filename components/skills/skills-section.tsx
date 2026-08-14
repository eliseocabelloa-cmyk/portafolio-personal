"use client"

import { ORBIT_SKILLS, SKILLS } from "@/lib/portfolio-data"
import { usePortfolio } from "@/components/portfolio-context"
import { SkillOrbit } from "./skill-orbit"

export function SkillsSection() {
  const { skillFilter, setSkillFilter, scrollTo } = usePortfolio()

  const handleSelect = (id: string) => {
    const next = id === skillFilter ? null : id
    setSkillFilter(next)
    if (next) {
      setTimeout(() => scrollTo("projects"), 120)
    }
  }

  return (
    <section id="skills" className="relative scroll-mt-24 border-t border-border px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="font-mono text-xs tracking-[0.3em] text-neon-cyan">02 // HABILIDADES</p>
          <h2 className="mt-2 text-3xl font-bold md:text-4xl">Constelación Tecnológica</h2>
          <p className="mx-auto mt-3 max-w-xl text-pretty leading-relaxed text-muted-foreground">
            Haz clic en cualquier nodo de la órbita para filtrar mis proyectos por esa tecnología.
            El nodo activo permanece iluminado mientras los demás se atenúan.
          </p>
        </div>

        <div className="mt-6 grid items-start gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div className="rounded-2xl border border-border bg-[#0f172a]/30 glow-purple">
            <SkillOrbit selected={skillFilter} onSelect={handleSelect} />
          </div>

          <div className="space-y-6">
            {SKILLS.map((cat) => (
              <div key={cat.category}>
                <p className="font-mono text-xs text-neon-purple">{cat.category}</p>
                <div className="mt-3 grid gap-2">
                  {cat.skills.map((s) => {
                    const filterKey = s.name.split(" ")[0].split("/")[0]
                    const activeNode =
                      skillFilter === s.name ||
                      skillFilter === filterKey ||
                      ORBIT_SKILLS.some((o) => o.id === skillFilter && s.name.includes(o.id))
                    return (
                      <button
                        key={s.name}
                        onClick={() => handleSelect(s.name.includes("Next.js") ? "Next.js 16" : filterKey)}
                        className={`flex items-center justify-between rounded-lg border px-4 py-2.5 font-mono text-xs transition-colors ${
                          activeNode
                            ? "border-neon-cyan bg-neon-cyan/10 text-neon-cyan glow-cyan"
                            : "border-border bg-[#0f172a]/60 text-muted-foreground hover:border-neon-cyan/40 hover:text-foreground"
                        }`}
                      >
                        <span>{s.name}</span>
                        <span className="text-[10px] opacity-70">{s.level}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}
            {skillFilter && (
              <button
                onClick={() => setSkillFilter(null)}
                className="font-mono text-xs text-neon-purple underline-offset-4 hover:underline"
              >
                {"// limpiar filtro"}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
