import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { StateContext } from '../context/ContextProvider'

const GuestLayout = () => {
  const { token } = useContext(StateContext)

  if (token) {
    return <Navigate to='/users' />
  }

  return (
    <div className='login-signup-form'>
      <div className='form'>
        <Outlet />
      </div>
    </div>
  )
}

export default GuestLayout
