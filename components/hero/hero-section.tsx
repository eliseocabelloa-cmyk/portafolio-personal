"use client"

import { Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, PerspectiveCamera } from "@react-three/drei"
import { Laptop, MessageSquare, TerminalSquare, MousePointerClick } from "lucide-react"
import { CommandCenter } from "./command-center"
import { SceneLoader } from "@/components/scene-loader"
import { usePortfolio } from "@/components/portfolio-context"
import { useIsMobile } from "@/hooks/use-is-mobile"
import { PERSONAL_INFO } from "@/lib/portfolio-data"

export function HeroSection() {
  const { scrollTo, setContactOpen, setTerminalOpen } = usePortfolio()
  const isMobile = useIsMobile()

  const actions = [
    {
      icon: Laptop,
      label: "Proyectos",
      hint: "Portátil",
      run: () => scrollTo("projects"),
      accent: "text-neon-cyan border-neon-cyan/40",
    },
    {
      icon: MessageSquare,
      label: "Contacto",
      hint: "Teléfono",
      run: () => setContactOpen(true),
      accent: "text-neon-purple border-neon-purple/40",
    },
    {
      icon: TerminalSquare,
      label: "Consola",
      hint: "Servidor",
      run: () => setTerminalOpen(true),
      accent: "text-neon-cyan border-neon-cyan/40",
    },
  ]

  return (
    <section
      id="home"
      className="relative flex min-h-screen scroll-mt-24 flex-col overflow-hidden grid-bg"
    >
      {/* ambient glow */}
      <div className="pointer-events-none absolute -left-40 top-10 h-96 w-96 rounded-full bg-neon-cyan/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-neon-purple/10 blur-[120px]" />

      {/* 3D workspace — full-bleed background */}
      <div className="absolute inset-0 z-0">
        <Canvas dpr={isMobile ? [1, 1.2] : [1, 2]} className="!touch-pan-y">
          <PerspectiveCamera makeDefault position={[0, 0.7, 3.8]} fov={52} />
          <color attach="background" args={["#080C14"]} />
          <fog attach="fog" args={["#080C14", 9, 18]} />
          <Suspense fallback={<SceneLoader />}>
            <CommandCenter
              onOpenProjects={() => scrollTo("projects")}
              onOpenContact={() => setContactOpen(true)}
              onOpenTerminal={() => setTerminalOpen(true)}
            />
          </Suspense>
          <OrbitControls
            enablePan={false}
            enableZoom={!isMobile}
            target={[0, 0.15, 0]}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 2.15}
            minDistance={3}
            maxDistance={7}
            autoRotate={!isMobile}
            autoRotateSpeed={0.4}
          />
        </Canvas>

        {/* mobile-friendly action controls (also a nice legend on desktop) */}
        <div className="pointer-events-none absolute inset-x-0 bottom-4 z-10 flex flex-col items-center gap-3 px-6">
          <div className="pointer-events-none hidden items-center gap-2 rounded-full border border-border bg-[#0f172a]/70 px-3 py-1 font-mono text-[11px] text-muted-foreground backdrop-blur md:flex">
            <MousePointerClick className="h-3.5 w-3.5 text-neon-cyan" />
            Arrastra para orbitar · haz clic en un objeto para activarlo
          </div>
          <div className="pointer-events-auto flex flex-wrap justify-center gap-2">
            {actions.map((a) => (
              <button
                key={a.label}
                onClick={a.run}
                className={`flex items-center gap-2 rounded-full border bg-[#0f172a]/80 px-4 py-2 font-mono text-xs backdrop-blur transition-colors hover:bg-[#0f172a] ${a.accent}`}
              >
                <a.icon className="h-4 w-4" />
                {a.label}
                <span className="text-muted-foreground">/ {a.hint}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* readability gradient */}
      <div className="pointer-events-none absolute inset-0 z-[5] bg-gradient-to-b from-[#080C14] via-[#080C14]/70 to-transparent md:bg-gradient-to-r md:from-[#080C14] md:via-[#080C14]/60 md:to-transparent" />

      {/* copy overlay */}
      <div className="pointer-events-none relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-6 pt-28 md:pt-24">
        <p className="font-mono text-sm tracking-[0.3em] text-neon-cyan">
          {"> INICIANDO ESPACIO DE TRABAJO"}
        </p>
        <h1 className="mt-4 max-w-2xl text-balance text-4xl font-bold leading-tight md:text-5xl">
          Construyendo soluciones de{" "}
          <span className="text-neon-cyan text-glow-cyan">software e IA</span> que
          potencian el aprendizaje y la tecnología académica.
        </h1>
        <p className="mt-5 max-w-md text-pretty leading-relaxed text-muted-foreground">
          {PERSONAL_INFO.bio} Interactúa con la estación de trabajo — cada objeto
          es un control funcional.
        </p>
      </div>
    </section>
  )
}
