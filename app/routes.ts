import { index, route, type RouteConfig } from '@react-router/dev/routes'

export default [
  route('login', 'routes/login.tsx'),
  route('/', 'routes/app-layout.tsx', [
    index('routes/dashboard.tsx'),
    route('users', 'routes/users-list.tsx'),
    route('users/new', 'routes/users-new.tsx'),
    route('users/:userId', 'routes/user-detail.tsx'),
    route('logout', 'routes/logout.ts'),
  ]),
] satisfies RouteConfig
