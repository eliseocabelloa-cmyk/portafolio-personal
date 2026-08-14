"use client"

import { Suspense, useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Html, OrbitControls, PerspectiveCamera } from "@react-three/drei"
import type { Group, Mesh } from "three"
import { ORBIT_SKILLS, type OrbitSkill } from "@/lib/portfolio-data"
import { SceneLoader } from "@/components/scene-loader"
import { useIsMobile } from "@/hooks/use-is-mobile"

const CYAN = "#00f2fe"
const PURPLE = "#7928ca"

function Core() {
  const mesh = useRef<Mesh>(null)
  useFrame((_, delta) => {
    if (mesh.current) {
      mesh.current.rotation.y += delta * 0.4
      mesh.current.rotation.x += delta * 0.15
    }
  })
  return (
    <mesh ref={mesh}>
      <icosahedronGeometry args={[0.75, 1]} />
      <meshStandardMaterial
        color={CYAN}
        emissive={CYAN}
        emissiveIntensity={0.6}
        wireframe
        toneMapped={false}
      />
    </mesh>
  )
}

function Node({
  skill,
  selected,
  dimmed,
  onSelect,
}: {
  skill: OrbitSkill
  selected: boolean
  dimmed: boolean
  onSelect: (id: string) => void
}) {
  const ref = useRef<Group>(null)
  const [hovered, setHovered] = useState(false)
  const [radius, angleDeg, y] = skill.orbit
  const base = (angleDeg * Math.PI) / 180
  const color = skill.color === "cyan" ? CYAN : PURPLE

  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = clock.getElapsedTime() * 0.25 + base
    ref.current.position.x = Math.cos(t) * radius
    ref.current.position.z = Math.sin(t) * radius
    ref.current.position.y = y + Math.sin(clock.getElapsedTime() + base) * 0.15
    const target = hovered || selected ? 1.4 : 1
    ref.current.scale.x += (target - ref.current.scale.x) * 0.15
    ref.current.scale.y = ref.current.scale.x
    ref.current.scale.z = ref.current.scale.x
  })

  return (
    <group ref={ref}>
      <mesh
        onPointerOver={(e) => {
          e.stopPropagation()
          setHovered(true)
          document.body.style.cursor = "pointer"
        }}
        onPointerOut={(e) => {
          e.stopPropagation()
          setHovered(false)
          document.body.style.cursor = "auto"
        }}
        onClick={(e) => {
          e.stopPropagation()
          onSelect(skill.id)
        }}
      >
        <sphereGeometry args={[0.22, 32, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={selected ? 1.8 : dimmed ? 0.25 : 0.9}
          transparent
          opacity={dimmed ? 0.5 : 1}
          toneMapped={false}
        />
      </mesh>
      <Html center distanceFactor={8} position={[0, 0.42, 0]} zIndexRange={[20, 0]}>
        <span
          className={`pointer-events-none select-none whitespace-nowrap font-mono text-[11px] transition-opacity ${
            dimmed ? "opacity-40" : "opacity-100"
          }`}
          style={{ color }}
        >
          {skill.label}
        </span>
      </Html>
    </group>
  )
}

export function SkillOrbit({
  selected,
  onSelect,
}: {
  selected: string | null
  onSelect: (id: string) => void
}) {
  const isMobile = useIsMobile()
  return (
    <div className="h-[420px] w-full md:h-[520px]">
      <Canvas dpr={isMobile ? [1, 1.2] : [1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 1.5, 6.5]} fov={45} />
        <color attach="background" args={["#080C14"]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[0, 0, 0]} intensity={12} color={CYAN} distance={8} />
        <pointLight position={[3, 3, 3]} intensity={8} color={PURPLE} />
        <Suspense fallback={<SceneLoader />}>
          <Core />
          {ORBIT_SKILLS.map((s) => (
            <Node
              key={s.id}
              skill={s}
              selected={selected === s.id}
              dimmed={selected !== null && selected !== s.id}
              onSelect={onSelect}
            />
          ))}
        </Suspense>
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          autoRotate={!isMobile}
          autoRotateSpeed={0.5}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.8}
        />
      </Canvas>
    </div>
  )
}
