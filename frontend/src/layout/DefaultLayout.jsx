import { useContext } from 'react'
import { Navigate, Outlet, Link } from 'react-router-dom'
import { StateContext } from '../context/ContextProvider'

const DefaultLayout = () => {
  const { user, token } = useContext(StateContext)

  if (!token) {
    return <Navigate to='/login' />
  }

  const onLogout = (e) => {
    e.preventDefault()
  }

  return (
    <div id='defaultLayout'>
      <aside>
        <Link to='/dashboard'>Dashboard</Link>
        <Link to='/users'>Users</Link>
      </aside>
      <div className='content'>
        <header>
          <div>Header</div>
          <div>
            {user.name}
            <a href='#' className='btn-logout' onClick={onLogout}>
              Logout
            </a>
          </div>
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default DefaultLayout
