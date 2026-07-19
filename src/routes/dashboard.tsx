import { Link, useLoaderData } from 'react-router-dom'
import { authenticatedApi } from '../data/api'

export async function dashboardLoader({ request }: { request: Request }) {
  const users = await authenticatedApi(request).users.list(request.signal)
  return { userCount: users.length, loadedAt: new Date().toLocaleTimeString('ja-JP') }
}

export function DashboardPage() {
  const data = useLoaderData() as Awaited<ReturnType<typeof dashboardLoader>>
  return (
    <main className="page">
      <p className="eyebrow">React Router data mode</p>
      <h1>画面ごとに、必要なデータを先に読み込む</h1>
      <p className="lead">ナビゲーションの状態と各ルートの loader を見ながら、ユーザー管理の CRUD を試せます。</p>
      <section className="hero-grid">
        <article className="metric"><span>Registered users</span><strong>{data.userCount}</strong><small>loader completed at {data.loadedAt}</small></article>
        <article className="how-it-works">
          <p className="label">Try the flow</p>
          <ol><li>Users へ移動して一覧 loader を確認</li><li>ユーザーを選び、詳細 loader を確認</li><li>作成・編集・削除で action → 再検証を確認</li></ol>
          <Link className="button" to="/users">ユーザー管理を開く</Link>
        </article>
      </section>
    </main>
  )
}
