export interface ServiceInclude {
  es: string
  en: string
}

export interface ServiceProcess {
  step: number
  title: { es: string; en: string }
  description: { es: string; en: string }
}

export interface ServiceFaq {
  question: { es: string; en: string }
  answer: { es: string; en: string }
}

export interface Service {
  slug: string
  slugEn: string
  icon: string
  title: { es: string; en: string }
  summary: { es: string; en: string }
  description: { es: string; en: string }
  pricingLabel: { es: string; en: string }
  duration?: { es: string; en: string }
  includes: ServiceInclude[]
  process: ServiceProcess[]
  requirements: { es: string; en: string }[]
  faq: ServiceFaq[]
}

export const services: Service[] = [
  {
    slug: 'asesoria',
    slugEn: 'advisory',
    icon: '🎯',
    title: {
      es: 'Asesoría de Trabajo Remoto',
      en: 'Remote Work Advisory'
    },
    summary: {
      es: 'Sesiones personalizadas para guiarte en todo el proceso: LinkedIn, búsqueda de ofertas, aplicación, hoja de vida y entrevistas.',
      en: 'Personalized sessions to guide you through the full process: LinkedIn, job search, application, resume and interviews.'
    },
    description: {
      es: 'La asesoría de trabajo remoto es un acompañamiento sesión a sesión, similar a cómo funciona un proceso de coaching. Yo te doy las bases, las herramientas y la guía — tú haces que las cosas sucedan. Cada sesión tiene una duración de aproximadamente 1h30 y cuesta $50.000 COP.',
      en: 'The remote work advisory is a session-by-session coaching process. I give you the foundations, tools, and guidance — you make things happen. Each session lasts approximately 1h30 and costs $50,000 COP.'
    },
    pricingLabel: {
      es: '$50.000 COP / sesión',
      en: '$50,000 COP / session'
    },
    duration: {
      es: '~1h 30min por sesión',
      en: '~1h 30min per session'
    },
    includes: [
      {
        es: '¿Qué es LinkedIn y cómo funciona?',
        en: 'What is LinkedIn and how it works'
      },
      {
        es: 'Cómo construir y optimizar tu perfil de LinkedIn',
        en: 'How to build and optimize your LinkedIn profile'
      },
      {
        es: 'Cómo buscar ofertas de trabajo que se adapten a tu perfil',
        en: 'How to find job offers that match your profile'
      },
      {
        es: 'Cómo aplicar a las ofertas de forma efectiva',
        en: 'How to apply to job offers effectively'
      },
      {
        es: 'Construcción y optimización de hoja de vida',
        en: 'Resume construction and optimization'
      },
      {
        es: 'Preparación para entrevistas técnicas y no técnicas',
        en: 'Preparation for technical and non-technical interviews'
      },
      {
        es: 'Plantillas para perfil de LinkedIn y hoja de vida',
        en: 'LinkedIn profile and resume templates'
      },
      {
        es: 'Archivos guía para repasar los temas tratados',
        en: 'Guide files to review covered topics'
      },
      {
        es: 'Recursos de aprendizaje y práctica',
        en: 'Learning and practice resources'
      },
      {
        es: 'Seguimiento de progreso por WhatsApp',
        en: 'Progress tracking via WhatsApp'
      }
    ],
    process: [
      {
        step: 1,
        title: { es: 'Cuéntame sobre ti', en: 'Tell me about yourself' },
        description: {
          es: 'Escríbeme por WhatsApp contando qué haces, qué has hecho, dónde estudiaste, qué rol buscas, salario esperado, modalidad, nivel de inglés y certificaciones. Mientras más contexto des, mejor puedo personalizar las sesiones.',
          en: 'Write to me on WhatsApp telling me what you do, what you have done, where you studied, what role you are looking for, expected salary, work mode, English level and certifications. The more context you give, the better I can personalize the sessions.'
        }
      },
      {
        step: 2,
        title: { es: 'Primera sesión', en: 'First session' },
        description: {
          es: 'Coordinamos día y hora. La primera sesión es un diagnóstico para entender en qué punto estás y diseñar el camino juntos.',
          en: 'We coordinate day and time. The first session is a diagnosis to understand where you are and design the path together.'
        }
      },
      {
        step: 3,
        title: {
          es: 'Proceso sesión a sesión',
          en: 'Session-by-session process'
        },
        description: {
          es: 'Cada sesión avanzamos en un tema. Tú te encargas de aplicar lo aprendido entre sesiones y yo te hago seguimiento por WhatsApp.',
          en: 'Each session we advance on a topic. You apply what you learned between sessions and I follow up with you on WhatsApp.'
        }
      },
      {
        step: 4,
        title: { es: 'Resultados', en: 'Results' },
        description: {
          es: 'Al finalizar el proceso tendrás un perfil de LinkedIn optimizado, una hoja de vida profesional y las herramientas para aplicar con confianza a trabajos remotos.',
          en: 'At the end of the process you will have an optimized LinkedIn profile, a professional resume and the tools to confidently apply for remote jobs.'
        }
      }
    ],
    requirements: [
      { es: 'Tu nombre y apellido', en: 'Your full name' },
      {
        es: 'Formación académica (qué estudiaste y dónde)',
        en: 'Academic background (what and where you studied)'
      },
      {
        es: 'Experiencia laboral (cargos, empresas, duración)',
        en: 'Work experience (positions, companies, duration)'
      },
      { es: 'Rol de trabajo que buscas', en: 'Job role you are looking for' },
      {
        es: 'Expectativa salarial y modalidad (remoto, híbrido)',
        en: 'Salary expectation and modality (remote, hybrid)'
      },
      {
        es: 'Nivel de inglés y certificados que tienes',
        en: 'English level and certificates you have'
      },
      {
        es: 'Otros certificados relevantes',
        en: 'Other relevant certifications'
      },
      {
        es: 'Objetivos: qué quieres lograr con la asesoría',
        en: 'Goals: what you want to achieve with the advisory'
      }
    ],
    faq: [
      {
        question: {
          es: '¿Cuántas sesiones necesito?',
          en: 'How many sessions do I need?'
        },
        answer: {
          es: 'Depende de tu punto de partida y tus objetivos. Puede ser desde 3 hasta 8+ sesiones. En la primera sesión hacemos un diagnóstico y estimamos el recorrido.',
          en: 'It depends on your starting point and goals. It can range from 3 to 8+ sessions. In the first session we do a diagnosis and estimate the journey.'
        }
      },
      {
        question: {
          es: '¿Las sesiones son presenciales o virtuales?',
          en: 'Are the sessions in-person or virtual?'
        },
        answer: {
          es: 'Son 100% virtuales. Nos conectamos por videollamada desde donde estés.',
          en: '100% virtual. We connect by video call from wherever you are.'
        }
      },
      {
        question: {
          es: '¿Qué pasa si no tengo experiencia laboral?',
          en: 'What if I have no work experience?'
        },
        answer: {
          es: 'Está bien, la asesoría también está diseñada para personas que empiezan. Trabajamos con lo que tienes y construimos desde ahí.',
          en: 'That is fine, the advisory is also designed for people who are starting out. We work with what you have and build from there.'
        }
      },
      {
        question: {
          es: '¿En qué idioma se hacen las sesiones?',
          en: 'What language are the sessions in?'
        },
        answer: {
          es: 'En español. Si quieres practicar entrevistas en inglés, podemos incluirlo como parte del proceso.',
          en: 'In Spanish. If you want to practice interviews in English, we can include it as part of the process.'
        }
      }
    ]
  },
  {
    slug: 'optimizacion-cv',
    slugEn: 'cv-review',
    icon: '📄',
    title: {
      es: 'Optimización de Hoja de Vida',
      en: 'CV / Resume Optimization'
    },
    summary: {
      es: 'Corrijo y optimizo tu hoja de vida para que destaque ante reclutadores y sistemas ATS en mercados de trabajo remoto.',
      en: 'I correct and optimize your resume so it stands out to recruiters and ATS systems in remote job markets.'
    },
    description: {
      es: 'Me envías tu hoja de vida (o me cuentas sobre ti si no tienes una) y yo la corrijo, reformulo y optimizo con estructura profesional, lenguaje orientado a impacto, palabras clave para ATS y diseño limpio.',
      en: 'You send me your resume (or tell me about yourself if you do not have one) and I correct, rewrite, and optimize it with professional structure, impact-oriented language, ATS keywords and clean design.'
    },
    pricingLabel: {
      es: 'Consultar por WhatsApp',
      en: 'Ask on WhatsApp'
    },
    includes: [
      {
        es: 'Revisión completa de contenido y estructura',
        en: 'Full content and structure review'
      },
      {
        es: 'Reformulación de bullets con orientación a logros e impacto',
        en: 'Rewrite bullets with achievement and impact orientation'
      },
      {
        es: 'Optimización de palabras clave para ATS',
        en: 'ATS keyword optimization'
      },
      {
        es: 'Diseño limpio y profesional',
        en: 'Clean and professional design'
      },
      {
        es: 'Versión en español y/o inglés',
        en: 'Spanish and/or English version'
      },
      {
        es: 'Una ronda de revisiones incluida',
        en: 'One revision round included'
      }
    ],
    process: [
      {
        step: 1,
        title: { es: 'Cuéntame sobre ti', en: 'Tell me about yourself' },
        description: {
          es: 'Escríbeme por WhatsApp con información sobre tu formación, experiencia, rol que buscas, nivel de inglés y objetivos. Si tienes hoja de vida actual, adjúntala.',
          en: 'Write to me on WhatsApp with your background, experience, role you seek, English level and goals. If you have a current resume, attach it.'
        }
      },
      {
        step: 2,
        title: { es: 'Análisis y cotización', en: 'Analysis and quote' },
        description: {
          es: 'Reviso tu perfil y te presento el costo y tiempo de entrega estimado.',
          en: 'I review your profile and present the cost and estimated delivery time.'
        }
      },
      {
        step: 3,
        title: { es: 'Entrega y revisión', en: 'Delivery and review' },
        description: {
          es: 'Te entrego la hoja de vida optimizada. Tienes una ronda de ajustes incluida.',
          en: 'I deliver your optimized resume. One round of adjustments is included.'
        }
      }
    ],
    requirements: [
      { es: 'Tu nombre completo y ciudad', en: 'Your full name and city' },
      { es: 'Formación académica', en: 'Academic background' },
      { es: 'Experiencia laboral detallada', en: 'Detailed work experience' },
      { es: 'Rol y sector al que apuntas', en: 'Target role and sector' },
      { es: 'Nivel de inglés', en: 'English level' },
      {
        es: 'Hoja de vida actual (si tienes)',
        en: 'Current resume (if you have one)'
      }
    ],
    faq: [
      {
        question: {
          es: '¿Qué formato tiene la entrega?',
          en: 'What format is the delivery?'
        },
        answer: {
          es: 'PDF y versión editable (Google Docs o Word), para que puedas hacer ajustes futuros.',
          en: 'PDF and editable version (Google Docs or Word), so you can make future adjustments.'
        }
      },
      {
        question: {
          es: '¿Y si no tengo hoja de vida?',
          en: 'What if I do not have a resume?'
        },
        answer: {
          es: 'No hay problema. Me cuentas sobre ti por WhatsApp y construimos una desde cero.',
          en: 'No problem. You tell me about yourself on WhatsApp and we build one from scratch.'
        }
      },
      {
        question: {
          es: '¿Cuánto tarda la entrega?',
          en: 'How long does delivery take?'
        },
        answer: {
          es: 'Generalmente entre 2 y 5 días hábiles dependiendo de la carga de trabajo.',
          en: 'Generally 2 to 5 business days depending on workload.'
        }
      }
    ]
  }
]
