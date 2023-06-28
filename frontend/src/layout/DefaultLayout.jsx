import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { StateContext } from '../context/ContextProvider'

const DefaultLayout = () => {
  const { user, token } = useContext(StateContext)

  if (!token) {
    return <Navigate to='/login' />
  }

  return (
    <div>
      <h2>Default Layout</h2>
      <Outlet />
    </div>
  )
}

export default DefaultLayout
