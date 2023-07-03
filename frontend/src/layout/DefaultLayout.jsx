import { useContext, useEffect } from 'react'
import { Navigate, Outlet, Link } from 'react-router-dom'
import { StateContext } from '../context/ContextProvider'
import axiosClient from '../axios-client'

const DefaultLayout = () => {
  const { user, setUser, token, setToken } = useContext(StateContext)

  if (!token) {
    return <Navigate to='/login' />
  }

  useEffect(() => {
    axiosClient.get('/user').then(({ data }) => {
      setUser(data)
    })
  }, [])

  const onLogout = (e) => {
    e.preventDefault()
    axiosClient.post('/logout').then(() => {
      setUser({})
      setToken(null)
    })
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
