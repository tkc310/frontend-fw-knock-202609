import { createFileRoute } from '@tanstack/react-router'

import { PostList } from '../components/PostList'
import { fetchPosts } from '../lib/blog'

export const Route = createFileRoute('/')({
  loader: () => fetchPosts(),
  component: Home,
  head: () => ({
    meta: [{ title: '記事一覧 | TanStack Start' }],
  }),
})

function Home() {
  const posts = Route.useLoaderData()

  return (
    <main className="shell">
      <header className="site-header">
        <h1 className="site-title">TanStack Start ブログ</h1>
        <p className="mode-badge">
          既定は SSR。SSG は PRERENDER=1 でビルド
        </p>
      </header>
      <PostList posts={posts} />
    </main>
  )
}
