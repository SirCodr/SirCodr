export const WHATSAPP_NUMBER = '573105365457'

export type WhatsAppIntent =
  | 'general'
  | 'asesoria'
  | 'cv'
  | 'project'
  | 'website'
  | 'story-board-motion'
  | 'talking-head-edit'

const messages: Record<'es' | 'en', Record<WhatsAppIntent, string>> = {
  es: {
    general:
      'Hola Juan Pablo, vi tu portfolio y me gustaría ponerme en contacto contigo.',
    asesoria:
      'Hola Juan Pablo, me interesa la asesoría de trabajo remoto. Me gustaría saber más detalles.',
    cv: 'Hola Juan Pablo, me interesa el servicio de optimización de hoja de vida. Te cuento sobre mí.',
    project: 'Hola Jota, vi tu portfolio y quiero contarte sobre mi proyecto.',
    website:
      'Hola Jota, vi la demo de Cavaliere y quiero una web para mi negocio.',
    'story-board-motion':
      'Hola Jota, quiero obtener la skill Story Board Motion. ¿Me cuentas los detalles?',
    'talking-head-edit':
      'Hola Jota, quiero obtener la skill Talking Head Edit. ¿Me cuentas los detalles?'
  },
  en: {
    general:
      'Hi Juan Pablo, I saw your portfolio and would like to get in touch.',
    asesoria:
      'Hi Juan Pablo, I am interested in the remote work advisory service. I would like to know more.',
    cv: 'Hi Juan Pablo, I am interested in the CV optimization service. Let me tell you about myself.',
    project:
      'Hi Jota, I saw your portfolio and would like to tell you about my project.',
    website:
      'Hi Jota, I saw the Cavaliere demo and would like a website for my business.',
    'story-board-motion':
      'Hi Jota, I would like to obtain the Story Board Motion skill. Could you share the details?',
    'talking-head-edit':
      'Hi Jota, I would like to obtain the Talking Head Edit skill. Could you share the details?'
  }
}

export function buildWhatsAppLink({
  locale = 'es',
  intent = 'general'
}: {
  locale?: 'es' | 'en'
  intent?: WhatsAppIntent
}): string {
  const text = encodeURIComponent(messages[locale][intent])
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`
}
