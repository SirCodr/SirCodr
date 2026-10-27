import type { ImageMetadata } from 'astro'
import type { Locale } from '@/i18n/utils'
import type { WhatsAppIntent } from '@/data/contact'
import cavalierePoster from '@/assets/portfolio/cavaliere-poster.webp'

export type LocalizedText = Record<Locale, string>

export interface PortfolioPreview {
  video: string
  poster: ImageMetadata
}

export const socialLinks = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/jota-restrepo/' },
  { label: 'TikTok', href: 'https://www.tiktok.com/@soyjota.dev' },
  { label: 'GitHub', href: 'https://github.com/SirCodr' }
] as const

export const portfolioCopy = {
  es: {
    title: 'Juan Pablo Restrepo — Desarrollo web y automatización con IA',
    description:
      'Soy Jota, desarrollador de Medellín. Desarrollo webs y aplicaciones, automatizo procesos comparto skills descargables.',
    ids: {
      projects: 'proyectos',
      websites: 'webs',
      skills: 'skills',
      contact: 'contacto'
    },
    navigation: {
      projects: 'Proyectos',
      websites: 'Webs',
      skills: 'Skills',
      contact: 'Hablemos',
      label: 'Navegación principal'
    },
    skip: 'Saltar a los proyectos',
    hero: {
      eyebrow: 'DESARROLLADOR / MEDELLÍN, COLOMBIA',
      lead: 'SOY',
      intro: 'Desarrollo webs, aplicaciones y automatizo procesos.',
      automation: 'Me gusta experimentar y crear cosas con la IA.',
      contact: 'Cuéntame qué necesitas',
      projects: 'Ver proyectos',
      portrait: 'Jota con gafas y un portátil',
      role: 'JUAN PABLO RESTREPO / DESARROLLADOR',
      down: 'Bajar a proyectos'
    },
    projects: {
      title: 'PROYECTOS',
      description:
        'Aplicaciones que he desarrollado para resolver cosas del día a día.',
      visit: 'Abrir'
    },
    websites: {
      title: 'WEBS',
      description: 'Diseño web de negocios locales.',
      category: 'BARBERÍA / DEMO',
      contact: 'Quiero una web para mi negocio',
      demo: 'Ver demo'
    },
    skills: {
      title: 'SKILLS',
      description:
        'Flujos de trabajo para usar con un agente de IA. Escríbeme por WhatsApp para obtenerlos.',
      buy: 'Obtener',
      storyboard: 'STORYBOARD',
      text: 'Texto',
      demo: 'Demo',
      motion: 'Motion',
      camera: 'Una persona en cámara.',
      captions: 'Subtítulos y recursos.'
    },
    contact: {
      eyebrow: '¿NECESITAS UNA WEB O UNA AUTOMATIZACIÓN?',
      title: 'HABLEMOS',
      action: 'Escríbeme por WhatsApp'
    },
    motion: {
      pausePreview: 'Pausar preview de',
      playPreview: 'Reproducir preview de',
      preview: 'Preview animada de',
      open: 'Reproducir video'
    },
    language: {
      label: 'English',
      href: '/en/',
      accessible: 'View portfolio in English'
    }
  },
  en: {
    title: 'Juan Pablo Restrepo — Web development and AI automation',
    description:
      'I’m Jota, a developer based in Medellín. I build websites and apps, automate workflows with AI, and share downloadable skills.',
    ids: {
      projects: 'projects',
      websites: 'websites',
      skills: 'skills',
      contact: 'contact'
    },
    navigation: {
      projects: 'Projects',
      websites: 'Websites',
      skills: 'Skills',
      contact: 'Let’s talk',
      label: 'Main navigation'
    },
    skip: 'Skip to projects',
    hero: {
      eyebrow: 'DEVELOPER / MEDELLÍN, COLOMBIA',
      lead: 'I’M',
      intro: 'I build websites, apps and automate workflows.',
      automation: 'I like to experiment and create things with AI.',
      contact: 'Tell me what you need',
      projects: 'View projects',
      portrait: 'Jota wearing glasses and holding a laptop',
      role: 'JUAN PABLO RESTREPO / DEVELOPER',
      down: 'Scroll to projects'
    },
    projects: {
      title: 'PROJECTS',
      description: 'Apps I built to help with everyday tasks.',
      visit: 'Open'
    },
    websites: {
      title: 'WEBSITES',
      description: 'Local business websites.',
      category: 'BARBERSHOP / DEMO',
      contact: 'I need a website for my business',
      demo: 'View demo'
    },
    skills: {
      title: 'SKILLS',
      description:
        'Workflows to use with an AI agent. Message me on WhatsApp to obtain them.',
      buy: 'Get',
      storyboard: 'STORYBOARD',
      text: 'Text',
      demo: 'Demo',
      motion: 'Motion',
      camera: 'A person on camera.',
      captions: 'Captions and visuals.'
    },
    contact: {
      eyebrow: 'NEED A WEBSITE OR AN AUTOMATION?',
      title: 'LET’S TALK',
      action: 'Message me on WhatsApp'
    },
    motion: {
      pausePreview: 'Pause preview for',
      playPreview: 'Play preview for',
      preview: 'Animated preview of',
      open: 'Play video'
    },
    language: {
      label: 'Español',
      href: '/',
      accessible: 'Ver el portfolio en español'
    }
  }
} as const

export const websites = [
  {
    slug: 'cavaliere',
    name: 'Cavaliere',
    demo: 'https://cavaliere.jotarestrepo.com/',
    description: {
      es: 'Barbería, con sus servicios, ubicación y reserva de citas.',
      en: 'Barbershop website with services, location and appointment booking.'
    },
    preview: {
      video: '/media/portfolio/cavaliere.mp4',
      poster: cavalierePoster
    } satisfies PortfolioPreview
  }
]

interface DownloadableSkill {
  slug: 'story-board-motion' | 'talking-head-edit'
  name: string
  title: LocalizedText
  description: LocalizedText
  intent: WhatsAppIntent
}

export const downloadableSkills: DownloadableSkill[] = [
  {
    slug: 'story-board-motion',
    name: 'Story Board Motion',
    intent: 'story-board-motion',
    title: {
      es: 'Videos con motion graphics.',
      en: 'Videos with motion graphics.'
    },
    description: {
      es: 'Para planear y montar videos con textos, formas, recortes y demostraciones de producto.',
      en: 'Plan and build videos with text, shapes, cutouts and product demonstrations.'
    }
  },
  {
    slug: 'talking-head-edit',
    name: 'Talking Head Edit',
    intent: 'talking-head-edit',
    title: {
      es: 'Edición de videos con una persona en cámara.',
      en: 'Editing videos with a person on camera.'
    },
    description: {
      es: 'Para organizar la grabación, los subtítulos y los recursos que acompañan lo que estás contando.',
      en: 'Organize the recording, captions and visuals that support what you’re saying.'
    }
  }
]
