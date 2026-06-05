export interface Project {
  slug: string
  name: string
  summary: { es: string; en: string }
  description: { es: string; en: string }
  highlights: { es: string; en: string }[]
  stack: string[]
  github: string
  demo?: string
  screenshots?: string[]
  featured: boolean
  year: string
}

export const projects: Project[] = [
  {
    slug: 'paytrack',
    name: 'PayTrack',
    summary: {
      es: 'App fintech para registrar, simular y controlar el pago de tus tarjetas de crédito, con IA integrada.',
      en: 'Fintech app to track, simulate and control credit card payments, with integrated AI.'
    },
    description: {
      es: 'PayTrack es una aplicación personal de finanzas que conecta con Gmail para importar movimientos bancarios automáticamente, permite simular estrategias de pago anticipado de cuotas y cuenta con un asistente de IA (Gemini) para responder preguntas sobre tus gastos en tiempo real.',
      en: 'PayTrack is a personal finance app that connects with Gmail to automatically import bank transactions, allows you to simulate early payment strategies for installments, and features an AI assistant (Gemini) to answer questions about your expenses in real time.'
    },
    highlights: [
      {
        es: 'Sincronización automática con Gmail: detecta cobros de Nequi, Bancolombia, Davivienda y más sin ingresar datos a mano.',
        en: 'Auto Gmail sync: detects charges from Nequi, Bancolombia, Davivienda and more without manual entry.'
      },
      {
        es: 'Simulador de pago acelerado con 3 estrategias distintas y exportación del plan en PDF.',
        en: 'Accelerated payment simulator with 3 strategies and PDF plan export.'
      },
      {
        es: 'Presupuesto mensual con grupos de compromisos, seguimiento de pagos y resumen de porcentaje cubierto vs pendiente.',
        en: 'Monthly budget with commitment groups, payment tracking and summary of covered vs. pending percentage.'
      },
      {
        es: 'Dashboard financiero en tiempo real: ingresos, egresos, disponible y desglose por método de pago.',
        en: 'Real-time financial dashboard: income, expenses, available balance and breakdown by payment method.'
      }
    ],
    stack: [
      'Next.js 15',
      'TypeScript',
      'Tailwind CSS v4',
      'Prisma',
      'PostgreSQL',
      'Clerk',
      'Gemini AI',
      'Zustand',
      'shadcn/ui'
    ],
    github: 'https://github.com/Sircodr/paytrack',
    screenshots: [
      '/screenshots/paytrack-dashboard.webp',
      '/screenshots/paytrack-transactions.webp',
      '/screenshots/paytrack-budget.webp',
      '/screenshots/paytrack-card.webp'
    ],
    featured: true,
    year: '2025'
  }
]
