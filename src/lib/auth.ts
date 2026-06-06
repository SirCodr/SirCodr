import type { AstroLocals } from '@clerk/astro/server'

type AuthLocals = App.Locals & AstroLocals

/**
 * Obtiene el usuario actual desde Astro.locals (inyectado por Clerk middleware).
 * Retorna null si no hay sesión.
 */
export function getCurrentUser(locals: AuthLocals) {
  const auth = locals.auth()
  return auth
}

/**
 * Verifica si el usuario tiene rol admin.
 * El rol se guarda en publicMetadata.role = 'admin'.
 */
export function isAdmin(locals: AuthLocals): boolean {
  try {
    const { sessionClaims } = locals.auth()
    const meta = sessionClaims?.publicMetadata as
      | Record<string, unknown>
      | undefined
    return meta?.role === 'admin'
  } catch {
    return false
  }
}

/**
 * Guard de admin: si el usuario no tiene rol admin retorna Response 404.
 * Usar en endpoints y páginas server-only del panel admin.
 */
export function requireAdmin(locals: AuthLocals): Response | null {
  const { userId } = locals.auth()
  if (!userId) return new Response(null, { status: 404 })
  if (!isAdmin(locals)) return new Response(null, { status: 404 })
  return null
}

/**
 * Devuelve los módulos desbloqueados del usuario actual.
 */
export function getUnlockedModulesFromLocals(locals: AuthLocals): string[] {
  try {
    const { sessionClaims } = locals.auth()
    const meta = sessionClaims?.publicMetadata as
      | Record<string, unknown>
      | undefined
    const modules = meta?.unlockedModules
    if (Array.isArray(modules)) return modules as string[]
    return []
  } catch {
    return []
  }
}
