// @ts-check
import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'
import sitemap from '@astrojs/sitemap'
import vercel from '@astrojs/vercel'
import clerk from '@clerk/astro'
import mdx from '@astrojs/mdx'

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: vercel(),
  site: 'https://jotadev-portfolio.vercel.app',
  integrations: [sitemap(), clerk(), mdx()],
  vite: {
    plugins: [tailwindcss()]
  }
})
