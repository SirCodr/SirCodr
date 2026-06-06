import { getCollection } from 'astro:content'
import { MODULES } from '@/data/modules'
import type { ModuleId } from '@/data/modules'

/**
 * Todos los posts de la comunidad, ordenados por módulo y order.
 */
export async function getAllPosts() {
  const posts = await getCollection('community')
  return posts.sort((a, b) => {
    if (a.data.module !== b.data.module) {
      const aOrder = MODULES.find((m) => m.id === a.data.module)?.order ?? 99
      const bOrder = MODULES.find((m) => m.id === b.data.module)?.order ?? 99
      return aOrder - bOrder
    }
    return a.data.order - b.data.order
  })
}

/**
 * Posts de un módulo específico, ordenados por `order`.
 */
export async function getPostsByModule(moduleId: ModuleId) {
  const posts = await getCollection(
    'community',
    ({ data }) => data.module === moduleId
  )
  return posts.sort((a, b) => a.data.order - b.data.order)
}

/**
 * Estadísticas por módulo (total posts, featured).
 */
export async function getModuleStats() {
  const posts = await getAllPosts()
  return MODULES.map((mod) => {
    const modulePosts = posts.filter((p) => p.data.module === mod.id)
    return {
      ...mod,
      totalPosts: modulePosts.length,
      featuredPost:
        modulePosts.find((p) => p.data.featured) ?? modulePosts[0] ?? null
    }
  })
}
