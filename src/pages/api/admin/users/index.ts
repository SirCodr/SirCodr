import type { APIRoute } from 'astro'
import { requireAdmin } from '@/lib/auth'
import { createStudentUser, listStudents } from '@/lib/clerk-admin'

export const GET: APIRoute = async ({ locals, url }) => {
  const denied = requireAdmin(locals as any)
  if (denied) return denied

  const query = url.searchParams.get('q') ?? undefined
  const limit = parseInt(url.searchParams.get('limit') ?? '50')
  const offset = parseInt(url.searchParams.get('offset') ?? '0')

  try {
    const result = await listStudents({ limit, offset, query })
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Error desconocido'
    return new Response(JSON.stringify({ error: msg }), { status: 500 })
  }
}

export const POST: APIRoute = async ({ locals, request }) => {
  const denied = requireAdmin(locals as any)
  if (denied) return denied

  let body: {
    email: string
    firstName: string
    lastName?: string
    unlockedModules?: string[]
    notes?: string
  }

  try {
    body = await request.json()
  } catch {
    return new Response(JSON.stringify({ error: 'JSON inválido' }), {
      status: 400
    })
  }

  if (!body.email || !body.firstName) {
    return new Response(
      JSON.stringify({ error: 'email y firstName son requeridos' }),
      { status: 400 }
    )
  }

  // Validar email básico
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(body.email)) {
    return new Response(JSON.stringify({ error: 'Email inválido' }), {
      status: 400
    })
  }

  const { userId: adminId } = (locals as any).auth()

  try {
    const user = await createStudentUser({
      email: body.email,
      firstName: body.firstName,
      lastName: body.lastName ?? '',
      unlockedModules: body.unlockedModules ?? [],
      notes: body.notes ?? '',
      adminUserId: adminId
    })

    return new Response(JSON.stringify({ id: user.id, email: body.email }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Error al crear usuario'
    return new Response(JSON.stringify({ error: msg }), { status: 500 })
  }
}
