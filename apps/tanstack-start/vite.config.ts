import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'

// PRERENDER=1 でビルドすると静的HTMLを書き出す（SSG）
const enablePrerender = process.env.PRERENDER === '1'

const config = defineConfig({
  resolve: { tsconfigPaths: true },
  plugins: [
    tanstackStart({
      prerender: {
        enabled: enablePrerender,
        crawlLinks: true,
        failOnError: true,
      },
    }),
    viteReact(),
  ],
})

export default config
