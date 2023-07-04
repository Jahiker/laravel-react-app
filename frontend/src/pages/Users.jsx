import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import axiosClient from '../axios-client'

const Users = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getUsers()
  }, [])

  const getUsers = () => {
    setLoading(true)

    axiosClient
      .get('/users')
      .then(({ data }) => {
        console.log(data)
        setLoading(false)
        setUsers(data.data)
      })
      .catch((error) => {
        console.error(error)
        setLoading(false)
      })
  }

  return (
    <div>
      <div>
        <h1>Users</h1>
        <Link to='/users'>Create user</Link>
      </div>
    </div>
  )
}

export default Users
