import { useState } from 'react'

type PostSummary = {
  id: string
  title: string
  body: string
}

type Props = {
  posts: PostSummary[]
}

export function PostList({ posts }: Props) {
  const [query, setQuery] = useState('')
  const [favorites, setFavorites] = useState<string[]>([])

  const keyword = query.trim().toLowerCase()
  const filtered =
    keyword === ''
      ? posts
      : posts.filter((post) => post.title.toLowerCase().includes(keyword))

  function toggleFavorite(id: string) {
    setFavorites((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    )
  }

  return (
    <div className="stack">
      <div className="card search-row">
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="タイトルで絞り込み"
          aria-label="記事検索"
        />
        <span className="muted">お気に入り {favorites.length}</span>
      </div>
      {filtered.map((post) => (
        <div className="card" key={post.id}>
          <a className="post-link" href={`/posts/${post.id}`}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </a>
          <button
            type="button"
            className="fav-button"
            data-on={favorites.includes(post.id) ? 'true' : 'false'}
            onClick={() => toggleFavorite(post.id)}
          >
            {favorites.includes(post.id) ? 'お気に入り解除' : 'お気に入り'}
          </button>
        </div>
      ))}
      {filtered.length === 0 ? (
        <p className="muted">一致する記事がありません。</p>
      ) : null}
    </div>
  )
}
