import { createClerkClient } from '@clerk/backend'

// Singleton del cliente de Clerk Backend
function getClerkClient() {
  const secretKey = import.meta.env.CLERK_SECRET_KEY
  if (!secretKey) throw new Error('CLERK_SECRET_KEY no definida')
  return createClerkClient({ secretKey })
}

export type StudentMetadata = {
  role: 'student'
  unlockedModules: string[]
  notes: string
  createdBy: string
  createdAt: string
}

/**
 * Crea un usuario en Clerk y lo agrega al allowlist de Google SSO.
 * El usuario deberá hacer sign-in con Google usando ese mismo email.
 */
export async function createStudentUser(params: {
  email: string
  firstName: string
  lastName: string
  unlockedModules: string[]
  notes: string
  adminUserId: string
}) {
  const clerk = getClerkClient()

  // 1. Agregar email al allowlist (para que pueda pasar el restricted mode)
  await clerk.allowlistIdentifiers.createAllowlistIdentifier({
    identifier: params.email,
    notify: false
  })

  // 2. Crear usuario con publicMetadata
  const metadata: StudentMetadata = {
    role: 'student',
    unlockedModules: params.unlockedModules,
    notes: params.notes,
    createdBy: params.adminUserId,
    createdAt: new Date().toISOString()
  }

  const user = await clerk.users.createUser({
    emailAddress: [params.email],
    firstName: params.firstName,
    lastName: params.lastName,
    publicMetadata: metadata as unknown as Record<string, unknown>,
    skipPasswordRequirement: true
  })

  return user
}

/**
 * Lista usuarios con rol student (excluye admins).
 */
export async function listStudents(params?: {
  limit?: number
  offset?: number
  query?: string
}) {
  const clerk = getClerkClient()
  const users = await clerk.users.getUserList({
    limit: params?.limit ?? 50,
    offset: params?.offset ?? 0,
    query: params?.query,
    orderBy: '-created_at'
  })
  return users
}

/**
 * Obtiene un usuario por ID.
 */
export async function getStudentById(userId: string) {
  const clerk = getClerkClient()
  return clerk.users.getUser(userId)
}

/**
 * Actualiza módulos desbloqueados y/o notas de un usuario.
 */
export async function updateStudentModules(
  userId: string,
  updates: { unlockedModules?: string[]; notes?: string }
) {
  const clerk = getClerkClient()
  const user = await clerk.users.getUser(userId)
  const currentMeta = (user.publicMetadata ?? {}) as Record<string, unknown>

  const newMeta: Record<string, unknown> = { ...currentMeta }
  if (updates.unlockedModules !== undefined) {
    newMeta.unlockedModules = updates.unlockedModules
  }
  if (updates.notes !== undefined) {
    newMeta.notes = updates.notes
  }

  return clerk.users.updateUserMetadata(userId, { publicMetadata: newMeta })
}

/**
 * Desactiva / bloquea un usuario (no puede hacer sign-in).
 */
export async function disableStudent(userId: string) {
  const clerk = getClerkClient()
  return clerk.users.lockUser(userId)
}

/**
 * Reactiva un usuario bloqueado.
 */
export async function enableStudent(userId: string) {
  const clerk = getClerkClient()
  return clerk.users.unlockUser(userId)
}

/**
 * Elimina un usuario de Clerk.
 */
export async function deleteStudent(userId: string) {
  const clerk = getClerkClient()
  return clerk.users.deleteUser(userId)
}
