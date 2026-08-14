"use client"

import { useRef, useState, type ReactNode } from "react"
import { useFrame } from "@react-three/fiber"
import { Float, Html, RoundedBox } from "@react-three/drei"
import type { Group } from "three"

const CYAN = "#00f2fe"
const PURPLE = "#7928ca"

type StationProps = {
  label: string
  hint: string
  accent: string
  active: boolean
  onHover: (v: boolean) => void
  onClick: () => void
  children: ReactNode
  position: [number, number, number]
}

/** Wraps an interactive station: hover scale, tooltip, emissive pulse. */
function Station({
  label,
  hint,
  accent,
  active,
  onHover,
  onClick,
  children,
  position,
}: StationProps) {
  const group = useRef<Group>(null)

  useFrame((_, delta) => {
    if (!group.current) return
    const target = active ? 1.08 : 1
    group.current.scale.x += (target - group.current.scale.x) * delta * 8
    group.current.scale.y = group.current.scale.x
    group.current.scale.z = group.current.scale.x
  })

  return (
    <group position={position}>
      <group
        ref={group}
        onPointerOver={(e) => {
          e.stopPropagation()
          onHover(true)
          document.body.style.cursor = "pointer"
        }}
        onPointerOut={(e) => {
          e.stopPropagation()
          onHover(false)
          document.body.style.cursor = "auto"
        }}
        onClick={(e) => {
          e.stopPropagation()
          onClick()
        }}
      >
        {children}
      </group>

      {active && (
        <Html position={[0, 1.5, 0]} center distanceFactor={9} zIndexRange={[40, 0]}>
          <div
            className="pointer-events-none w-44 -translate-y-2 rounded-lg border bg-[#0f172a]/95 px-3 py-2 text-center backdrop-blur"
            style={{ borderColor: accent, boxShadow: `0 0 20px -4px ${accent}` }}
          >
            <p className="font-mono text-[11px] font-semibold" style={{ color: accent }}>
              {label}
            </p>
            <p className="mt-0.5 text-[10px] leading-tight text-slate-300">{hint}</p>
          </div>
        </Html>
      )}
    </group>
  )
}

/* ---------- Individual 3D props ---------- */

function Laptop({ active }: { active: boolean }) {
  const screen = useRef<Group>(null)
  useFrame(({ clock }) => {
    if (screen.current) {
      const t = clock.getElapsedTime()
      screen.current.rotation.x = -1.15 + Math.sin(t) * 0.01
    }
  })
  return (
    <group>
      {/* base */}
      <RoundedBox args={[1.6, 0.08, 1.05]} radius={0.03} position={[0, -0.04, 0]}>
        <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.3} />
      </RoundedBox>
      {/* screen */}
      <group ref={screen} position={[0, 0, -0.5]}>
        <RoundedBox args={[1.6, 1, 0.05]} radius={0.03} position={[0, 0.5, 0]}>
          <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.3} />
        </RoundedBox>
        <mesh position={[0, 0.5, 0.03]}>
          <planeGeometry args={[1.45, 0.85]} />
          <meshStandardMaterial
            color={CYAN}
            emissive={CYAN}
            emissiveIntensity={active ? 1.6 : 0.9}
            toneMapped={false}
          />
        </mesh>
      </group>
    </group>
  )
}

function Phone({ active }: { active: boolean }) {
  return (
    <group rotation={[0, 0, 0.12]}>
      <RoundedBox args={[0.5, 0.95, 0.07]} radius={0.08}>
        <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.3} />
      </RoundedBox>
      <mesh position={[0, 0, 0.045]}>
        <planeGeometry args={[0.42, 0.82]} />
        <meshStandardMaterial
          color={PURPLE}
          emissive={PURPLE}
          emissiveIntensity={active ? 2 : 1.1}
          toneMapped={false}
        />
      </mesh>
    </group>
  )
}

function Server({ active }: { active: boolean }) {
  const lights = useRef<Group>(null)
  useFrame(({ clock }) => {
    if (lights.current) {
      lights.current.children.forEach((c, i) => {
        const m = (c as any).material
        if (m) m.emissiveIntensity = 0.6 + Math.sin(clock.getElapsedTime() * 3 + i) * 0.4
      })
    }
  })
  return (
    <group>
      <RoundedBox args={[0.9, 1.3, 0.7]} radius={0.04}>
        <meshStandardMaterial color="#0f172a" metalness={0.7} roughness={0.35} />
      </RoundedBox>
      <group ref={lights} position={[0, 0, 0.36]}>
        {[0.45, 0.15, -0.15, -0.45].map((y, i) => (
          <mesh key={y} position={[-0.28, y, 0]}>
            <boxGeometry args={[0.08, 0.08, 0.02]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? CYAN : PURPLE}
              emissive={i % 2 === 0 ? CYAN : PURPLE}
              emissiveIntensity={active ? 1.5 : 0.8}
              toneMapped={false}
            />
          </mesh>
        ))}
        {[0.45, 0.15, -0.15, -0.45].map((y) => (
          <mesh key={`bar-${y}`} position={[0.12, y, 0]}>
            <boxGeometry args={[0.5, 0.05, 0.02]} />
            <meshStandardMaterial color="#334155" metalness={0.6} roughness={0.4} />
          </mesh>
        ))}
      </group>
    </group>
  )
}

/* ---------- The scene ---------- */

export function CommandCenter({
  onOpenProjects,
  onOpenContact,
  onOpenTerminal,
}: {
  onOpenProjects: () => void
  onOpenContact: () => void
  onOpenTerminal: () => void
}) {
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <>
      <ambientLight intensity={0.4} />
      <hemisphereLight intensity={0.3} groundColor="#080C14" />
      <spotLight position={[4, 6, 4]} angle={0.5} penumbra={1} intensity={40} color={CYAN} />
      <spotLight position={[-4, 4, -2]} angle={0.6} penumbra={1} intensity={30} color={PURPLE} />
      <pointLight position={[0, 2, 3]} intensity={12} color="#ffffff" />

      {/* desk */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.7, 0]} receiveShadow>
        <planeGeometry args={[6, 6]} />
        <meshStandardMaterial color="#0b1220" metalness={0.4} roughness={0.6} />
      </mesh>

      <Float speed={1.4} rotationIntensity={0.15} floatIntensity={0.35}>
        <group position={[0, 0, 0]} scale={1.9}>
          <Station
            position={[-1.25, 0, 0.3]}
            label="VER PROYECTOS"
            hint="Haz clic en el portátil para ver mi trabajo"
            accent={CYAN}
            active={hovered === "laptop"}
            onHover={(v) => setHovered(v ? "laptop" : null)}
            onClick={onOpenProjects}
          >
            <Laptop active={hovered === "laptop"} />
          </Station>

          <Station
            position={[1.15, -0.05, 0.75]}
            label="CONTÁCTAME"
            hint="Toca el teléfono para enviar un mensaje"
            accent={PURPLE}
            active={hovered === "phone"}
            onHover={(v) => setHovered(v ? "phone" : null)}
            onClick={onOpenContact}
          >
            <Phone active={hovered === "phone"} />
          </Station>

          <Station
            position={[1.55, 0.1, -0.7]}
            label="CONSOLA EN VIVO"
            hint="Haz clic en el servidor para abrir la terminal"
            accent={CYAN}
            active={hovered === "server"}
            onHover={(v) => setHovered(v ? "server" : null)}
            onClick={onOpenTerminal}
          >
            <Server active={hovered === "server"} />
          </Station>
        </group>
      </Float>
    </>
  )
}
