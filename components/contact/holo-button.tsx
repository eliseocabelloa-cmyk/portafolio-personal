"use client"

import { Suspense, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { RoundedBox, Text } from "@react-three/drei"
import type { Group, Mesh } from "three"

const CYAN = "#00f2fe"
const PURPLE = "#7928ca"

/** state: idle | sending | sent — drives the holographic reaction. */
function ButtonMesh({
  state,
  onClick,
}: {
  state: "idle" | "sending" | "sent"
  onClick: () => void
}) {
  const group = useRef<Group>(null)
  const ring = useRef<Mesh>(null)

  useFrame((clockState, delta) => {
    const t = clockState.clock.getElapsedTime()
    if (group.current) {
      group.current.rotation.y = Math.sin(t * 0.6) * 0.25
      const press = state === "sending" ? -0.12 : 0
      group.current.position.z += (press - group.current.position.z) * delta * 10
      const lift = state === "sent" ? 0.25 : 0
      group.current.position.y += (lift - group.current.position.y) * delta * 6
    }
    if (ring.current) {
      ring.current.rotation.z = t * (state === "sending" ? 4 : 1)
      const s = state === "sending" ? 1.25 + Math.sin(t * 8) * 0.08 : 1
      ring.current.scale.setScalar(s)
    }
  })

  const color = state === "sent" ? "#22d3a7" : state === "sending" ? PURPLE : CYAN
  const label = state === "sent" ? "SENT" : state === "sending" ? "SENDING..." : "TRANSMIT"

  return (
    <group
      ref={group}
      onClick={onClick}
      onPointerOver={() => (document.body.style.cursor = "pointer")}
      onPointerOut={() => (document.body.style.cursor = "auto")}
    >
      <mesh ref={ring} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -0.05]}>
        <torusGeometry args={[1.35, 0.03, 16, 80]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.4} toneMapped={false} />
      </mesh>
      <RoundedBox args={[2.2, 0.9, 0.35]} radius={0.16} smoothness={6}>
        <meshStandardMaterial
          color="#0f172a"
          emissive={color}
          emissiveIntensity={0.35}
          metalness={0.6}
          roughness={0.25}
        />
      </RoundedBox>
      <Text
        position={[0, 0, 0.2]}
        fontSize={0.28}
        letterSpacing={0.08}
        color={color}
        anchorX="center"
        anchorY="middle"
        font="https://cdn.jsdelivr.net/npm/@fontsource/jetbrains-mono@5.0.8/files/jetbrains-mono-latin-700-normal.woff"
      >
        {label}
      </Text>
    </group>
  )
}

export function HoloButton({
  state,
  onClick,
}: {
  state: "idle" | "sending" | "sent"
  onClick: () => void
}) {
  return (
    <div className="h-40 w-full">
      <Canvas camera={{ position: [0, 0, 4.2], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={0.6} />
        <pointLight position={[2, 2, 3]} intensity={12} color={CYAN} />
        <pointLight position={[-2, -1, 2]} intensity={8} color={PURPLE} />
        <Suspense fallback={null}>
          <ButtonMesh state={state} onClick={onClick} />
        </Suspense>
      </Canvas>
    </div>
  )
}
