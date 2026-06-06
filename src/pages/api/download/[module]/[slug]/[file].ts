import type { APIRoute } from 'astro'
import { assertCanDownload } from '@/lib/entitlements'
import { getPostsByModule } from '@/lib/community'
import { promises as fs } from 'fs'
import { resolve, join, normalize } from 'path'
import type { ModuleId } from '@/data/modules'

// Directorio base donde viven los assets privados (dentro de src/content)
// Nunca exponer paths absolutos en errores
const CONTENT_BASE = resolve(process.cwd(), 'src', 'content', 'community')

export const GET: APIRoute = async ({ locals, params }) => {
  const { module: moduleSlug, slug, file } = params

  if (!moduleSlug || !slug || !file) {
    return new Response('Recurso no encontrado', { status: 404 })
  }

  // Validar caracteres permitidos (path traversal prevention)
  const safePattern = /^[a-zA-Z0-9_\-]+$/
  if (!safePattern.test(moduleSlug) || !safePattern.test(slug)) {
    return new Response('Recurso no encontrado', { status: 404 })
  }

  // Solo permite archivos .pdf, .docx, .xlsx (whitelist)
  const allowedExtensions = ['.pdf', '.docx', '.xlsx', '.txt']
  const ext = file.includes('.')
    ? '.' + file.split('.').pop()!.toLowerCase()
    : ''
  if (!allowedExtensions.includes(ext)) {
    return new Response('Tipo de archivo no permitido', { status: 403 })
  }

  // Cargar post para validar entitlements
  let post: Awaited<ReturnType<typeof getPostsByModule>>[number] | undefined

  try {
    const posts = await getPostsByModule(moduleSlug as ModuleId)
    post = posts.find((p) => {
      const postId = p.id.replace(/\/index$/, '')
      const postSlug = postId.split('/').slice(1).join('/')
      return postSlug === slug
    })
  } catch {
    return new Response('Recurso no encontrado', { status: 404 })
  }

  if (!post) return new Response('Recurso no encontrado', { status: 404 })

  // Validar entitlements
  const errorResponse = assertCanDownload(locals as any, post, file)
  if (errorResponse) return errorResponse

  // Construir path seguro — evitar path traversal
  const safePath = normalize(
    join(CONTENT_BASE, moduleSlug, slug, 'assets', file)
  )
  if (!safePath.startsWith(CONTENT_BASE)) {
    return new Response('Acceso denegado', { status: 403 })
  }

  try {
    const buffer = await fs.readFile(safePath)

    const mimeTypes: Record<string, string> = {
      '.pdf': 'application/pdf',
      '.docx':
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      '.xlsx':
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      '.txt': 'text/plain'
    }

    const contentType = mimeTypes[ext] ?? 'application/octet-stream'
    const safeFilename = encodeURIComponent(file)

    return new Response(buffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${safeFilename}"`,
        'Cache-Control': 'private, no-cache',
        'X-Content-Type-Options': 'nosniff'
      }
    })
  } catch {
    return new Response('Archivo no encontrado', { status: 404 })
  }
}
