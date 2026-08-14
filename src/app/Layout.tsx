import { Link, Outlet } from 'react-router-dom'

import './Layout.css'

export function Layout() {
  return (
    <>
      <header className="site-header">
        <Link to="/" className="site-header__brand">
          Northstar Stays
        </Link>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  )
}
