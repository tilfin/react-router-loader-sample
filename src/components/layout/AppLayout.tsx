import { NavLink, Outlet, useNavigation, useRevalidator } from 'react-router-dom'

export function AppLayout() {
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
          <NavLink to="/users/new">Create user</NavLink>
        </nav>
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
      <Outlet />
    </div>
  )
}
