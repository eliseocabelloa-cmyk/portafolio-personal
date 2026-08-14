export const PERSONAL_INFO = {
  name: "Eliseo Omar Cabello Auccapuma",
  shortName: "Eliseo Cabello",
  title: "Full Stack Developer & Systems Engineering Student",
  university: "Universidad Nacional de Ingeniería (UNI)",
  faculty: "Facultad de Ingeniería Industrial y de Sistemas (FIIS)",
  degree: "Ingeniería de Sistemas",
  location: "Lima, Perú",
  status: "Disponible para trabajar | Proyectos Freelance",
  headline:
    "Construyendo soluciones de software e IA que potencian el aprendizaje y la tecnología académica.",
  bio: "Estudiante de Ingeniería de Sistemas en la UNI (FIIS) apasionado por el desarrollo web moderno, arquitectura cloud e Inteligencia Artificial (RAG). Lidero e integro proyectos tecnológicos con impacto en la comunidad universitaria.",
  contact: {
    emailUniversity: "eliseo.cabello.a@uni.pe",
    emailPersonal: "cabelloauccapumaeliseo@gmail.com",
    github: "https://github.com/eliseocabelloa-cmyk",
    linkedin: "https://www.linkedin.com/in/eliseo-cabello",
    instagram: "https://www.instagram.com/e_omar__/",
    resumeUrl: "#",
  },
}

export type SkillCategory = {
  category: string
  skills: { name: string; level: string }[]
}

export const SKILLS: SkillCategory[] = [
  {
    category: "Frontend",
    skills: [
      { name: "Next.js 16 (App Router)", level: "Avanzado" },
      { name: "React / TypeScript", level: "Avanzado" },
      { name: "Tailwind CSS v4 / Shadcn UI", level: "Avanzado" },
      { name: "Framer Motion", level: "Intermedio" },
    ],
  },
  {
    category: "Backend & IA",
    skills: [
      { name: "FastAPI (Python 3.11+)", level: "Avanzado" },
      { name: "RAG Pipeline / pgvector", level: "Intermedio" },
      { name: "Motor de ejecución (Judge0)", level: "Intermedio" },
      { name: "OAuth 2.0 & REST APIs", level: "Avanzado" },
    ],
  },
  {
    category: "Base de Datos & DevOps",
    skills: [
      { name: "PostgreSQL (Supabase)", level: "Avanzado" },
      { name: "Docker & Docker Compose", level: "Intermedio" },
      { name: "Git & GitHub API", level: "Avanzado" },
    ],
  },
]

/** Flat skill nodes for the 3D orbit — derived from SKILLS categories. */
export type OrbitSkill = {
  id: string
  label: string
  orbit: [number, number, number]
  color: "cyan" | "purple"
}

const ORBIT_CONFIG: { name: string; orbit: [number, number, number]; color: "cyan" | "purple" }[] = [
  { name: "Next.js 16", orbit: [2.4, 0, 0.4], color: "cyan" },
  { name: "React", orbit: [2.4, 60, -0.5], color: "cyan" },
  { name: "TypeScript", orbit: [2.4, 120, 0.6], color: "purple" },
  { name: "FastAPI", orbit: [2.4, 180, -0.3], color: "cyan" },
  { name: "PostgreSQL", orbit: [2.4, 240, 0.5], color: "purple" },
  { name: "Docker", orbit: [2.4, 300, -0.6], color: "purple" },
]

export const ORBIT_SKILLS: OrbitSkill[] = ORBIT_CONFIG.map((s) => ({
  id: s.name,
  label: s.name,
  orbit: s.orbit,
  color: s.color,
}))

export type Project = {
  id: string
  title: string
  shortDescription: string
  fullDescription: string
  techStack: string[]
  github: string
  featured: boolean
  category: string
  /** @deprecated compat — use shortDescription */
  tagline: string
  /** @deprecated compat — use fullDescription */
  description: string
  /** @deprecated compat — use techStack */
  tech: string[]
  image: string
  demo: string
}

const RAW_PROJECTS = [
  {
    id: "univia",
    title: "UniVia - Plataforma de Orientación Académica e IA",
    shortDescription:
      "Solución integral de orientación para estudiantes con análisis inteligente mediante RAG, scraping de sílabos y evaluación de código en vivo.",
    fullDescription:
      "Proyecto grupal desarrollado en la organización LEAD. Cuenta con un frontend moderno en Next.js 16 y un backend robusto en FastAPI con pipeline RAG (pgvector) e infraestructura Judge0 para evaluar código técnico en tiempo real.",
    techStack: [
      "Next.js 16",
      "TypeScript",
      "FastAPI",
      "Python",
      "Supabase",
      "Docker",
      "pgvector",
      "Judge0",
    ],
    github: "https://github.com/leaduni/univia-project",
    featured: true,
    category: "Full Stack & AI",
  },
  {
    id: "skillsync-navigator",
    title: "SkillSync Navigator - UNI",
    shortDescription:
      "Plataforma de sincronización automatizada entre ejercicios de programación y GitHub mediante OAuth 2.0.",
    fullDescription:
      "Automatiza la gestión de evidencia académica para estudiantes de la UNI. Incluye autenticación exclusiva con Google OAuth (@uni.edu.pe), editor de código interactivo en tiempo real e integración directa con la API de GitHub para commits automáticos.",
    techStack: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Supabase Edge Functions",
      "Google OAuth 2.0",
      "GitHub REST API",
    ],
    github: "https://github.com/eliseocabelloa-cmyk/skillsync-navigator",
    featured: true,
    category: "Full Stack & Cloud",
  },
] as const

export const PROJECTS: Project[] = RAW_PROJECTS.map((p) => ({
  ...p,
  techStack: [...p.techStack],
  tagline: p.category,
  description: p.fullDescription,
  tech: [...p.techStack],
  image: "/placeholder.svg",
  demo: p.github,
}))

export const EXPERIENCE = [
  {
    role: "2° Lugar - Categoría I",
    organization: "Feria de Proyectos FIIS - UNI",
    period: "2025-1",
    description:
      "Reconocimiento académico en la Facultad de Ingeniería Industrial y de Sistemas por el desarrollo de una aplicación para Astilleros, destacando en innovación tecnológica y trabajo en equipo.",
  },
  {
    role: "Colaborador de Organización",
    organization: "Feria de Proyectos UNI",
    period: "2026-1",
    description:
      "Coordinación y soporte logístico en la gestión de eventos de innovación tecnológica universitaria.",
  },
  {
    role: "Miembro del Pilar de Excelencia Académica",
    organization: "LEAD UNI",
    period: "Presente",
    description:
      "Desarrollo de proyectos de software con impacto tecnológico directo en la comunidad universitaria.",
  },
  {
    role: "Miembro del Área de Proyectos",
    organization: "Centro Cultural Núcleo UNI",
    period: "Presente",
    description:
      "Gestión y desarrollo de iniciativas de difusión cultural e ingeniería de sistemas.",
  },
]

export const CERTIFICATIONS = [
  { title: "Certificado de Deep Learning", issuer: "CTIC UNI" },
  { title: "Certificado en Gestión de Proyectos", issuer: "Sistemas UNI" },
  { title: "Certificado de Introducción a SQL (Oracle)", issuer: "Sistemas UNI" },
  { title: "Certificado de Fundamentos de Python con IA", issuer: "Sistemas UNI" },
]
