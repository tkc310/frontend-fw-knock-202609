# frontend-fw-knock-202609

フロントエンドフレームワークの動向チェック用のリポジトリ

概要は下記の記事を参照<br />
https://qiita.com/nogataka/items/c7c59e908be3a88dc1a8

まとめスクラップは下記<br />
https://zenn.dev/tkc310/scraps/26735a7ca4ce2e

## 対象のフレームワーク

Next.jsは追えているのでそれ以外の主要なフレームワークを確認する。

- TanStack Start
- React Router v8
- Astro

なお、Remix2はReact Router v7に統合されて、beta版で脱ReactしたRemix3が出ているらしい。  
どちらもShopifyのコアチームによるサポートを受けているが、Remixの今後は「Web標準を優先したフルスタックフレームワーク」という挑戦的プロジェクトとして進められるらしい。  
(そのため今回は検証を省略している)

## ブログ playground

`apps/` 配下に、同じ JSONPlaceholder API（`posts` / `comments` / `users`）を使う比較用ブログを置いています。

| アプリ | ディレクトリ | 一覧 / 詳細 / 操作 |
| --- | --- | --- |
| TanStack Start | `apps/tanstack-start` | `/` ・ `/posts/:id` ・検索・お気に入り・コメント表示切替 |
| Astro | `apps/astro` | `/` ・ `/posts/:id` ・ `/live`（SSR）・同じ操作 |
| React Router v8 | `apps/react-router` | `/` ・ `/posts/:id` ・同じ操作 |

各アプリで依存関係を入れて起動します。

```bash
cd apps/tanstack-start && npm install && npm run dev
cd apps/astro && npm install && npm run dev
cd apps/react-router && npm install && npm run dev
```

### SSR と SSG の切り替え

詳細は各アプリの README を参照。

- **TanStack Start**: `npm run dev` / `npm run build` は SSR。`npm run build:ssg`（`PRERENDER=1`）で prerender による静的出力。
- **Astro**: 既定ビルドは SSG（`prerender` 既定 true）。`/live` だけ `prerender = false` で Node アダプタによる SSR。全ページ SSR は `npm run build:ssr`（`ASTRO_OUTPUT=server`）。
- **React Router**: 既定は SSR しつつ `prerender` で一覧・詳細を事前生成。`npm run build:ssg`（`SSG=1`）で `ssr: false` の静的サイト。
