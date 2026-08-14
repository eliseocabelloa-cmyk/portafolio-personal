"use client"

import { Html, useProgress } from "@react-three/drei"

export function SceneLoader() {
  const { progress } = useProgress()
  return (
    <Html center>
      <div className="flex flex-col items-center gap-3">
        <div className="relative h-12 w-12">
          <div className="absolute inset-0 rounded-full border-2 border-neon-cyan/20" />
          <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-neon-cyan border-r-neon-purple" />
        </div>
        <span className="font-mono text-xs tracking-widest text-neon-cyan">
          {Math.round(progress)}% LOADING
        </span>
      </div>
    </Html>
  )
}
