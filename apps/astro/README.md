# Astro ブログ playground

公式 `create astro --template minimal` を土台にしたブログです。記事は [Content Collections](https://docs.astro.build/ja/guides/content-collections/#what-are-content-collections) で管理する静的 Markdown（`src/content/*.md`）です。インタラクションは `@astrojs/react` のアイランドです。

## メモ

https://zenn.dev/tkc310/scraps/26735a7ca4ce2e#comment-2f4756915f57aa

## 画面

- `/` … 記事一覧（SSG）。タイトル検索とお気に入り
- `/posts/:id` … Markdown 本文・著者・コメント表示切替（`getStaticPaths` による SSG）
- `/live` … 同じ一覧を `prerender = false` でリクエスト時 SSR（データは Collections のまま）

## コンテンツ

- 定義: `src/content.config.ts`（`glob` ローダー + Zod スキーマ）
- 記事: `src/content/1.md` 〜 `12.md`
- コメント: 各記事 frontmatter の `comments`（ライブ API は使わない）
- 一覧・詳細は `getCollection` / `getEntry` / `render` で組み立てる

## セットアップ

```bash
npm install
npm run dev
```

開発サーバーは `http://localhost:4321`。

```bash
npm run typecheck
npm run build
npm run preview
```

## SSR と SSG

Astro の既定はビルド時プリレンダー（SSG）です。リクエスト時レンダーには `@astrojs/node` アダプタが必要です。記事データ自体はビルド時に Content Collections へ載るので、`/live` の SSR は HTML の組み立てタイミングの比較用です。

| モード | コマンド | 内容 |
| --- | --- | --- |
| SSG（既定） | `npm run build` | `output: 'static'`。`/` と `/posts/:id` は静的 HTML |
| 部分 SSR | 既定ビルドのまま `/live` | `export const prerender = false`。アダプタ付きでそのページだけ SSR |
| サーバー出力 + 静的ページ | `npm run build:ssr` | `ASTRO_OUTPUT=server`。`/` と `/posts/:id` は `prerender = true` のまま SSG。`/live` だけ SSR。`npm start` |

`output: 'static'` のままアダプタを入れると、静的ページを残しつつ `prerender = false` のページだけサーバーが必要になります。アダプタなしでは `/live` はビルドできません。
