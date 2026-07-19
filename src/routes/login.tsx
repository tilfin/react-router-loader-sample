import { Form, redirect, useActionData, useSearchParams } from 'react-router-dom'
import { getSession, safeReturnTo, signIn } from '../auth/auth'

export function loginLoader() { if (getSession()) throw redirect('/'); return null }
export async function loginAction({ request }: { request: Request }) {
  const formData = await request.formData()
  if (!signIn(String(formData.get('email') ?? ''))) return { error: 'デモアカウントを選択してください。' }
  return redirect(safeReturnTo(formData.get('returnTo')))
}
export function LoginPage() {
  const actionData = useActionData() as { error?: string } | undefined
  const [searchParams] = useSearchParams()
  return <main className="login-page"><section className="login-card" aria-labelledby="login-title"><div className="login-mark">RR</div><p className="eyebrow">Secure area</p><h1 id="login-title">Loader Lab にログイン</h1><p>本番では Cognito Hosted UI の Authorization Code + PKCE に置き換える想定の擬似ログインです。</p><Form method="post" className="login-form"><input type="hidden" name="returnTo" value={searchParams.get('returnTo') ?? '/'} /><label>デモアカウント<select name="email" defaultValue="admin@example.com"><option value="admin@example.com">Demo Admin（編集可能）</option><option value="viewer@example.com">Demo Viewer（閲覧のみ）</option></select></label>{actionData?.error && <p className="form-error" role="alert">{actionData.error}</p>}<button type="submit">ログイン</button></Form><p className="security-note">パスワードはアプリで扱わず、認証情報はこのタブを閉じると破棄されます。</p></section></main>
}
