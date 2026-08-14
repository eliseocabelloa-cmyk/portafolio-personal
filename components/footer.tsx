import { PERSONAL_INFO } from "@/lib/portfolio-data"

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 font-mono text-xs text-muted-foreground sm:flex-row">
        <span>
          {PERSONAL_INFO.shortName} — {PERSONAL_INFO.degree} @ UNI
        </span>
        <span className="text-center sm:text-right">
          {PERSONAL_INFO.location} · built with React Three Fiber
        </span>
        <span>{`// ${year}`}</span>
      </div>
    </footer>
  )
}
