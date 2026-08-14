"use client"

import { useCallback, useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { AtSign, Code, Link2, Mail, Send, Share2, TerminalSquare } from "lucide-react"
import { PERSONAL_INFO } from "@/lib/portfolio-data"
import { HoloButton } from "./holo-button"

type SendState = "idle" | "sending" | "sent" | "error"
type FormData = { name: string; email: string; message: string }
type FieldErrors = Partial<Record<keyof FormData, string>>

const BOOT_LINES = [
  "$ aria --iniciar módulo-contacto",
  "[ok] cargando perfil de PERSONAL_INFO",
  `[ok] usuario: ${PERSONAL_INFO.shortName}`,
  `[ok] estado: ${PERSONAL_INFO.status}`,
  "[ok] escribe 'help' para ver comandos | 'send' para abrir formulario",
  "$ _",
]

const COMMANDS: Record<string, string | string[]> = {
  help: [
    "Comandos disponibles:",
    "  help     — mostrar esta lista",
    "  whoami   — resumen de perfil",
    "  socials  — enlaces de redes sociales",
    "  clear    — limpiar terminal",
    "  send     — abrir formulario de contacto",
  ],
  whoami: [
    PERSONAL_INFO.name,
    PERSONAL_INFO.title,
    PERSONAL_INFO.university,
    PERSONAL_INFO.location,
    "",
    PERSONAL_INFO.bio,
  ],
  socials: [
    `github    → ${PERSONAL_INFO.contact.github}`,
    `linkedin  → ${PERSONAL_INFO.contact.linkedin}`,
    `instagram → ${PERSONAL_INFO.contact.instagram}`,
    `email     → ${PERSONAL_INFO.contact.emailPersonal}`,
  ],
}

function validateForm(form: FormData): FieldErrors {
  const errors: FieldErrors = {}
  if (form.name.trim().length < 2) errors.name = "El nombre debe tener al menos 2 caracteres"
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errors.email = "Correo electrónico inválido"
  if (form.message.trim().length < 10) errors.message = "El mensaje debe tener al menos 10 caracteres"
  return errors
}

const SOCIAL_LINKS = [
  {
    label: "GitHub",
    href: PERSONAL_INFO.contact.github,
    icon: Code,
    accent: "hover:border-neon-cyan hover:text-neon-cyan",
  },
  {
    label: "LinkedIn",
    href: PERSONAL_INFO.contact.linkedin,
    icon: Link2,
    accent: "hover:border-neon-purple hover:text-neon-purple",
  },
  {
    label: "Instagram",
    href: PERSONAL_INFO.contact.instagram,
    icon: Share2,
    accent: "hover:border-neon-cyan hover:text-neon-cyan",
  },
  {
    label: "Email UNI",
    href: `mailto:${PERSONAL_INFO.contact.emailUniversity}`,
    icon: AtSign,
    accent: "hover:border-neon-purple hover:text-neon-purple",
  },
  {
    label: "Email",
    href: `mailto:${PERSONAL_INFO.contact.emailPersonal}`,
    icon: Mail,
    accent: "hover:border-neon-cyan hover:text-neon-cyan",
  },
]

export function ContactTerminal() {
  const [log, setLog] = useState<string[]>([])
  const [command, setCommand] = useState("")
  const [formOpen, setFormOpen] = useState(false)
  const [form, setForm] = useState<FormData>({ name: "", email: "", message: "" })
  const [errors, setErrors] = useState<FieldErrors>({})
  const [state, setState] = useState<SendState>("idle")
  const logRef = useRef<HTMLDivElement>(null)
  const booted = useRef(false)

  const appendLog = useCallback((lines: string | string[]) => {
    const next = Array.isArray(lines) ? lines : [lines]
    setLog((prev) => [...prev, ...next])
  }, [])

  useEffect(() => {
    if (booted.current) return
    booted.current = true
    let i = 0
    const id = setInterval(() => {
      setLog((prev) => [...prev, BOOT_LINES[i]])
      i += 1
      if (i >= BOOT_LINES.length) clearInterval(id)
    }, 280)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: "smooth" })
  }, [log, formOpen])

  const runCommand = (raw: string) => {
    const cmd = raw.trim().toLowerCase()
    if (!cmd) return
    appendLog(`$ ${raw.trim()}`)

    if (cmd === "clear") {
      setLog([])
      return
    }
    if (cmd === "send") {
      setFormOpen(true)
      appendLog("[ok] formulario de contacto desbloqueado — completa los campos")
      return
    }
    const response = COMMANDS[cmd]
    if (response) {
      appendLog(response)
    } else {
      appendLog(`// err: comando desconocido '${cmd}'. escribe 'help'`)
    }
  }

  const onCommandKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      runCommand(command)
      setCommand("")
    }
  }

  const submit = (e?: FormEvent) => {
    e?.preventDefault()
    if (state !== "idle") return

    const fieldErrors = validateForm(form)
    setErrors(fieldErrors)
    if (Object.keys(fieldErrors).length > 0) {
      setState("error")
      Object.values(fieldErrors).forEach((msg) => appendLog(`// err: ${msg}`))
      setTimeout(() => setState("idle"), 1200)
      return
    }

    setState("sending")
    appendLog("[..] transmitiendo mensaje...")
    setTimeout(() => {
      setState("sent")
      appendLog("[ok] mensaje transmitido con éxito")
      setTimeout(() => {
        setState("idle")
        setForm({ name: "", email: "", message: "" })
        setErrors({})
      }, 2600)
    }, 1600)
  }

  return (
    <section id="contact" className="relative scroll-mt-24 border-t border-border px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center md:text-left">
          <p className="font-mono text-xs tracking-[0.3em] text-neon-cyan">04 // CONTACTO</p>
          <h2 className="mt-2 text-3xl font-bold md:text-4xl text-balance">Abre un canal</h2>
          <p className="mx-auto mt-3 max-w-xl text-pretty leading-relaxed text-muted-foreground md:mx-0">
            Interactúa con la consola o envía un mensaje directo. Escribe{" "}
            <code className="text-neon-cyan">help</code> para ver comandos disponibles.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="overflow-hidden rounded-2xl border border-neon-cyan/30 bg-[#090D16]/90 backdrop-blur-md glow-cyan"
        >
          {/* Terminal chrome */}
          <div className="flex items-center justify-between border-b border-border bg-[#0f172a]/80 px-4 py-3">
            <div className="flex items-center gap-3">
              <span className="h-2.5 w-2.5 rounded-full bg-neon-purple/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-neon-cyan/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/40" />
              <span className="ml-2 flex items-center gap-2 font-mono text-xs text-neon-cyan">
                <TerminalSquare className="h-4 w-4" />
                eliseo@portafolio: ~/contacto
              </span>
            </div>
            <span className="font-mono text-[10px] text-muted-foreground">bash — 80×24</span>
          </div>

          {/* Log output */}
          <div
            ref={logRef}
            aria-live="polite"
            className="h-52 overflow-y-auto border-b border-border/60 p-4 font-mono text-[12px] leading-relaxed md:h-56"
          >
            <AnimatePresence initial={false}>
              {log.map((line, i) => (
                <motion.p
                  key={`${i}-${line.slice(0, 20)}`}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  className={
                    line.startsWith("[ok]")
                      ? "text-neon-cyan"
                      : line.startsWith("[..]")
                        ? "text-neon-purple"
                        : line.startsWith("// err")
                          ? "text-red-400"
                          : line.startsWith("$")
                            ? "text-foreground"
                            : "text-muted-foreground"
                  }
                >
                  {line}
                </motion.p>
              ))}
            </AnimatePresence>
            <span className="inline-block h-3.5 w-1.5 animate-pulse bg-neon-cyan align-middle" />
          </div>

          {/* Command prompt */}
          <div className="flex items-center gap-2 border-b border-border/60 bg-[#080C14]/60 px-4 py-2.5">
            <span className="font-mono text-xs text-neon-cyan">$</span>
            <input
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              onKeyDown={onCommandKeyDown}
              placeholder="escribe un comando (help, whoami, socials, send, clear)..."
              className="flex-1 bg-transparent font-mono text-xs text-foreground outline-none placeholder:text-muted-foreground/50"
              aria-label="Entrada de comando de terminal"
            />
          </div>

          {/* Form + socials */}
          <div className="grid gap-8 p-6 lg:grid-cols-[1fr_auto]">
            <AnimatePresence>
              {(formOpen || form.name || form.email || form.message) && (
                <motion.form
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  onSubmit={submit}
                  className="space-y-4 overflow-hidden"
                >
                  <TerminalField
                    label="~/nombre"
                    value={form.name}
                    error={errors.name}
                    onChange={(v) => setForm((f) => ({ ...f, name: v }))}
                    placeholder="Tu Nombre"
                  />
                  <TerminalField
                    label="~/correo"
                    type="email"
                    value={form.email}
                    error={errors.email}
                    onChange={(v) => setForm((f) => ({ ...f, email: v }))}
                    placeholder="Correo Electrónico"
                  />
                  <div>
                    <label className="font-mono text-xs text-neon-cyan">~/mensaje</label>
                    <textarea
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                      placeholder="Cuéntame sobre tu proyecto..."
                      className={`mt-1.5 w-full resize-none rounded-lg border bg-[#080C14] px-3 py-2 font-mono text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-neon-cyan ${
                        errors.message ? "border-red-400/70" : "border-border"
                      }`}
                    />
                    {errors.message && (
                      <p className="mt-1 font-mono text-[11px] text-red-400">// {errors.message}</p>
                    )}
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
                    <div className="flex-1">
                      <HoloButton state={state === "error" ? "idle" : state} onClick={submit} />
                    </div>
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      disabled={state === "sending"}
                      className="flex items-center justify-center gap-2 rounded-lg border border-neon-cyan/40 bg-neon-cyan/10 px-5 py-2.5 font-mono text-xs text-neon-cyan transition-colors hover:bg-neon-cyan/20 disabled:opacity-50 lg:hidden"
                    >
                      <Send className="h-4 w-4" />
                      {state === "sent" ? "ENVIADO" : state === "sending" ? "ENVIANDO..." : "ENVIAR"}
                    </motion.button>
                  </div>
                  <p className="font-mono text-xs text-muted-foreground">
                    {state === "sent"
                      ? "// mensaje transmitido con éxito"
                      : "// haz clic en ENVIAR o en el botón 3D para transmitir"}
                  </p>
                </motion.form>
              )}
            </AnimatePresence>

            {!formOpen && !form.name && !form.email && !form.message && (
              <motion.button
                type="button"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setFormOpen(true)
                  appendLog("$ send")
                  appendLog("[ok] formulario de contacto desbloqueado — completa los campos")
                }}
                className="rounded-lg border border-neon-purple/40 bg-neon-purple/10 px-4 py-3 font-mono text-xs text-neon-purple transition-colors hover:bg-neon-purple/20"
              >
                {"// escribe 'send' o haz clic para abrir el formulario"}
              </motion.button>
            )}

            {/* Social badges */}
            <div className="flex flex-col gap-3">
              <p className="font-mono text-xs text-muted-foreground">{"// redes sociales"}</p>
              <div className="flex flex-wrap gap-2 lg:flex-col">
                {SOCIAL_LINKS.map(({ label, href, icon: Icon, accent }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target={href.startsWith("mailto:") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    className={`flex items-center gap-2 rounded-full border border-border bg-[#0f172a]/50 px-4 py-2 font-mono text-xs text-muted-foreground backdrop-blur transition-colors ${accent}`}
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function TerminalField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  error,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder: string
  type?: string
  error?: string
}) {
  return (
    <div>
      <label className="font-mono text-xs text-neon-cyan">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`mt-1.5 w-full rounded-lg border bg-[#080C14] px-3 py-2 font-mono text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-neon-cyan ${
          error ? "border-red-400/70" : "border-border"
        }`}
      />
      {error && <p className="mt-1 font-mono text-[11px] text-red-400">// {error}</p>}
    </div>
  )
}
