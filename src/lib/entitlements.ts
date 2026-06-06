import type { CollectionEntry } from 'astro:content'
import { isAdmin, getUnlockedModulesFromLocals } from '@/lib/auth'

type AuthLocals = App.Locals & import('@clerk/astro/server').AstroLocals
type Post = CollectionEntry<'community'>

/**
 * Retorna módulos desbloqueados para el usuario.
 * Admin siempre tiene acceso a todos los módulos.
 */
export function getUnlockedModules(locals: AuthLocals): string[] {
  if (isAdmin(locals)) {
    // Admin ve todo — retornamos wildcard manejado por canAccessModule
    return ['*']
  }
  return getUnlockedModulesFromLocals(locals)
}

/**
 * ¿El usuario puede acceder a un módulo?
 */
export function canAccessModule(locals: AuthLocals, moduleId: string): boolean {
  if (isAdmin(locals)) return true
  const unlocked = getUnlockedModulesFromLocals(locals)
  return unlocked.includes(moduleId)
}

/**
 * ¿El usuario puede acceder a un post específico?
 */
export function canAccessPost(locals: AuthLocals, post: Post): boolean {
  return canAccessModule(locals, post.data.module)
}

/**
 * Valida que el usuario puede descargar un archivo de un post.
 * Lanza Response con código de error si no puede.
 */
export function assertCanDownload(
  locals: AuthLocals,
  post: Post,
  filename: string
): Response | null {
  const { userId } = (locals as AuthLocals).auth()
  if (!userId) return new Response('No autorizado', { status: 401 })
  if (!canAccessPost(locals, post))
    return new Response('Acceso denegado', { status: 403 })
  if (!post.data.pdfFile && !filename)
    return new Response('Recurso no encontrado', { status: 404 })
  return null
}
