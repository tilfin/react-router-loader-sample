import { Form, Link, redirect, useLoaderData } from 'react-router-dom'
import type { User, UserInput } from '../data/users'
import { userApi } from '../data/users'
import { SubmitButton } from '../components/users/SubmitButton'
import { UserCard } from '../components/users/UserCard'
import { UserFields } from '../components/users/UserFields'

function inputFrom(formData: FormData): UserInput {
  return {
    name: String(formData.get('name') ?? '').trim(),
    email: String(formData.get('email') ?? '').trim(),
    role: String(formData.get('role') ?? 'Viewer') as User['role'],
    team: String(formData.get('team') ?? '').trim(),
  }
}

function assertValid(input: UserInput) {
  if (!input.name || !input.email || !input.team || !input.email.includes('@')) {
    throw new Response('名前・有効なメールアドレス・チームを入力してください。', { status: 400 })
  }
}

export async function usersLoader({ request }: { request: Request }): Promise<User[]> {
  return userApi.list(request.signal)
}

export async function usersAction({ request }: { request: Request }) {
  const input = inputFrom(await request.formData())
  assertValid(input)
  const user = await userApi.create(input)
  return redirect(`/users/${user.id}`)
}

export async function userLoader({ params, request }: { params: { userId?: string }; request: Request }) {
  const user = await userApi.get(params.userId ?? '', request.signal)
  if (!user) throw new Response('ユーザーが見つかりません。', { status: 404 })
  return user
}

export async function userAction({ params, request }: { params: { userId?: string }; request: Request }) {
  const id = params.userId ?? ''
  if (request.method === 'DELETE') {
    await userApi.remove(id)
    return redirect('/users')
  }
  const input = inputFrom(await request.formData())
  assertValid(input)
  const user = await userApi.update(id, input)
  if (!user) throw new Response('ユーザーが見つかりません。', { status: 404 })
  return redirect(`/users/${user.id}`)
}

export function UserListPage() {
  const users = useLoaderData() as User[]
  return (
    <main className="page">
      <div className="page-heading"><div><p className="eyebrow">GET /users</p><h1>ユーザー一覧</h1><p>この画面の loader が 550ms の API 待機を再現します。</p></div><Link className="button" to="/users/new">＋ ユーザーを追加</Link></div>
      <div className="loader-note"><code>usersLoader</code><span>→ useLoaderData ({users.length} records)</span></div>
      <section className="user-list">
        {users.map((user) => <UserCard user={user} key={user.id} />)}
      </section>
    </main>
  )
}

export function UserFormPage() {
  return <main className="page narrow"><p className="eyebrow">POST /users</p><h1>ユーザーを追加</h1><p>Form の送信はこのルートの action が処理し、作成後は詳細ルートへ遷移します。</p><Form className="user-form" method="post"><UserFields /><div className="form-actions"><Link to="/users">キャンセル</Link><SubmitButton>作成する</SubmitButton></div></Form></main>
}

export function UserDetailPage() {
  const user = useLoaderData() as User
  return <main className="page narrow"><div className="page-heading"><div><p className="eyebrow">GET /users/{user.id.slice(0, 8)}</p><h1>{user.name}</h1><p>最終更新: {new Date(user.updatedAt).toLocaleString('ja-JP')}</p></div><Link to="/users">← 一覧へ</Link></div><div className="loader-note"><code>userLoader</code><span>→ useLoaderData (1 record)</span></div><Form id="edit-user" className="user-form" method="patch"><UserFields user={user} /></Form><div className="form-actions detail-actions"><Form method="delete" className="inline-form"><button className="danger" type="submit">削除</button></Form><SubmitButton form="edit-user">変更を保存</SubmitButton></div></main>
}
