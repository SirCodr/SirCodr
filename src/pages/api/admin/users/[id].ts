import type { APIRoute } from 'astro'
import { requireAdmin } from '@/lib/auth'
import { updateStudentModules } from '@/lib/clerk-admin'

export const PATCH: APIRoute = async ({ locals, request, params }) => {
  const denied = requireAdmin(locals as any)
  if (denied) return denied

  const { id } = params
  if (!id)
    return new Response(JSON.stringify({ error: 'ID requerido' }), {
      status: 400
    })

  let body: { unlockedModules?: string[]; notes?: string }

  try {
    body = await request.json()
  } catch {
    return new Response(JSON.stringify({ error: 'JSON inválido' }), {
      status: 400
    })
  }

  try {
    await updateStudentModules(id, {
      unlockedModules: body.unlockedModules,
      notes: body.notes
    })

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Error al actualizar'
    return new Response(JSON.stringify({ error: msg }), { status: 500 })
  }
}
