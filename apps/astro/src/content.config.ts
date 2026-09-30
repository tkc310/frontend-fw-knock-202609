import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'

// 記事ごとのコメント。旧 API の comments を frontmatter に持たせる
const commentSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  body: z.string(),
})

const posts = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content' }),
  schema: z.object({
    title: z.string(),
    userId: z.number(),
    authorName: z.string(),
    authorUsername: z.string(),
    comments: z.array(commentSchema),
  }),
})

export const collections = { posts }
