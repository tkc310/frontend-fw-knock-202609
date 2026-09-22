import type { Config } from '@react-router/dev/config'

import { fetchPosts } from './app/lib/blog'

const enableSsg = process.env.SSG === '1'

async function prerenderPaths() {
  const posts = await fetchPosts()
  return ['/', ...posts.map((post) => `/posts/${post.id}`)]
}

export default {
  // 既定は SSR。SSG=1 で静的ファイルのみにする
  ssr: !enableSsg,
  prerender: prerenderPaths,
} satisfies Config
