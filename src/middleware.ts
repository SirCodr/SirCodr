import { clerkMiddleware, createRouteMatcher } from '@clerk/astro/server'

// Rutas que requieren sesión activa (redirect a sign-in si no autenticado)
const isCommunityPost = createRouteMatcher(['/comunidad/:module/:slug'])

// Rutas de admin — sin autenticación devuelven 404 (no revela la existencia del panel)
const isAdminRoute = createRouteMatcher(['/admin', '/admin/(.*)'])

// API admin
const isAdminApi = createRouteMatcher(['/api/admin', '/api/admin/(.*)'])

export const onRequest = clerkMiddleware(async (auth, context) => {
  const { userId } = auth()

  // Admin routes: sin sesión o sin rol admin → 404
  if (isAdminRoute(context.request) || isAdminApi(context.request)) {
    if (!userId) {
      return new Response(null, { status: 404 })
    }
    // El check de rol admin se hace dentro de cada endpoint/página
    return
  }

  // Post detail de comunidad: requiere sesión
  if (isCommunityPost(context.request) && !userId) {
    return auth().redirectToSignIn({ returnBackUrl: context.request.url })
  }
})
