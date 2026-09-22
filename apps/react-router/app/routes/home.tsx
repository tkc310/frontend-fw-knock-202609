import { PostList } from '../components/PostList'
import { fetchPosts } from '../lib/blog'

import type { Route } from './+types/home'

export function meta(_args: Route.MetaArgs) {
  return [{ title: '記事一覧 | React Router' }]
}

export async function loader(_args: Route.LoaderArgs) {
  return { posts: await fetchPosts() }
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <main className="shell">
      <header className="site-header">
        <h1 className="site-title">React Router ブログ</h1>
        <p className="mode-badge">
          既定は SSR + prerender。SSG=1 で静的のみ
        </p>
      </header>
      <PostList posts={loaderData.posts} />
    </main>
  )
}
