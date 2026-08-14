"use client"

import { useState, type FormEvent } from "react"
import { Code, AtSign, Mail } from "lucide-react"
import { HoloButton } from "./holo-button"

type SendState = "idle" | "sending" | "sent"

export function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" })
  const [state, setState] = useState<SendState>("idle")

  const submit = (e?: FormEvent) => {
    e?.preventDefault()
    if (state !== "idle") return
    if (!form.name || !form.email || !form.message) return
    setState("sending")
    // simulate transmission — swap for a real action / API route
    setTimeout(() => {
      setState("sent")
      setTimeout(() => {
        setState("idle")
        setForm({ name: "", email: "", message: "" })
      }, 2600)
    }, 1600)
  }

  return (
    <section id="contact" className="relative border-t border-border px-6 py-24">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2">
        <div>
          <p className="font-mono text-xs tracking-[0.3em] text-neon-cyan">04 // TRANSMIT</p>
          <h2 className="mt-2 text-3xl font-bold md:text-4xl text-balance">
            Open a channel
          </h2>
          <p className="mt-3 max-w-md leading-relaxed text-muted-foreground">
            Have a project or an idea worth building in 3D? Fill the console
            below and hit the holographic transmit button.
          </p>

          <div className="mt-8 space-y-3 font-mono text-sm">
            <a href="mailto:hello@aria.dev" className="flex items-center gap-3 text-muted-foreground transition-colors hover:text-neon-cyan">
              <Mail className="h-4 w-4 text-neon-cyan" /> hello@aria.dev
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-muted-foreground transition-colors hover:text-neon-cyan">
              <Code className="h-4 w-4 text-neon-cyan" /> github.com/aria
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-muted-foreground transition-colors hover:text-neon-cyan">
              <AtSign className="h-4 w-4 text-neon-cyan" /> linkedin.com/in/aria
            </a>
          </div>
        </div>

        <form
          onSubmit={submit}
          className="rounded-2xl border border-border bg-[#0f172a]/50 p-6 glow-purple"
        >
          <div className="space-y-4">
            <Field
              label="~/name"
              value={form.name}
              onChange={(v) => setForm((f) => ({ ...f, name: v }))}
              placeholder="Ada Lovelace"
            />
            <Field
              label="~/email"
              type="email"
              value={form.email}
              onChange={(v) => setForm((f) => ({ ...f, email: v }))}
              placeholder="ada@domain.dev"
            />
            <div>
              <label className="font-mono text-xs text-neon-cyan">~/message</label>
              <textarea
                rows={4}
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                placeholder="Tell me about your project…"
                className="mt-1.5 w-full resize-none rounded-lg border border-border bg-[#080C14] px-3 py-2 font-mono text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-neon-cyan"
              />
            </div>
          </div>

          <div className="mt-2">
            <HoloButton state={state} onClick={submit} />
            <p className="text-center font-mono text-xs text-muted-foreground">
              {state === "sent"
                ? "// message transmitted successfully"
                : "// click the 3D button to send"}
            </p>
          </div>
        </form>
      </div>
    </section>
  )
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder: string
  type?: string
}) {
  return (
    <div>
      <label className="font-mono text-xs text-neon-cyan">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1.5 w-full rounded-lg border border-border bg-[#080C14] px-3 py-2 font-mono text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-neon-cyan"
      />
    </div>
  )
}
