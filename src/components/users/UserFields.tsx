import type { User } from '../../data/users'

type UserFieldsProps = {
  user?: User
}

export function UserFields({ user }: UserFieldsProps) {
  return (
    <div className="form-grid">
      <label>名前<input name="name" defaultValue={user?.name} required /></label>
      <label>メールアドレス<input name="email" type="email" defaultValue={user?.email} required /></label>
      <label>チーム<input name="team" defaultValue={user?.team} required /></label>
      <label>ロール<select name="role" defaultValue={user?.role ?? 'Viewer'}><option>Admin</option><option>Editor</option><option>Viewer</option></select></label>
    </div>
  )
}
