import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { AppLayout } from './components/layout/AppLayout'
import { RouteError } from './components/layout/RouteError'
import { DashboardPage, dashboardLoader } from './routes/dashboard'
import {
  UserDetailPage,
  UserFormPage,
  UserListPage,
  userAction,
  userLoader,
  usersAction,
  usersLoader,
} from './routes/users'
import './styles.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <RouteError />,
    children: [
      { index: true, element: <DashboardPage />, loader: dashboardLoader },
      {
        path: 'users',
        children: [
          { index: true, element: <UserListPage />, loader: usersLoader, action: usersAction },
          { path: 'new', element: <UserFormPage />, action: usersAction },
          { path: ':userId', element: <UserDetailPage />, loader: userLoader, action: userAction },
        ],
      },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
