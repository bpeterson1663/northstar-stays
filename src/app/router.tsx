import { createBrowserRouter } from 'react-router-dom'

import { Layout } from './Layout.tsx'
import { Home } from '../pages/Home.tsx'
import { StayDetailPage } from '../pages/StayDetailPage.tsx'
import { CheckoutPage } from '../pages/CheckoutPage.tsx'

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
      {
        path: 'stays/:id/checkout',
        element: <CheckoutPage />,
      }
    ],
  },
])
