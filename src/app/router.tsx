import { createBrowserRouter } from 'react-router-dom'
import { Layout } from './Layout.tsx'
import { Home } from '../pages/Home.tsx'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
])
