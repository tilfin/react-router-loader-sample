import { Form, NavLink, Outlet, useLoaderData, useNavigation, useRevalidator } from 'react-router-dom'
import type { AuthUser } from '../../auth/auth'

export function AppLayout() {
  const { user } = useLoaderData() as { user: AuthUser }
  const navigation = useNavigation()
  const revalidator = useRevalidator()
  const destination = navigation.location?.pathname

  return (
    <div className="app-shell">
      <header className="topbar">
        <NavLink className="brand" to="/">
          <span>RR</span>
          Loader Lab
        </NavLink>
        <nav aria-label="Main navigation">
          <NavLink to="/" end>Overview</NavLink>
          <NavLink to="/users">Users</NavLink>
          {user.groups.includes('Admins') && <NavLink to="/users/new">Create user</NavLink>}
        </nav>
        <div className="account"><span><strong>{user.name}</strong><small>{user.groups.join(', ')}</small></span><Form method="post" action="/logout"><button className="text-button" type="submit">ログアウト</button></Form></div>
        <div className="navigation-status" aria-live="polite">
          {navigation.state !== 'idle'
            ? `Loading ${destination ?? 'route'}…`
            : revalidator.state !== 'idle'
              ? 'Refreshing loader data…'
              : 'Ready'}
        </div>
      </header>
      <div className="progress-track" aria-hidden="true">
        <span className={navigation.state !== 'idle' ? 'progress active' : 'progress'} />
      </div>
      <Outlet context={user} />
    </div>
  )
}
