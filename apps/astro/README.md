# Astro ブログ playground

公式 `create astro --template minimal` を土台にしたブログです。データは [JSONPlaceholder](https://jsonplaceholder.typicode.com/) です。インタラクションは `@astrojs/react` のアイランドです。

## メモ

https://zenn.dev/tkc310/scraps/26735a7ca4ce2e#comment-2f4756915f57aa

## 画面

- `/` … 記事一覧（SSG）。タイトル検索とお気に入り
- `/posts/:id` … 本文・著者・コメント表示切替（`getStaticPaths` による SSG）
- `/live` … 同じ一覧を `prerender = false` でリクエスト時 SSR

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

Astro の既定はビルド時プリレンダー（SSG）です。リクエスト時レンダーには `@astrojs/node` アダプタが必要です。

| モード | コマンド | 内容 |
| --- | --- | --- |
| SSG（既定） | `npm run build` | `output: 'static'`。`/` と `/posts/:id` は静的 HTML |
| 部分 SSR | 既定ビルドのまま `/live` | `export const prerender = false`。アダプタ付きでそのページだけ SSR |
| サーバー出力 + 静的ページ | `npm run build:ssr` | `ASTRO_OUTPUT=server`。`/` と `/posts/:id` は `prerender = true` のまま SSG。`/live` だけ SSR。`npm start` |

`output: 'static'` のままアダプタを入れると、静的ページを残しつつ `prerender = false` のページだけサーバーが必要になります。アダプタなしでは `/live` はビルドできません。
