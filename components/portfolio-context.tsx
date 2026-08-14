"use client"

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import { PROJECTS } from "@/lib/portfolio-data"

type PortfolioState = {
  activeProjectId: string
  setActiveProject: (id: string) => void
  nextProject: () => void
  prevProject: () => void

  skillFilter: string | null
  setSkillFilter: (skill: string | null) => void

  contactOpen: boolean
  setContactOpen: (open: boolean) => void

  terminalOpen: boolean
  setTerminalOpen: (open: boolean) => void

  scrollTo: (id: string) => void
}

const PortfolioContext = createContext<PortfolioState | null>(null)

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [activeProjectId, setActiveProjectId] = useState(PROJECTS[0].id)
  const [skillFilter, setSkillFilter] = useState<string | null>(null)
  const [contactOpen, setContactOpen] = useState(false)
  const [terminalOpen, setTerminalOpen] = useState(false)

  const setActiveProject = useCallback((id: string) => setActiveProjectId(id), [])

  const nextProject = useCallback(() => {
    setActiveProjectId((cur) => {
      const i = PROJECTS.findIndex((p) => p.id === cur)
      return PROJECTS[(i + 1) % PROJECTS.length].id
    })
  }, [])

  const prevProject = useCallback(() => {
    setActiveProjectId((cur) => {
      const i = PROJECTS.findIndex((p) => p.id === cur)
      return PROJECTS[(i - 1 + PROJECTS.length) % PROJECTS.length].id
    })
  }, [])

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
  }, [])

  const value = useMemo<PortfolioState>(
    () => ({
      activeProjectId,
      setActiveProject,
      nextProject,
      prevProject,
      skillFilter,
      setSkillFilter,
      contactOpen,
      setContactOpen,
      terminalOpen,
      setTerminalOpen,
      scrollTo,
    }),
    [
      activeProjectId,
      setActiveProject,
      nextProject,
      prevProject,
      skillFilter,
      contactOpen,
      terminalOpen,
      scrollTo,
    ],
  )

  return <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>
}

export function usePortfolio() {
  const ctx = useContext(PortfolioContext)
  if (!ctx) throw new Error("usePortfolio must be used within PortfolioProvider")
  return ctx
}
