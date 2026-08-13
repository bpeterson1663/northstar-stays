import { createBrowserRouter } from 'react-router-dom'

import { Home } from '../pages/Home.tsx'
import { StayDetailPage } from '../pages/StayDetailPage.tsx'
import { Layout } from './Layout.tsx'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'stays/:id',
        element: <StayDetailPage />,
      },
    ],
  },
])
