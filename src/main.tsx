import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter, redirect } from 'react-router-dom'
import { AppLayout } from './components/layout/AppLayout'
import { RouteError } from './components/layout/RouteError'
import { requireSession, signOut } from './auth/auth'
import { DashboardPage, dashboardLoader } from './routes/dashboard'
import { LoginPage, loginAction, loginLoader } from './routes/login'
import {
  UserDetailPage,
  UserFormPage,
  UserListPage,
  createUserLoader,
  userAction,
  userLoader,
  usersAction,
  usersLoader,
} from './routes/users'
import './styles.css'

const router = createBrowserRouter([
  { path: '/login', element: <LoginPage />, loader: loginLoader, action: loginAction },
  {
    id: 'app',
    path: '/',
    element: <AppLayout />,
    errorElement: <RouteError />,
    loader: ({ request }) => ({ user: requireSession(request).user }),
    children: [
      { index: true, element: <DashboardPage />, loader: dashboardLoader },
      {
        path: 'users',
        children: [
          { index: true, element: <UserListPage />, loader: usersLoader, action: usersAction },
          { path: 'new', element: <UserFormPage />, loader: createUserLoader, action: usersAction },
          { path: ':userId', element: <UserDetailPage />, loader: userLoader, action: userAction },
        ],
      },
      { path: 'logout', action: () => { signOut(); return redirect('/login') } },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
