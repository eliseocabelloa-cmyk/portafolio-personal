# Eliseo Cabello — Portafolio Profesional 3D

> **Portafolio de ingeniería de software artesanal** · Eliseo Omar Cabello Auccapuma
> Estudiante de Ingeniería de Sistemas · Universidad Nacional de Ingeniería (UNI / FIIS) · Lima, Perú

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![React Three Fiber](https://img.shields.io/badge/React%20Three%20Fiber-9-blue?logo=threedotjs)](https://r3f.docs.pmnd.rs/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v4-38BDF8?logo=tailwindcss)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Desplegado%20en-Vercel-black?logo=vercel)](https://vercel.com/)

---

## 🚀 Descripción

Portafolio profesional interactivo con escena 3D en tiempo real, construido desde cero como ejercicio de ingeniería de software. Cada elemento visual —la estación de trabajo 3D, la terminal interactiva, el visor de proyectos— es un componente funcional diseñado y codificado de manera artesanal.

**Características principales:**

- 🖥️ **Escena 3D interactiva** — workstation renderizada con React Three Fiber / Three.js, con cámara orbital y objetos clicables
- ⌨️ **Terminal de contacto** — consola funcional con comandos (`help`, `whoami`, `socials`, `send`, `clear`) y formulario de contacto integrado
- 🌐 **Visor de proyectos** — presentación en dispositivo 3D con navegación y filtrado por tecnología
- 🪐 **Órbita de habilidades** — skills animadas en órbita 3D alrededor de un núcleo central
- 📡 **Live Terminal** — consola flotante con secuencia de arranque en tiempo real
- 📱 **Totalmente responsivo** — optimizado para móvil, tablet y escritorio
- ⚡ **Turbopack** — compilación ultrarrápida en desarrollo
- 📊 **Vercel Analytics** — métricas de rendimiento en producción

---

## 🛠️ Stack Tecnológico

| Capa | Tecnología |
|------|-----------|
| Framework | Next.js 16 (App Router) con Turbopack |
| Lenguaje | TypeScript 5.7 |
| Motor 3D | React Three Fiber 9 + Three.js + @react-three/drei |
| Estilos | Tailwind CSS v4 |
| Animaciones | Framer Motion 13 |
| Iconos | Lucide React |
| Fuentes | Inter + JetBrains Mono (Google Fonts) |
| Analytics | Vercel Analytics |
| Gestor de paquetes | pnpm |

---

## 📁 Estructura del Proyecto

```
portafolio/
├── app/
│   ├── layout.tsx          # Metadatos SEO, fuentes y layout raíz
│   ├── page.tsx            # Página principal (composición de secciones)
│   └── globals.css         # Variables CSS, tokens de diseño y utilidades
├── components/
│   ├── hero/
│   │   ├── hero-section.tsx    # Sección principal con Canvas 3D
│   │   └── command-center.tsx  # Escena 3D: workstation interactiva
│   ├── skills/
│   │   ├── skills-section.tsx  # Sección de habilidades
│   │   └── skill-orbit.tsx     # Órbita 3D de tecnologías
│   ├── projects/
│   │   ├── projects-section.tsx # Visor de proyectos con filtros
│   │   └── device-viewport.tsx  # Dispositivo 3D para preview
│   ├── contact/
│   │   ├── ContactTerminal.tsx  # Terminal interactiva de contacto
│   │   ├── contact-modal.tsx    # Modal de contacto rápido
│   │   ├── contact-section.tsx  # Sección de contacto
│   │   └── holo-button.tsx      # Botón 3D holográfico
│   ├── nav-bar.tsx          # Barra de navegación fija
│   ├── footer.tsx           # Pie de página
│   ├── live-terminal.tsx    # Terminal flotante de arranque
│   ├── portfolio-context.tsx # Estado global del portafolio
│   └── scene-loader.tsx     # Fallback de carga de escena 3D
├── lib/
│   ├── portfolio-data.ts    # Datos del portafolio (proyectos, skills, info)
│   └── utils.ts             # Utilidades generales
├── hooks/
│   └── use-is-mobile.ts     # Hook de detección de dispositivo
├── public/                  # Assets estáticos
├── next.config.mjs          # Configuración de Next.js
└── tsconfig.json            # Configuración de TypeScript
```

---

## ⚙️ Instalación y Ejecución

### Requisitos previos

- [Node.js](https://nodejs.org/) 20 o superior
- [pnpm](https://pnpm.io/) 9 o superior

```bash
# Instalar pnpm globalmente (si no lo tienes)
npm install -g pnpm
```

### Comandos

```bash
# 1. Clonar el repositorio
git clone https://github.com/eliseocabelloa-cmyk/portafolio.git
cd portafolio

# 2. Instalar dependencias
pnpm install

# 3. Iniciar servidor de desarrollo (con Turbopack)
pnpm dev

# 4. Abrir en el navegador
# http://localhost:3000
```

### Producción

```bash
# Compilar para producción
pnpm build

# Iniciar servidor de producción (local)
pnpm start
```

---

## 🌐 Despliegue en Vercel

Este portafolio está optimizado para desplegarse en [Vercel](https://vercel.com/) sin configuración adicional.

1. Conecta el repositorio en el dashboard de Vercel
2. Vercel detectará automáticamente Next.js y configurará el build
3. El comando de build es `pnpm build` y el directorio de salida es `.next`

---

## 👤 Sobre el Autor

**Eliseo Omar Cabello Auccapuma**
Estudiante de Ingeniería de Sistemas · UNI (FIIS) · Lima, Perú

- 🐙 GitHub: [@eliseocabelloa-cmyk](https://github.com/eliseocabelloa-cmyk)
- 💼 LinkedIn: [eliseo-cabello](https://www.linkedin.com/in/eliseo-cabello)
- 📧 Email UNI: eliseo.cabello.a@uni.pe

---

## 📄 Licencia

Este proyecto es de uso personal y educativo. El código fuente puede servir como referencia, pero el contenido (nombre, proyectos, datos personales) pertenece a Eliseo Cabello.

---

Construido con TypeScript · Lima, Perú · 2025–2026
