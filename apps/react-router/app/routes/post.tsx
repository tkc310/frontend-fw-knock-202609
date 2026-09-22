import { Link } from 'react-router'

import { CommentsToggle } from '../components/CommentsToggle'
import {
  fetchAuthor,
  fetchComments,
  fetchPost,
  parsePostId,
} from '../lib/blog'

import type { Route } from './+types/post'

export function meta({ data }: Route.MetaArgs) {
  if (!data) {
    return [{ title: '記事 | React Router' }]
  }
  return [{ title: `${data.post.title} | React Router` }]
}

export async function loader({ params }: Route.LoaderArgs) {
  const postId = parsePostId(params.postId)
  if (postId === null) {
    throw new Response('Not Found', { status: 404 })
  }

  const post = await fetchPost(postId)
  if (post === null) {
    throw new Response('Not Found', { status: 404 })
  }

  const [comments, author] = await Promise.all([
    fetchComments(post.id),
    fetchAuthor(post.userId),
  ])

  return { post, comments, author }
}

export default function PostPage({ loaderData }: Route.ComponentProps) {
  const { post, comments, author } = loaderData

  return (
    <main className="shell">
      <Link className="back-link" to="/">
        ← 一覧へ
      </Link>
      <article className="card">
        <p className="muted">
          {author === null
            ? '不明な著者'
            : `${author.name} (@${author.username})`}
        </p>
        <h1>{post.title}</h1>
        <p>{post.body}</p>
      </article>
      <CommentsToggle comments={comments} />
    </main>
  )
}
