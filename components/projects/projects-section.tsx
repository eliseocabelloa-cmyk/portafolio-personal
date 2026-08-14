"use client"

import { useEffect, useMemo } from "react"
import { ChevronLeft, ChevronRight, Code, ExternalLink, X } from "lucide-react"
import { PROJECTS } from "@/lib/portfolio-data"
import { usePortfolio } from "@/components/portfolio-context"
import { DeviceViewport } from "./device-viewport"

export function ProjectsSection() {
  const {
    activeProjectId,
    setActiveProject,
    nextProject,
    prevProject,
    skillFilter,
    setSkillFilter,
  } = usePortfolio()

  const filtered = useMemo(() => {
    if (!skillFilter) return PROJECTS
    const q = skillFilter.toLowerCase()
    return PROJECTS.filter((p) =>
      p.tech.some(
        (t) =>
          t.toLowerCase().includes(q) ||
          q.includes(t.toLowerCase().split(" ")[0]),
      ),
    )
  }, [skillFilter])

  // Keep the active project valid whenever the filter changes.
  useEffect(() => {
    if (filtered.length && !filtered.some((p) => p.id === activeProjectId)) {
      setActiveProject(filtered[0].id)
    }
  }, [filtered, activeProjectId, setActiveProject])

  const active = PROJECTS.find((p) => p.id === activeProjectId) ?? PROJECTS[0]
  const showViewer = filtered.some((p) => p.id === active.id)

  return (
    <section id="projects" className="relative scroll-mt-24 border-t border-border px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs tracking-[0.3em] text-neon-cyan">03 // PROYECTOS</p>
            <h2 className="mt-2 text-3xl font-bold md:text-4xl">Visor de Proyectos</h2>
          </div>
          {skillFilter && (
            <button
              onClick={() => setSkillFilter(null)}
              className="flex items-center gap-2 rounded-full border border-neon-purple/40 bg-[#0f172a] px-3 py-1.5 font-mono text-xs text-neon-purple"
            >
              Filtrado por {skillFilter}
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {filtered.length === 0 ? (
          <div className="mt-12 rounded-xl border border-border bg-[#0f172a]/60 p-12 text-center">
            <p className="font-mono text-sm text-muted-foreground">
              {"// no se encontraron proyectos con "}
              <span className="text-neon-cyan">{skillFilter}</span>
            </p>
          </div>
        ) : (
          <div className="mt-10 grid items-center gap-8 lg:grid-cols-2">
            {/* 3D viewer */}
            <div className="relative rounded-2xl border border-border bg-[#0f172a]/40 glow-cyan">
              {showViewer && <DeviceViewport activeId={active.id} />}
              <div className="absolute left-4 top-4 flex gap-2">
                <button
                  onClick={prevProject}
                  aria-label="Proyecto anterior"
                  className="rounded-full border border-border bg-[#0f172a]/80 p-2 text-neon-cyan transition-colors hover:border-neon-cyan"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={nextProject}
                  aria-label="Siguiente proyecto"
                  className="rounded-full border border-border bg-[#0f172a]/80 p-2 text-neon-cyan transition-colors hover:border-neon-cyan"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
              <p className="absolute bottom-3 right-4 font-mono text-[10px] text-muted-foreground">
                arrastra para girar 360°
              </p>
            </div>

            {/* details */}
            <div>
              <p className="font-mono text-sm text-neon-purple">{active.tagline}</p>
              <h3 className="mt-1 text-2xl font-bold md:text-3xl">{active.title}</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">{active.description}</p>

              <div className="mt-5 flex flex-wrap gap-2">
                {active.tech.map((t) => (
                  <button
                    key={t}
                    onClick={() => setSkillFilter(t === skillFilter ? null : t)}
                    className={`rounded-md border px-2.5 py-1 font-mono text-xs transition-colors ${
                      t === skillFilter
                        ? "border-neon-cyan bg-neon-cyan/10 text-neon-cyan"
                        : "border-border bg-[#0f172a] text-muted-foreground hover:border-neon-cyan/50 hover:text-foreground"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              <div className="mt-6 flex gap-3">
                <a
                  href={active.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-lg bg-neon-cyan px-4 py-2 font-mono text-sm font-semibold text-[#080C14] transition-transform hover:scale-105"
                >
                  <ExternalLink className="h-4 w-4" /> Ver Demo
                </a>
                <a
                  href={active.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-lg border border-border px-4 py-2 font-mono text-sm transition-colors hover:border-neon-purple hover:text-neon-purple"
                >
                  <Code className="h-4 w-4" /> Código Fuente
                </a>
              </div>

              {/* project switch list */}
              <div className="mt-8 space-y-2">
                {filtered.map((p, i) => (
                  <button
                    key={p.id}
                    onClick={() => setActiveProject(p.id)}
                    className={`flex w-full items-center gap-3 rounded-lg border px-4 py-3 text-left transition-colors ${
                      p.id === active.id
                        ? "border-neon-cyan/50 bg-[#0f172a]"
                        : "border-transparent bg-[#0f172a]/40 hover:bg-[#0f172a]/70"
                    }`}
                  >
                    <span className="font-mono text-xs text-neon-purple">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1 text-sm font-medium">{p.title}</span>
                    {p.id === active.id && (
                      <span className="h-2 w-2 rounded-full bg-neon-cyan glow-cyan" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
