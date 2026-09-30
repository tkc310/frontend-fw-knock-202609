# TanStack Start ブログ playground

公式 CLI（`create-start-app`）の最小テンプレートを土台にしたブログです。データは [JSONPlaceholder](https://jsonplaceholder.typicode.com/) です。

## メモ

https://zenn.dev/tkc310/scraps/26735a7ca4ce2e#comment-d1e2ccd9cff5b9

## 画面

- `/` … 記事一覧。タイトル検索とお気に入り（クライアント状態）
- `/posts/:postId` … 本文・著者・コメント表示切替

## セットアップ

```bash
npm install
npm run dev
```

開発サーバーは `http://localhost:3000`（SSR）。

```bash
npm run typecheck
npm run build
```

## SSR と SSG

TanStack Start の既定はサーバーレンダリングです。静的化は Vite プラグインの `prerender` です。

| モード | コマンド | 内容 |
| --- | --- | --- |
| SSR（開発） | `npm run dev` | リクエストごとに loader が走る |
| SSR（本番） | `npm run build` のあと `npm run preview` | prerender 無効 |
| SSG | `npm run build:ssg` | `PRERENDER=1` で `prerender.enabled` と `crawlLinks` を有効化 |

SSG ビルドは一覧からリンクを辿って詳細も静的 HTML にします。動的ルート単体では自動列挙されないため、`crawlLinks: true` が必要です。

本番を Node サーバーとして出す場合は SSR ビルド、CDN に静的ファイルだけ置く場合は SSG ビルドを使います。
