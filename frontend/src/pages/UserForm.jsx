import { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import axiosClient from '../axios-client'
import { StateContext } from '../context/ContextProvider'

const UserForm = () => {
  const { setNotification } = useContext(StateContext)
  const navigate = useNavigate()
  const { id } = useParams()
  const [user, setUser] = useState({
    id: null,
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  })
  const [errors, setErrors] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (id) {
      setLoading(true)

      axiosClient
        .get(`/users/${id}`)
        .then(({ data }) => {
          setLoading(false)
          setUser(data.data)
        })
        .catch((err) => {
          const { response } = err
          if (response && response.status === 422) {
            console.warn(response.data.errors)
            setErrors(response.data.errors)
          }
          setLoading(false)
        })
    }
  }, [id])

  const onSubmit = (e) => {
    e.preventDefault()

    setErrors(null)

    if (user.id) {
      axiosClient
        .put(`/users/${user.id}`, user)
        .then(() => {
          setNotification('User was successfully updated!')
          navigate('/users')
        })
        .catch((err) => {
          const response = err.response
          if (response && response.status === 422) {
            setErrors(response.data.errors)
          }
        })
    } else {
      axiosClient
        .post('/users', user)
        .then(() => {
          setNotification('User was successfully created!')
          navigate('/users')
        })
        .catch((err) => {
          const response = err.response
          if (response && response.status === 422) {
            setErrors(response.data.errors)
          }
        })
    }
  }

  return (
    <>
      <h1>{id && user.name ? 'Edit User: ' + user.name : 'New User'}</h1>
      <div className='card animated fadeInDown'>
        {loading && <div className='text-center'>Loading...</div>}
        {errors && (
          <div className='alert'>
            {Object.keys(errors).map((key) => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        )}
        {!loading && (
          <form onSubmit={onSubmit}>
            <input
              value={user.name}
              onChange={(ev) =>
                setUser({ ...user, name: ev.target.value })}
              placeholder='Name'
            />
            <input
              value={user.email}
              onChange={(ev) =>
                setUser({ ...user, email: ev.target.value })}
              placeholder='Email'
            />
            <input
              type='password'
              onChange={(ev) =>
                setUser({ ...user, password: ev.target.value })}
              placeholder='Password'
            />
            <input
              type='password'
              onChange={(ev) =>
                setUser({
                  ...user,
                  password_confirmation: ev.target.value
                })}
              placeholder='Password Confirmation'
            />
            <button className='btn'>Save</button>
          </form>
        )}
      </div>
    </>
  )
}

export default UserForm
