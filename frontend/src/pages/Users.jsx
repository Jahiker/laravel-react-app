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
        setLoading(false)
        setUsers(data.data)
      })
      .catch((error) => {
        console.error(error)
        setLoading(false)
      })
  }

  const onDelete = (user) => {
    if (!window.confirm('Are you sure you want to delete this user?')) { return }

    axiosClient
      .delete(`/users/${user.id}`)
      .then(({ data }) => {
        console.log(data)
        getUsers()
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <h1>Users</h1>
        <Link to='/users/new' className='btn-add'>
          Create user
        </Link>
      </div>
      <div className='card animated fadeInDown'>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Create Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          {loading
            ? (
              <tbody>
                <tr>
                  <td colSpan={5} className='text-center'>Loading...</td>
                </tr>
              </tbody>
              )
            : (
              <tbody>
                {users.map((u) => (
                  <tr key={u.id}>
                    <td>{u.id}</td>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td>{u.created_at}</td>
                    <td>
                      <Link
                        to={`/users/${u.id}`}
                        className='btn-edit'
                        style={{ marginRight: '5px' }}
                      >
                        Edit
                      </Link>
                      <button
                        onClick={(e) => onDelete(u)}
                        className='btn-delete'
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              )}
        </table>
      </div>
    </div>
  )
}

export default Users
