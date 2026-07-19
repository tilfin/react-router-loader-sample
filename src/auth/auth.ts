import { redirect } from 'react-router-dom'

export type AuthUser = { sub: string; email: string; name: string; groups: string[] }
type Session = { accessToken: string; expiresAt: number; user: AuthUser }
const SESSION_KEY = 'loader-lab.auth-session'
const SESSION_LIFETIME_MS = 30 * 60 * 1000
const demoUsers: Record<string, AuthUser> = {
  'admin@example.com': { sub: 'demo-admin', email: 'admin@example.com', name: 'Demo Admin', groups: ['Admins'] },
  'viewer@example.com': { sub: 'demo-viewer', email: 'viewer@example.com', name: 'Demo Viewer', groups: ['Viewers'] },
}

function readSession(): Session | null {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY)
    if (!raw) return null
    const session = JSON.parse(raw) as Session
    if (!session.accessToken || !session.user || session.expiresAt <= Date.now()) {
      sessionStorage.removeItem(SESSION_KEY)
      return null
    }
    return session
  } catch {
    sessionStorage.removeItem(SESSION_KEY)
    return null
  }
}

export function getSession() { return readSession() }
export function signIn(email: string) {
  const user = demoUsers[email.toLowerCase()]
  if (!user) return null
  const session: Session = { accessToken: `demo.${crypto.randomUUID()}`, expiresAt: Date.now() + SESSION_LIFETIME_MS, user }
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(session))
  return session
}
export function signOut() { sessionStorage.removeItem(SESSION_KEY) }
export function requireSession(request: Request) {
  const session = readSession()
  if (session) return session
  const url = new URL(request.url)
  throw redirect(`/login?returnTo=${encodeURIComponent(`${url.pathname}${url.search}`)}`)
}
export function requireGroup(request: Request, group: string) {
  const session = requireSession(request)
  if (!session.user.groups.includes(group)) throw new Response('この画面を開く権限がありません。', { status: 403 })
  return session
}
export function safeReturnTo(value: FormDataEntryValue | null) {
  const path = String(value ?? '/')
  return path.startsWith('/') && !path.startsWith('//') ? path : '/'
}
