// JSONPlaceholder の無料ブログ API。3アプリで同じ形を使う。
export const BLOG_API_BASE = 'https://jsonplaceholder.typicode.com'
export const POST_LIMIT = 12

export type BlogPost = {
  userId: number
  id: number
  title: string
  body: string
}

export type BlogComment = {
  postId: number
  id: number
  name: string
  email: string
  body: string
}

export type BlogAuthor = {
  id: number
  name: string
  username: string
}

async function readJson<T>(url: string): Promise<T> {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`ブログAPIエラー: ${response.status} ${url}`)
  }
  return (await response.json()) as T
}

export async function fetchPosts(): Promise<BlogPost[]> {
  return readJson<BlogPost[]>(`${BLOG_API_BASE}/posts?_limit=${POST_LIMIT}`)
}

export async function fetchPost(id: number): Promise<BlogPost | null> {
  const response = await fetch(`${BLOG_API_BASE}/posts/${id}`)
  if (response.status === 404) {
    return null
  }
  if (!response.ok) {
    throw new Error(`ブログAPIエラー: ${response.status}`)
  }
  return (await response.json()) as BlogPost
}

export async function fetchComments(postId: number): Promise<BlogComment[]> {
  return readJson<BlogComment[]>(`${BLOG_API_BASE}/posts/${postId}/comments`)
}

export async function fetchAuthor(userId: number): Promise<BlogAuthor | null> {
  const response = await fetch(`${BLOG_API_BASE}/users/${userId}`)
  if (response.status === 404) {
    return null
  }
  if (!response.ok) {
    throw new Error(`ブログAPIエラー: ${response.status}`)
  }
  return (await response.json()) as BlogAuthor
}

export function parsePostId(raw: string | undefined): number | null {
  if (raw === undefined || raw === '') {
    return null
  }
  const id = Number.parseInt(raw, 10)
  if (!Number.isInteger(id) || id <= 0) {
    return null
  }
  return id
}
