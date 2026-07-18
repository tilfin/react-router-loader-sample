# React Router Loader + CRUD サンプル

React Router の Data Mode で、画面遷移時の `loader` とフォーム送信時の `action` を確認するミニアプリです。外部 API には依存せず、ブラウザ内のインメモリ API が約 550ms の待機を再現します。

```bash
npm install
npm run dev
```

## 試せること

- Overview → Users → User detail と遷移し、ヘッダーの **Loading** 表示で loader の実行を確認
- ユーザーの作成（POST）、編集（PATCH）、削除（DELETE）
- action 完了後のリダイレクトと loader の再実行
- `request.signal` による、途中で別画面へ遷移したときの loader 中断

主要ファイル:

- `src/data/users.ts`: 遅延と CRUD を再現するインメモリ API
- `src/routes/dashboard.tsx`: ダッシュボードの loader
- `src/routes/users.tsx`: 一覧・詳細の loader と CRUD action
- `src/main.tsx`: ネストしたルート定義と遷移状態の可視化

## TypeScript 7

`typescript` は 7.0.2 を使用しています。`tsconfig` は `strict`、`verbatimModuleSyntax`、`moduleResolution: "Bundler"` を有効にし、TypeScript 7 のネイティブ `tsc` で型チェックできます。
