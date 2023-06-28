import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { StateContext } from '../context/ContextProvider'

const GuestLayout = () => {
  const { token } = useContext(StateContext)

  if (token) {
    return <Navigate to='/users' />
  }

  return (
    <div>
      <h2>Only for guest layout</h2>
      <Outlet />
    </div>
  )
}

export default GuestLayout
