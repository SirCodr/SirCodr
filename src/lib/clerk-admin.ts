import { createClerkClient } from '@clerk/backend'

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

export async function createStudentUser(params: {
  email: string
  firstName: string
  lastName: string
  unlockedModules: string[]
  notes: string
  adminUserId: string
  siteOrigin: string
}) {
  const clerk = getClerkClient()
  const metadata: StudentMetadata = {
    role: 'student',
    unlockedModules: params.unlockedModules,
    notes: params.notes,
    createdBy: params.adminUserId,
    createdAt: new Date().toISOString(),
  }
  return clerk.invitations.createInvitation({
    emailAddress: params.email,
    redirectUrl: `${params.siteOrigin}/sign-up`,
    notify: true,
    ignoreExisting: false,
    publicMetadata: metadata as unknown as UserPublicMetadata,
  })
}

export async function listStudents(params?: {
  limit?: number
  offset?: number
  query?: string
}) {
  const clerk = getClerkClient()
  return clerk.users.getUserList({
    limit: params?.limit ?? 50,
    offset: params?.offset ?? 0,
    query: params?.query,
    orderBy: '-created_at',
  })
}

export async function getStudentById(userId: string) {
  const clerk = getClerkClient()
  return clerk.users.getUser(userId)
}

export async function updateStudentModules(
  userId: string,
  updates: { unlockedModules?: string[]; notes?: string }
) {
  const clerk = getClerkClient()
  const user = await clerk.users.getUser(userId)
  const currentMeta = (user.publicMetadata ?? {}) as Record<string, unknown>
  const newMeta: Record<string, unknown> = { ...currentMeta }
  if (updates.unlockedModules !== undefined) newMeta.unlockedModules = updates.unlockedModules
  if (updates.notes !== undefined) newMeta.notes = updates.notes
  return clerk.users.updateUserMetadata(userId, { publicMetadata: newMeta })
}

export async function disableStudent(userId: string) {
  const clerk = getClerkClient()
  return clerk.users.lockUser(userId)
}

export async function enableStudent(userId: string) {
  const clerk = getClerkClient()
  return clerk.users.unlockUser(userId)
}

export async function deleteStudent(userId: string) {
  const clerk = getClerkClient()
  return clerk.users.deleteUser(userId)
}
