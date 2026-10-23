import { defineConfig } from 'astro/config'

// Static and self-contained: the same build works on a Vercel URL or a custom domain.
export default defineConfig({
  output: 'static',
  devToolbar: { enabled: false },
})
