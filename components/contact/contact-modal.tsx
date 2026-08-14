"use client"

import { useEffect, useState, type FormEvent } from "react"
import { X } from "lucide-react"
import { usePortfolio } from "@/components/portfolio-context"
import { HoloButton } from "./holo-button"

type SendState = "idle" | "sending" | "sent"

export function ContactModal() {
  const { contactOpen, setContactOpen } = usePortfolio()
  const [form, setForm] = useState({ name: "", email: "", message: "" })
  const [state, setState] = useState<SendState>("idle")

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setContactOpen(false)
    if (contactOpen) window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [contactOpen, setContactOpen])

  if (!contactOpen) return null

  const submit = (e?: FormEvent) => {
    e?.preventDefault()
    if (state !== "idle" || !form.name || !form.email || !form.message) return
    setState("sending")
    setTimeout(() => {
      setState("sent")
      setTimeout(() => setContactOpen(false), 1800)
    }, 1500)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        aria-label="Close contact"
        onClick={() => setContactOpen(false)}
        className="absolute inset-0 bg-[#080C14]/80 backdrop-blur-sm"
      />
      <div className="relative z-10 w-full max-w-md rounded-2xl border border-neon-purple/40 bg-[#0f172a] p-6 glow-purple">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-mono text-xs tracking-[0.3em] text-neon-purple">// INCOMING</p>
            <h3 className="mt-1 text-xl font-bold">Quick message</h3>
          </div>
          <button
            onClick={() => setContactOpen(false)}
            aria-label="Close"
            className="rounded-full border border-border p-1.5 text-muted-foreground transition-colors hover:border-neon-purple hover:text-neon-purple"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={submit} className="mt-4 space-y-3">
          <input
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            placeholder="Name"
            className="w-full rounded-lg border border-border bg-[#080C14] px-3 py-2 font-mono text-sm outline-none focus:border-neon-cyan"
          />
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            placeholder="Email"
            className="w-full rounded-lg border border-border bg-[#080C14] px-3 py-2 font-mono text-sm outline-none focus:border-neon-cyan"
          />
          <textarea
            rows={3}
            value={form.message}
            onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
            placeholder="Message"
            className="w-full resize-none rounded-lg border border-border bg-[#080C14] px-3 py-2 font-mono text-sm outline-none focus:border-neon-cyan"
          />
          <HoloButton state={state} onClick={submit} />
        </form>
      </div>
    </div>
  )
}
