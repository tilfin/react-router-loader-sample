import { Link } from 'react-router-dom'
import type { User } from '../../data/users'

type UserCardProps = {
  user: User
}

export function UserCard({ user }: UserCardProps) {
  return (
    <Link className="user-card" to={`/users/${user.id}`}>
      <div className="avatar">{user.name.slice(0, 1)}</div>
      <div><strong>{user.name}</strong><span>{user.email}</span></div>
      <span className={`role ${user.role.toLowerCase()}`}>{user.role}</span>
      <span className="arrow">→</span>
    </Link>
  )
}
