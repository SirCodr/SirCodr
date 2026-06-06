import { defineCollection, z } from 'astro:content'

const community = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    teaser: z.string(), // Resumen público visible sin login
    module: z.enum([
      'linkedin',
      'cv',
      'entrevistas',
      'networking',
      'negociacion-salarial'
    ]),
    type: z.enum(['guide', 'tutorial', 'tip', 'template']),
    niches: z
      .array(z.enum(['software', 'sales', 'trade']))
      .default(['software', 'sales', 'trade']),
    publishedDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    order: z.number().int().nonnegative().default(0),
    pdfFile: z.string().optional(), // e.g. "guia-linkedin.pdf"
    resources: z
      .array(
        z.object({
          label: z.string(),
          url: z.string(),
          type: z.enum(['pdf', 'figma', 'notion', 'url', 'template'])
        })
      )
      .optional(),
    featured: z.boolean().default(false),
    lang: z.enum(['es', 'en']).default('es')
  })
})

export const collections = { community }
