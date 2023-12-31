/* eslint-disable react-refresh/only-export-components */
import { Suspense, lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'

const GuestLayout = lazy(() => import('./layout/GuestLayout'))
const DefaultLayout = lazy(() => import('./layout/DefaultLayout'))

const Login = lazy(() => import('./pages/Login'))
const Signup = lazy(() => import('./pages/Signup'))
const Users = lazy(() => import('./pages/Users'))
const NotFound = lazy(() => import('./pages/NotFound'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const UserForm = lazy(() => import('./pages/UserForm'))

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<h2>Loading...</h2>}>
        <GuestLayout />
      </Suspense>
    ),
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Login /> },
      { path: '/login', element: <Login /> },
      { path: '/signup', element: <Signup /> }
    ]
  },
  {
    path: '/',
    element: (
      <Suspense fallback={<h2>Loading...</h2>}>
        <DefaultLayout />
      </Suspense>
    ),
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Users /> },
      { path: '/dashboard', element: <Dashboard /> },
      { path: '/users', element: <Users /> },
      { path: '/users/new', element: <UserForm key='userCreate' /> },
      { path: '/users/:id', element: <UserForm key='userUpdate' /> }
    ]
  }
])
