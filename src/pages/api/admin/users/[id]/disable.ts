import type { APIRoute } from 'astro'
import { requireAdmin } from '@/lib/auth'
import { disableStudent, enableStudent } from '@/lib/clerk-admin'

export const POST: APIRoute = async ({ locals, params }) => {
  const denied = requireAdmin(locals as any)
  if (denied) return denied

  const { id } = params
  if (!id)
    return new Response(JSON.stringify({ error: 'ID requerido' }), {
      status: 400
    })

  try {
    await disableStudent(id)
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Error al desactivar'
    return new Response(JSON.stringify({ error: msg }), { status: 500 })
  }
}
