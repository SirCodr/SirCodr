import type { Locale } from '@/i18n/utils'
import cavalierePoster from '@/assets/motion/cavaliere.webp'
import elbotPoster from '@/assets/motion/elbot.webp'
import rastroPoster from '@/assets/motion/rastro.webp'

export const motionSkillPaths: Record<Locale, string> = {
  es: '/skills/story-board-motion/',
  en: '/en/skills/story-board-motion/'
}

export const motionFilms = [
  {
    id: 'cavaliere',
    name: 'Cavaliere',
    number: '01',
    duration: '01:16',
    poster: cavalierePoster,
    video: '/media/skills/story-board-motion/cavaliere.mp4',
    category: {
      es: 'DISEÑO WEB / PROCESO CREATIVO',
      en: 'WEB DESIGN / CREATIVE PROCESS'
    },
    description: {
      es: 'De la identidad de una barbería a su web. Un recorrido narrado con tipografía, recortes y demos reales en móvil y escritorio.',
      en: 'From a barbershop’s identity to its website. A narrated journey with typography, cutouts and real mobile and desktop demos.'
    }
  },
  {
    id: 'rastro',
    name: 'Rastro',
    number: '02',
    duration: '00:43',
    poster: rastroPoster,
    video: '/media/skills/story-board-motion/rastro.mp4',
    category: {
      es: 'PRODUCTO / FINANZAS PERSONALES',
      en: 'PRODUCT / PERSONAL FINANCE'
    },
    description: {
      es: 'Una presentación de producto que parte de un gasto cotidiano. Ilustraciones, texto en movimiento y demostración de la aplicación.',
      en: 'A product introduction that starts with an everyday expense. Illustrations, moving text and a demonstration of the app.'
    }
  },
  {
    id: 'elbot',
    name: 'Elbot',
    number: '03',
    duration: '00:39',
    poster: elbotPoster,
    video: '/media/skills/story-board-motion/elbot.mp4',
    category: { es: 'PRODUCTO / AUTOMATIZACIÓN', en: 'PRODUCT / AUTOMATION' },
    description: {
      es: 'Del mensaje de un cliente a la reserva. Una historia visual para explicar la atención automatizada con interfaces, formas y ritmo.',
      en: 'From a customer’s message to a booking. A visual story explaining automated customer service through interfaces, shapes and rhythm.'
    }
  }
] as const

export const motionSkillCopy = {
  es: {
    title: 'Story Board Motion — De la idea al movimiento | Jota',
    description:
      'Conoce mi skill para crear videos con motion graphics junto a un agente de IA. Mira las piezas de Cavaliere, Rastro y Elbot, y descubre el proceso.',
    back: 'Volver a las skills',
    badge: 'SKILL PARA AGENTES DE IA',
    edition: 'VOL. 01 / MOTION GRAPHICS',
    hero: ['DE LA IDEA.', 'AL MOVI', 'MIENTO.'],
    intro:
      'Historias que se mueven. Una skill que guía a tu agente de IA desde el primer guion hasta el video final.',
    watch: 'Ver los videos',
    get: 'Quiero esta skill',
    heroNote: 'IDEA + AGENTE DE IA + DIRECCIÓN CREATIVA',
    reel: 'HECHO CON LA SKILL',
    realWork: 'REPRODUCIBLES AQUÍ',
    aboutTitle: ['TU IDEA,', 'CON UN PLAN.'],
    about:
      'Story Board Motion es un flujo de trabajo para crear videos con un agente de IA. Le das una idea, referencias y materiales; la skill ayuda a convertirlos en una historia visual y un montaje editable en HyperFrames.',
    aboutEnd:
      'Tú marcas la intención y revisas las decisiones. La skill ordena el proceso creativo.',
    usesLabel: '¿QUÉ PUEDES CONTAR?',
    uses: [
      'Presentar un producto o una aplicación.',
      'Mostrar cómo hiciste algo, paso a paso.',
      'Explicar un servicio o una idea con recursos visuales.'
    ],
    workTitle: ['HISTORIAS REALES.', 'DALE PLAY.'],
    workIntro:
      'Piezas creadas con este flujo. Distintas historias, marcas y maneras de poner las ideas en movimiento.',
    sound: 'Videos completos con sonido.',
    play: 'Reproducir',
    fallback: 'Abrir video',
    processTitle: ['DEL “TENGO UNA IDEA”', 'AL ÚLTIMO FOTOGRAMA.'],
    processIntro:
      'Primero la historia. Después, cada movimiento tiene una razón.',
    steps: [
      {
        name: 'Encontrar la historia',
        detail:
          'Definir a quién le hablas, qué quieres contar y qué debería pasar después de ver el video.',
        output: 'Objetivo + guion'
      },
      {
        name: 'Ver antes de animar',
        detail:
          'Recorrer un storyboard web con escenas, textos, recursos y dirección visual para revisar la propuesta.',
        output: 'Storyboard interactivo'
      },
      {
        name: 'Ponerlo en movimiento',
        detail:
          'Componer textos, formas, recortes y demos en HyperFrames. Darles ritmo con voz, música y efectos según la pieza.',
        output: 'Montaje editable'
      },
      {
        name: 'Revisar y entregar',
        detail:
          'Comprobar la historia y los criterios acordados, ajustar lo necesario y exportar el video y su portada.',
        output: 'Video + portada'
      }
    ],
    includesLabel: 'PARA TRABAJAR CON ELLA',
    includes: [
      'Un agente de IA que pueda usar skills y trabajar con archivos.',
      'HyperFrames para el montaje y la exportación.',
      'Tu idea, tus materiales y tu criterio para revisar.'
    ],
    ctaLabel: 'TU SIGUIENTE HISTORIA',
    ctaTitle: ['¿Y SI PONEMOS', 'TU IDEA A MOVER?'],
    ctaText:
      'Escríbeme para obtener Story Board Motion y conocer cómo usarla con tu agente de IA.',
    ctaAction: 'Hablemos de la skill',
    ctaNote: 'CREADA POR JOTA / HECHA PARA CREAR',
    skip: 'Saltar al contenido de la skill'
  },
  en: {
    title: 'Story Board Motion — From idea to motion | Jota',
    description:
      'Explore my skill for creating motion graphics videos with an AI agent. Watch Cavaliere, Rastro and Elbot, and discover the creative process.',
    back: 'Back to skills',
    badge: 'SKILL FOR AI AGENTS',
    edition: 'VOL. 01 / MOTION GRAPHICS',
    hero: ['FROM IDEA.', 'INTO', 'MOTION.'],
    intro:
      'Stories that move. A skill that guides your AI agent from the first script to the final video.',
    watch: 'Watch the videos',
    get: 'Get this skill',
    heroNote: 'IDEA + AI AGENT + CREATIVE DIRECTION',
    reel: 'MADE WITH THE SKILL',
    realWork: 'WATCH THEM HERE',
    aboutTitle: ['YOUR IDEA,', 'WITH A PLAN.'],
    about:
      'Story Board Motion is a workflow for creating videos with an AI agent. Bring an idea, references and materials; the skill helps turn them into a visual story and an editable composition in HyperFrames.',
    aboutEnd:
      'You set the intention and review the decisions. The skill gives the creative process structure.',
    usesLabel: 'WHAT CAN YOU TELL?',
    uses: [
      'Introduce a product or an app.',
      'Show how you made something, step by step.',
      'Explain a service or an idea with visuals.'
    ],
    workTitle: ['IDEAS IN MOTION.', 'PRESS PLAY.'],
    workIntro:
      'Films made with this workflow. Different stories, brands and ways to put ideas in motion.',
    sound: 'Full videos with sound.',
    play: 'Play',
    fallback: 'Open video',
    processTitle: ['FROM “I HAVE AN IDEA”', 'TO THE FINAL FRAME.'],
    processIntro: 'The story comes first. Then every movement has a reason.',
    steps: [
      {
        name: 'Find the story',
        detail:
          'Define who you’re speaking to, what you want to say and what should happen after watching.',
        output: 'Goal + script'
      },
      {
        name: 'See it before animating',
        detail:
          'Explore a web storyboard with scenes, text, assets and visual direction to review the proposal.',
        output: 'Interactive storyboard'
      },
      {
        name: 'Set it in motion',
        detail:
          'Compose text, shapes, cutouts and demos in HyperFrames. Set the rhythm with voice, music and effects as needed.',
        output: 'Editable composition'
      },
      {
        name: 'Review and deliver',
        detail:
          'Check the story and agreed criteria, refine what needs work, then export the video and its cover.',
        output: 'Video + cover'
      }
    ],
    includesLabel: 'TO WORK WITH IT',
    includes: [
      'An AI agent that can use skills and work with files.',
      'HyperFrames for composition and export.',
      'Your idea, your materials and your creative judgment.'
    ],
    ctaLabel: 'YOUR NEXT STORY',
    ctaTitle: ['LET’S PUT YOUR', 'IDEA IN MOTION.'],
    ctaText:
      'Message me to get Story Board Motion and learn how to use it with your AI agent.',
    ctaAction: 'Let’s talk about the skill',
    ctaNote: 'CREATED BY JOTA / MADE TO CREATE',
    skip: 'Skip to skill content'
  }
} as const
