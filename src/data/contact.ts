export const WHATSAPP_NUMBER = '573105365457'

type WhatsAppIntent = 'general' | 'asesoria' | 'cv'

const messages: Record<'es' | 'en', Record<WhatsAppIntent, string>> = {
  es: {
    general:
      'Hola Juan Pablo, vi tu portfolio y me gustaría ponerme en contacto contigo.',
    asesoria:
      'Hola Juan Pablo, me interesa la asesoría de trabajo remoto. Me gustaría saber más detalles.',
    cv: 'Hola Juan Pablo, me interesa el servicio de optimización de hoja de vida. Te cuento sobre mí.'
  },
  en: {
    general:
      'Hi Juan Pablo, I saw your portfolio and would like to get in touch.',
    asesoria:
      'Hi Juan Pablo, I am interested in the remote work advisory service. I would like to know more.',
    cv: 'Hi Juan Pablo, I am interested in the CV optimization service. Let me tell you about myself.'
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
