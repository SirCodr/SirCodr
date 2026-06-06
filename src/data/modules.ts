export type ModuleId =
  | 'linkedin'
  | 'cv'
  | 'entrevistas'
  | 'networking'
  | 'negociacion-salarial'

export interface CommunityModule {
  id: ModuleId
  title: string
  description: string
  icon: string
  accentColor: string
  order: number
  relatedServices: string[] // slugs de src/data/services.ts (solo informativo)
}

export const MODULES: CommunityModule[] = [
  {
    id: 'linkedin',
    title: 'LinkedIn',
    description:
      'Construye un perfil que atrae reclutadores. Headline, foto, About, experiencia, skills y más.',
    icon: '🔵',
    accentColor: '#0077B5',
    order: 1,
    relatedServices: ['asesoria']
  },
  {
    id: 'cv',
    title: 'Hoja de Vida',
    description:
      'Plantillas y guías para un CV que pasa los ATS y convence a los reclutadores humanos.',
    icon: '📄',
    accentColor: '#7C3AED',
    order: 2,
    relatedServices: ['asesoria', 'optimizacion-cv']
  },
  {
    id: 'entrevistas',
    title: 'Entrevistas',
    description:
      'Prep técnica y no técnica. Desde preguntas comportamentales hasta live coding.',
    icon: '🎤',
    accentColor: '#059669',
    order: 3,
    relatedServices: ['asesoria']
  },
  {
    id: 'networking',
    title: 'Networking',
    description:
      'Cómo conectar con reclutadores, pedir referidos y construir tu red profesional.',
    icon: '🤝',
    accentColor: '#D97706',
    order: 4,
    relatedServices: ['asesoria']
  },
  {
    id: 'negociacion-salarial',
    title: 'Negociación Salarial',
    description:
      'Scripts, rangos de mercado y estrategias para negociar tu oferta sin miedo.',
    icon: '💰',
    accentColor: '#DC2626',
    order: 5,
    relatedServices: ['asesoria']
  }
]

export function getModuleById(id: ModuleId): CommunityModule | undefined {
  return MODULES.find((m) => m.id === id)
}
