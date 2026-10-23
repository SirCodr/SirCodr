// @ts-check
import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'
import sitemap from '@astrojs/sitemap'
import vercel from '@astrojs/vercel'
import node from '@astrojs/node'
import clerk from '@clerk/astro'
import mdx from '@astrojs/mdx'

const adapter = process.env.ASTRO_LOCAL_PREVIEW === '1'
  ? node({ mode: 'standalone' })
  : vercel()

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter,
  site: 'https://jotadev-portfolio.vercel.app',
  integrations: [sitemap(), clerk(), mdx()],
  vite: {
    plugins: [tailwindcss()]
  }
})
