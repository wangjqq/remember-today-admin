import { Navigate } from 'react-router-dom'
import { lazy } from 'react'

const routerItems = [
  {
    path: '/',
    element: <Navigate to="/Home" />,
  },
  {
    path: '/Login',
    Component: lazy(() => import('@/view/Login')),
  },
  {
    path: '/Home',
    Component: lazy(() => import('@/view/Home')),
  },
  {
    path: '/SystemLog',
    Component: lazy(() => import('@/view/System/SystemLog')),
  },
  {
    path: '/SystemOverview',
    Component: lazy(() => import('@/view/System/SystemOverview')),
  },
]

export default routerItems
