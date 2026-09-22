import { useState } from 'react'

type CommentItem = {
  id: number
  name: string
  body: string
}

type Props = {
  comments: CommentItem[]
}

export function CommentsToggle({ comments }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <section className="card stack">
      <button
        type="button"
        className="toggle-button"
        onClick={() => setOpen((value) => !value)}
      >
        {open ? 'コメントを隠す' : `コメントを表示 (${comments.length})`}
      </button>
      {open
        ? comments.map((comment) => (
            <div className="comment" key={comment.id}>
              <h3>{comment.name}</h3>
              <p className="muted">{comment.body}</p>
            </div>
          ))
        : null}
    </section>
  )
}
