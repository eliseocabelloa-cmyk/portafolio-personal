"use client"

import { useEffect, useState } from "react"

/**
 * Returns true on small / touch-first devices so 3D scenes can be simplified.
 */
export function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`)
    const update = () => setIsMobile(mql.matches)
    update()
    mql.addEventListener("change", update)
    return () => mql.removeEventListener("change", update)
  }, [breakpoint])

  return isMobile
}
