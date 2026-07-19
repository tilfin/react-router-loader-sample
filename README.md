# React Router Loader + CRUD サンプル

React Router の Data Mode で、画面遷移時の `loader` とフォーム送信時の `action` を確認するミニアプリです。外部 API には依存せず、ブラウザ内のインメモリ API が約 550ms の待機を再現します。

認証もブラウザ内で擬似実装しています。`admin@example.com`（編集可能）と `viewer@example.com`（閲覧のみ）をログイン画面から選べます。セッションはタブ単位・30分で失効します。

```bash
npm install
npm run dev
```

## 試せること

- Overview → Users → User detail と遷移し、ヘッダーの **Loading** 表示で loader の実行を確認
- ユーザーの作成（POST）、編集（PATCH）、削除（DELETE）
- action 完了後のリダイレクトと loader の再実行
- `request.signal` による、途中で別画面へ遷移したときの loader 中断
- 保護ルート、認証リダイレクト、有効期限付きセッション、Admin/Viewer の認可

## API Gateway + Cognito へ移行するとき

- `src/auth/auth.ts` を Cognito Hosted UI（Authorization Code + PKCE）のクライアントへ置換
- `authenticatedApi` の内部を `fetch` に置換し、Access Token を `Authorization: Bearer ...` で自動付与
- API Gateway の Cognito Authorizer で JWT の署名・issuer・audience・期限を検証
- 書き込み権限は画面表示だけに依存せず、Lambda/API 側でも `cognito:groups` などを検証
- ID Token ではなく Access Token を API 認可に使い、長期トークンを `localStorage` に保存しない

主要ファイル:

- `src/data/users.ts`: 遅延と CRUD を再現するインメモリ API
- `src/routes/dashboard.tsx`: ダッシュボードの loader
- `src/routes/users.tsx`: 一覧・詳細の loader と CRUD action
- `src/main.tsx`: ネストしたルート定義と遷移状態の可視化

## TypeScript 7

`typescript` は 7.0.2 を使用しています。`tsconfig` は `strict`、`verbatimModuleSyntax`、`moduleResolution: "Bundler"` を有効にし、TypeScript 7 のネイティブ `tsc` で型チェックできます。
