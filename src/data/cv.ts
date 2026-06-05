export interface LocalizedString {
  es: string
  en: string
}

export interface Experience {
  role: LocalizedString
  company: string
  period: string
  achievements: LocalizedString[]
  skills: string[]
}

export interface SkillCategory {
  label: LocalizedString
  skills: string[]
}

export interface Education {
  degree: LocalizedString
  institution: string
  period: string
}

export interface Certification {
  name: string
  platform: string
  date: string
}

export const experiences: Experience[] = [
  {
    role: {
      es: 'Software Engineer FrontEnd Sr',
      en: 'Software Engineer FrontEnd Sr'
    },
    company: 'Softtek',
    period: 'Agosto 2025',
    achievements: [
      {
        es: 'Implementé un bot de code review con GitHub Copilot que redujo errores humanos en 50% y duplicó los scores de calidad de código.',
        en: 'Implemented a GitHub Copilot-powered code-review bot that cut human errors by 50% and doubled code-quality scores.'
      },
      {
        es: 'Reconocimiento formal del cliente por Colaboración, destacando alineación cross-team y eficiencia.',
        en: 'Earned formal client recognition for Collaboration, highlighting cross-team alignment and efficiency.'
      },
      {
        es: 'Traduje tickets ambiguos de Jira en implementaciones robustas y documentadas.',
        en: 'Translated ambiguous Jira tickets into robust and documented implementations.'
      }
    ],
    skills: [
      'Next.js',
      'TypeScript',
      'Jest',
      'Prompt Engineering',
      'Unit Testing'
    ]
  },
  {
    role: {
      es: 'Junior Experience Technology Engineer',
      en: 'Junior Experience Technology Engineer'
    },
    company: 'PGD',
    period: 'Enero 2024 – Junio 2025',
    achievements: [
      {
        es: 'Automaticé el QA de templates de email RTE, reduciendo el tiempo de pruebas de 30 min a <1 min (≈97% de ahorro).',
        en: 'Automated QA for RTE email templates, slashing test time from 30 min to <1 min (≈97% time saving).'
      },
      {
        es: 'Diseñé y desarrollé DSPs dinámicos para un cliente del sector salud.',
        en: 'Designed and developed dynamic DSPs (Dynamic Sales Presentations) for a healthcare client.'
      },
      {
        es: 'Construí y desplegué flujos completos de entrega en Veeva Vault y Salesforce.',
        en: 'Built and deployed full delivery flows through Veeva Vault and Salesforce.'
      }
    ],
    skills: ['React', 'JavaScript', 'NestJS', 'Veeva Vault', 'Salesforce']
  },
  {
    role: { es: 'Frontend Developer', en: 'Frontend Developer' },
    company: 'iFactum',
    period: 'Febrero 2023 – Diciembre 2023',
    achievements: [
      {
        es: 'Implementé chat en tiempo real entre compradores, vendedores y soporte.',
        en: 'Implemented real-time chat features enabling interaction between buyers, sellers, and support staff.'
      },
      {
        es: 'Desarrollé plataforma de auditoría virtual con live streaming para lanzamientos de productos.',
        en: 'Developed a live-streaming virtual auditorium platform for product showcases and live events.'
      },
      {
        es: 'Construí una experiencia e-commerce completa con carrito, lógica de pago e inventario.',
        en: 'Built and maintained a fully functional e-commerce experience with shopping cart, payment logic, and inventory system.'
      }
    ],
    skills: ['React', 'JavaScript', 'Sass', 'Live Streaming', 'Live Chat']
  },
  {
    role: { es: 'Fullstack Developer', en: 'Fullstack Developer' },
    company: 'Sioma',
    period: 'Junio 2021 – Noviembre 2022',
    achievements: [
      {
        es: 'Desarrollé algoritmos de análisis y transformación de datos para datasets a gran escala en entorno big data.',
        en: 'Developed data analysis and transformation algorithms for large-scale datasets in a big data environment.'
      },
      {
        es: 'Automaticé la generación de reportes para más de 500 usuarios, reduciendo la carga operativa manual.',
        en: 'Automated the generation of reports for over 500 users, reducing manual operations workload.'
      },
      {
        es: 'Reduje el tiempo de render de 30s a 5s (83% más rápido) optimizando uso de memoria y usando tareas en background.',
        en: 'Reduced page render time from 30 s to 5 s (83% faster) by optimizing memory usage and using background tasks.'
      },
      {
        es: 'Reducé el tiempo de respuesta de API de 50+ seg a ~7 seg reestructurando queries y refactorizando la lógica backend en Laravel.',
        en: 'Decreased API response time from 50+ seconds to ~7 seconds by restructuring raw database queries and refactoring backend logic in Laravel.'
      }
    ],
    skills: ['Laravel (PHP)', 'JavaScript', 'MySQL', 'Tailwind CSS', 'React.js']
  }
]

export const skillCategories: SkillCategory[] = [
  {
    label: { es: 'Frontend', en: 'Frontend' },
    skills: [
      'React.js',
      'Next.js',
      'TypeScript',
      'JavaScript',
      'HTML5',
      'Tailwind CSS',
      'Responsive Design',
      'PWA'
    ]
  },
  {
    label: { es: 'Backend & Otros', en: 'Backend & Others' },
    skills: ['NestJS', 'Node.js', 'MySQL', 'Supabase']
  },
  {
    label: { es: 'IA & Productividad', en: 'AI & Productivity' },
    skills: [
      'GitHub Copilot',
      'Prompt Engineering',
      'AI-Assisted Development',
      'Custom AI Agents'
    ]
  },
  {
    label: { es: 'Testing & Herramientas', en: 'Testing & Tools' },
    skills: ['Jest', 'Unit Testing', 'Postman', 'API Integration', 'Git']
  }
]

export const educationList: Education[] = [
  {
    degree: {
      es: 'Ingeniería de Sistemas',
      en: "Bachelor's Degree in Systems Engineering"
    },
    institution: 'Universidad Católica Luis Amigó',
    period: '2017 – 2022'
  },
  {
    degree: {
      es: 'Técnico en Sistemas',
      en: 'Technical Degree in Computer Systems'
    },
    institution: 'Instituto Centro de Sistemas de Urabá',
    period: ''
  },
  {
    degree: {
      es: 'Inglés B2 Certificado',
      en: 'English Language Studies (B2 Certified)'
    },
    institution: 'Centro Colombo Americano de Medellín',
    period: ''
  }
]

export const certifications: Certification[] = [
  { name: 'Prompt Engineering', platform: 'Platzi', date: 'Noviembre 2023' },
  { name: 'TypeScript', platform: 'Udemy', date: 'Abril 2024' }
]

export const softSkills: LocalizedString[] = [
  { es: 'Adaptabilidad', en: 'Adaptability' },
  { es: 'Pensamiento analítico', en: 'Analytical thinking' },
  { es: 'Trabajo en equipo', en: 'Teamwork' },
  { es: 'Comunicación efectiva', en: 'Effective communication' }
]
