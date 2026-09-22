import { defineConfig } from 'astro/config'
import node from '@astrojs/node'
import react from '@astrojs/react'

// ASTRO_OUTPUT=server で全ページをリクエスト時SSRにする
const useServerOutput = process.env.ASTRO_OUTPUT === 'server'

export default defineConfig({
  output: useServerOutput ? 'server' : 'static',
  adapter: node({ mode: 'standalone' }),
  integrations: [react()],
})
