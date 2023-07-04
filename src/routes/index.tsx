import { Navigate } from 'react-router-dom'
import Login from '@/view/Login'
import Index from '@/view/Index'

const routes = [
  {
    path: '/',
    element: <Navigate to="/Index" />,
  },
  {
    path: '/Index',
    element: <Index />,
  },
  {
    path: '/Login',
    element: <Login />,
  },
]

export default routes
