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

export const userApi = {
  async list(signal?: AbortSignal) {
    await wait(signal)
    return users.map(clone)
  },
  async get(id: string, signal?: AbortSignal) {
    await wait(signal)
    const user = users.find((candidate) => candidate.id === id)
    return user ? clone(user) : undefined
  },
  async create(input: UserInput) {
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
    await wait()
    const index = users.findIndex((candidate) => candidate.id === id)
    if (index === -1) return undefined
    const user = { ...users[index], ...input, updatedAt: new Date().toISOString() }
    users = users.with(index, user)
    return clone(user)
  },
  async remove(id: string) {
    await wait()
    const exists = users.some((candidate) => candidate.id === id)
    users = users.filter((candidate) => candidate.id !== id)
    return exists
  },
}
