"use client"

import { Suspense, useMemo, useRef } from "react"
import { Canvas } from "@react-three/fiber"
import {
  ContactShadows,
  Environment,
  OrbitControls,
  PerspectiveCamera,
  RoundedBox,
  useTexture,
} from "@react-three/drei"
import type { Group } from "three"
import { useFrame } from "@react-three/fiber"
import { PROJECTS } from "@/lib/portfolio-data"
import { SceneLoader } from "@/components/scene-loader"
import { useIsMobile } from "@/hooks/use-is-mobile"

const CYAN = "#00f2fe"

function Macbook({ activeId }: { activeId: string }) {
  const group = useRef<Group>(null)
  // Preload every project screenshot so switching is instant (no re-suspend).
  const textures = useTexture(PROJECTS.map((p) => p.image))
  const activeIndex = PROJECTS.findIndex((p) => p.id === activeId)
  const texture = useMemo(() => textures[activeIndex] ?? textures[0], [textures, activeIndex])

  useFrame((_, delta) => {
    if (group.current) {
      // gentle idle wobble on top of user orbit
      group.current.rotation.y += Math.sin(delta) * 0.0002
    }
  })

  return (
    <group ref={group} rotation={[0, -0.35, 0]}>
      {/* base / keyboard deck */}
      <RoundedBox args={[3.4, 0.14, 2.2]} radius={0.06} position={[0, -0.5, 0]}>
        <meshStandardMaterial color="#1e293b" metalness={0.9} roughness={0.25} />
      </RoundedBox>
      {/* trackpad hint */}
      <mesh position={[0, -0.42, 0.55]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1, 0.7]} />
        <meshStandardMaterial color="#0f172a" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* lid */}
      <group position={[0, -0.43, -1.05]} rotation={[-1.42, 0, 0]}>
        <RoundedBox args={[3.4, 2.15, 0.1]} radius={0.06} position={[0, 1.05, 0]}>
          <meshStandardMaterial color="#1e293b" metalness={0.9} roughness={0.25} />
        </RoundedBox>
        {/* screen */}
        <mesh position={[0, 1.05, 0.06]}>
          <planeGeometry args={[3.15, 1.9]} />
          <meshBasicMaterial map={texture} toneMapped={false} />
        </mesh>
        {/* screen glow frame */}
        <mesh position={[0, 1.05, 0.055]}>
          <planeGeometry args={[3.25, 2]} />
          <meshBasicMaterial color={CYAN} transparent opacity={0.08} toneMapped={false} />
        </mesh>
      </group>
    </group>
  )
}

export function DeviceViewport({ activeId }: { activeId: string }) {
  const isMobile = useIsMobile()
  return (
    <div className="h-[360px] w-full md:h-[460px]">
      <Canvas dpr={isMobile ? [1, 1.2] : [1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0.6, 6]} fov={40} />
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 5, 4]} intensity={1.2} />
        <spotLight position={[-4, 3, 2]} angle={0.5} penumbra={1} intensity={30} color={CYAN} />
<Suspense fallback={<SceneLoader />}>
  <Macbook activeId={activeId} />
</Suspense>
<Environment preset="night" />
<ContactShadows position={[0, -1.3, 0]} opacity={0.5} scale={9} blur={2.5} far={4} />
<OrbitControls
  enablePan={false}
  enableZoom={false}
  minPolarAngle={Math.PI / 3}
  maxPolarAngle={Math.PI / 1.9}
  autoRotate={!isMobile}
  autoRotateSpeed={0.6}
/>

      </Canvas>
    </div>
  )
}
