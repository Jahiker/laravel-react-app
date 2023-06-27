import React from 'react'
import { Outlet } from 'react-router-dom'

const GuestLayout = () => {
  return (
    <div>
      <h2>Only for guest layout</h2>
      <Outlet />
    </div>
  )
}

export default GuestLayout
