export type User = {
  id: string
  name: string
  email: string
  role: 'Admin' | 'Editor' | 'Viewer'
  team: string
  updatedAt: string
}

export type UserInput = Pick<User, 'name' | 'email' | 'role' | 'team'>

let users: User[] = [
  { id: '1', name: 'Ava Tanaka', email: 'ava@example.com', role: 'Admin', team: 'Platform', updatedAt: '2026-07-18T02:10:00.000Z' },
  { id: '2', name: 'Ken Ito', email: 'ken@example.com', role: 'Editor', team: 'Design', updatedAt: '2026-07-17T08:30:00.000Z' },
  { id: '3', name: 'Mina Sato', email: 'mina@example.com', role: 'Viewer', team: 'Operations', updatedAt: '2026-07-16T04:15:00.000Z' },
]

function wait(signal?: AbortSignal) {
  return new Promise<void>((resolve, reject) => {
    const timer = window.setTimeout(resolve, 550)
    signal?.addEventListener('abort', () => {
      window.clearTimeout(timer)
      reject(new DOMException('The request was cancelled.', 'AbortError'))
    }, { once: true })
  })
}

function clone(user: User): User {
  return { ...user }
}

function authorize(accessToken: string) {
  if (!accessToken.startsWith('demo.')) throw new Response('Unauthorized', { status: 401 })
}
function authorizeWrite(accessToken: string, groups: string[]) {
  authorize(accessToken)
  if (!groups.includes('Admins')) throw new Response('この操作を行う権限がありません。', { status: 403 })
}

type ApiAuth = { accessToken: string; groups: string[] }

export function createUserApi(auth: ApiAuth) {
  return {
    async list(signal?: AbortSignal) {
      authorize(auth.accessToken)
      await wait(signal)
      return users.map(clone)
    },
    async get(id: string, signal?: AbortSignal) {
      authorize(auth.accessToken)
      await wait(signal)
      const user = users.find((candidate) => candidate.id === id)
      return user ? clone(user) : undefined
    },
    async create(input: UserInput) {
      authorizeWrite(auth.accessToken, auth.groups)
      await wait()
      const user: User = {
        ...input,
        id: crypto.randomUUID(),
        updatedAt: new Date().toISOString(),
      }
      users = [user, ...users]
      return clone(user)
    },
    async update(id: string, input: UserInput) {
      authorizeWrite(auth.accessToken, auth.groups)
      await wait()
      const index = users.findIndex((candidate) => candidate.id === id)
      if (index === -1) return undefined
      const user = { ...users[index], ...input, updatedAt: new Date().toISOString() }
      users = users.with(index, user)
      return clone(user)
    },
    async remove(id: string) {
      authorizeWrite(auth.accessToken, auth.groups)
      await wait()
      const exists = users.some((candidate) => candidate.id === id)
      users = users.filter((candidate) => candidate.id !== id)
      return exists
    },
  }
}
