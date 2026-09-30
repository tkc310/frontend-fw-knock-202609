# React Router v8 ブログ playground

公式テンプレート（`create-react-router`）を土台にしたブログです。データは [JSONPlaceholder](https://jsonplaceholder.typicode.com/) です。

## メモ

https://zenn.dev/tkc310/scraps/26735a7ca4ce2e#comment-16b0c576331968

## 画面

- `/` … 記事一覧。タイトル検索とお気に入り（クライアント状態）
- `/posts/:postId` … 本文・著者・コメント表示切替

## セットアップ

```bash
npm install
npm run dev
```

開発サーバーは `http://localhost:5173`（SSR）。

```bash
npm run typecheck
npm run build
npm start
```

## SSR と SSG

設定は `react-router.config.ts` です。`ssr` と `prerender` を組み合わせます。

| モード | コマンド | 内容 |
| --- | --- | --- |
| SSR + prerender（既定） | `npm run build` のあと `npm start` | 実行時 SSR あり。一覧・詳細はビルド時にも HTML 化 |
| SSG（静的のみ） | `npm run build:ssg` | `SSG=1` で `ssr: false`。`prerender` したパスだけ静的ファイル |

`ssr: false` かつ `prerender` なしは SPA モードになり、各ルートの loader は使えません。この playground の SSG では `prerender` に一覧と記事詳細のパスを渡しています。

静的ビルド後に Node の `npm start` は使いません。`build/client` を静的サーバーに置きます。
