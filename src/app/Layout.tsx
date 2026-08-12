import { Outlet } from 'react-router-dom'

export function Layout() {
  return (
    <>
      <h1>Northstar Stays</h1>
      <nav>
        <button>Home</button>
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  )
}
