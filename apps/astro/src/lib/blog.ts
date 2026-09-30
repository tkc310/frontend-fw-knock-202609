import { getCollection, getEntry, type CollectionEntry } from 'astro:content'

export type BlogPostEntry = CollectionEntry<'posts'>

export type BlogPostSummary = {
  id: string
  title: string
  body: string
}

export type BlogComment = BlogPostEntry['data']['comments'][number]

// ファイル名（1.md）の数値順で並べる
export async function getPosts(): Promise<BlogPostEntry[]> {
  const posts = await getCollection('posts')
  return posts.toSorted((a, b) => Number(a.id) - Number(b.id))
}

export async function getPost(id: string): Promise<BlogPostEntry | undefined> {
  return getEntry('posts', id)
}

export function toPostSummaries(posts: BlogPostEntry[]): BlogPostSummary[] {
  return posts.map((post) => ({
    id: post.id,
    title: post.data.title,
    body: post.body ?? '',
  }))
}

export function parsePostId(raw: string | undefined): string | null {
  if (raw === undefined || raw === '') {
    return null
  }
  const id = Number.parseInt(raw, 10)
  if (!Number.isInteger(id) || id <= 0 || String(id) !== raw) {
    return null
  }
  return raw
}
