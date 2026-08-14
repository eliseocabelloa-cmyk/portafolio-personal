"use client"

import { useEffect, useRef, useState } from "react"
import { X, TerminalSquare } from "lucide-react"
import { PERSONAL_INFO } from "@/lib/portfolio-data"
import { usePortfolio } from "@/components/portfolio-context"

const BOOT_LINES = [
  "$ sistema --iniciar",
  "[ok] montando entorno de trabajo",
  "[ok] cargando motor gráfico Three.js",
  "[ok] hidratando árbol de React 19",
  "[ok] estableciendo contexto WebGL2",
  "> const dev = {",
  `    nombre: '${PERSONAL_INFO.shortName}',`,
  `    rol: '${PERSONAL_INFO.title}',`,
  "    stack: ['Next.js', 'FastAPI', 'TypeScript', 'Supabase'],",
  `    estado: '${PERSONAL_INFO.status}',`,
  "  }",
  "[ok] todos los sistemas operativos",
  "$ _",
]

export function LiveTerminal() {
  const { terminalOpen, setTerminalOpen } = usePortfolio()
  const [lines, setLines] = useState<string[]>([])
  const bodyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!terminalOpen) {
      setLines([])
      return
    }
    let i = 0
    const id = setInterval(() => {
      setLines((prev) => [...prev, BOOT_LINES[i]])
      i += 1
      if (i >= BOOT_LINES.length) clearInterval(id)
    }, 260)
    return () => clearInterval(id)
  }, [terminalOpen])

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight })
  }, [lines])

  if (!terminalOpen) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 w-[calc(100%-2rem)] max-w-md sm:w-96">
      <div className="overflow-hidden rounded-xl border border-neon-cyan/40 bg-[#080C14]/95 backdrop-blur glow-cyan">
        <div className="flex items-center justify-between border-b border-border bg-[#0f172a] px-3 py-2">
          <div className="flex items-center gap-2 font-mono text-xs text-neon-cyan">
            <TerminalSquare className="h-4 w-4" />
            eliseo@portafolio: ~
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-neon-purple/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-neon-cyan/60" />
            <button
              onClick={() => setTerminalOpen(false)}
              aria-label="Cerrar terminal"
              className="text-muted-foreground transition-colors hover:text-neon-cyan"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div
          ref={bodyRef}
          className="h-64 overflow-y-auto p-3 font-mono text-[12px] leading-relaxed"
        >
          {lines.map((l, i) => (
            <p
              key={i}
              className={
                l?.startsWith("[ok]")
                  ? "text-neon-cyan"
                  : l?.startsWith("$") || l?.startsWith(">")
                    ? "text-foreground"
                    : "text-muted-foreground"
              }
            >
              {l}
            </p>
          ))}
          <span className="inline-block h-3.5 w-1.5 animate-pulse bg-neon-cyan align-middle" />
        </div>
      </div>
    </div>
  )
}
