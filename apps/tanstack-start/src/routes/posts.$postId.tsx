import { Link, createFileRoute, notFound } from '@tanstack/react-router'

import { CommentsToggle } from '../components/CommentsToggle'
import {
  fetchAuthor,
  fetchComments,
  fetchPost,
  parsePostId,
} from '../lib/blog'

export const Route = createFileRoute('/posts/$postId')({
  loader: async ({ params }) => {
    const postId = parsePostId(params.postId)
    if (postId === null) {
      throw notFound()
    }

    const post = await fetchPost(postId)
    if (post === null) {
      throw notFound()
    }

    const [comments, author] = await Promise.all([
      fetchComments(post.id),
      fetchAuthor(post.userId),
    ])

    return { post, comments, author }
  },
  component: PostPage,
  head: ({ loaderData }) => ({
    meta: [
      {
        title: loaderData
          ? `${loaderData.post.title} | TanStack Start`
          : '記事 | TanStack Start',
      },
    ],
  }),
})

function PostPage() {
  const { post, comments, author } = Route.useLoaderData()

  return (
    <main className="shell">
      <Link className="back-link" to="/">
        ← 一覧へ
      </Link>
      <article className="card">
        <p className="muted">
          {author === null ? '不明な著者' : `${author.name} (@${author.username})`}
        </p>
        <h1>{post.title}</h1>
        <p>{post.body}</p>
      </article>
      <CommentsToggle comments={comments} />
    </main>
  )
}
