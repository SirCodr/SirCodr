import type { LocalizedText, PortfolioPreview } from '@/data/portfolio'
import rastropayPoster from '@/assets/portfolio/rastropay-poster.webp'
import chronoPoster from '@/assets/portfolio/chrono-poster.webp'

export interface Project {
  slug: string
  name: string
  summary: LocalizedText
  description: LocalizedText
  highlights: LocalizedText[]
  stack: string[]
  github: string
  demo: string
  screenshots?: string[]
  featured: boolean
  year: string
  tags: LocalizedText[]
  preview: PortfolioPreview
}

export const projects: Project[] = [
  {
    slug: 'rastropay',
    name: 'Rastropay',
    featured: true,
    year: '2026',
    summary: {
      es: 'Gastos, movimientos bancarios automatizados y presupuesto en una sola aplicación.',
      en: 'Expenses, automated bank transactions and budgeting in one app.'
    },
    description: {
      es: 'Una aplicación de finanzas personales para importar movimientos desde Gmail, organizar el presupuesto y consultar gastos y tarjetas.',
      en: 'A personal finance app for importing transactions from Gmail, organizing a budget, and reviewing expenses and cards.'
    },
    highlights: [
      {
        es: 'Importación de movimientos desde Gmail.',
        en: 'Import transactions from Gmail.'
      },
      {
        es: 'Presupuesto, tarjetas y reportes financieros.',
        en: 'Budgeting, cards and financial reports.'
      }
    ],
    stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'Clerk'],
    github: 'https://github.com/SirCodr/PayTrack',
    demo: 'https://rastropay.com/',
    tags: [
      { es: 'Finanzas personales', en: 'Personal finance' },
      { es: 'Automatizado', en: 'Automated' }
    ],
    preview: {
      video: '/media/portfolio/rastropay.mp4',
      poster: rastropayPoster
    }
  },
  {
    slug: 'chrono',
    name: 'Chrono',
    featured: true,
    year: '2026',
    summary: {
      es: 'Una línea de tiempo para registrar actividades y consultar cuándo las hiciste.',
      en: 'A timeline to record activities and see when you last did them.'
    },
    description: {
      es: 'Registros cronológicos con categorías, búsqueda por fechas y conexión opcional a Google Calendar. Los registros se guardan localmente en el navegador.',
      en: 'Chronological records with categories, date filters and an optional Google Calendar connection. Records are stored locally in the browser.'
    },
    highlights: [
      {
        es: 'Registro y consulta de actividades por fecha y categoría.',
        en: 'Record and browse activities by date and category.'
      },
      {
        es: 'Conexión opcional a Google Calendar.',
        en: 'Optional Google Calendar connection.'
      }
    ],
    stack: ['Next.js', 'TypeScript', 'IndexedDB', 'Google Calendar'],
    github: 'https://github.com/SirCodr/chrono',
    demo: 'https://chrono99.vercel.app/',
    tags: [
      { es: 'Registros y actividades', en: 'Activity records' },
      { es: 'Calendario', en: 'Calendar' }
    ],
    preview: { video: '/media/portfolio/chrono.mp4', poster: chronoPoster }
  }
]
