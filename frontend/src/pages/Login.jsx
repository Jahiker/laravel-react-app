import { useRef, useState, useContext } from 'react'
import { Link } from 'react-router-dom'

import axiosClient from '../axios-client'
import { StateContext } from '../context/ContextProvider'

const Login = () => {
  const emailRef = useRef(null)
  const passwordRef = useRef(null)

  const { setToken, setUser } = useContext(StateContext)

  const [errors, setErrors] = useState(null)

  const onSubmit = (e) => {
    e.preventDefault()

    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value
    }

    setErrors(null)

    axiosClient
      .post('/login', payload)
      .then(({ data }) => {
        setUser(data.user)
        setToken(data.token)
      })
      .catch((err) => {
        const { response } = err
        if (response && response.status === 422) {
          console.warn(response.data.errors)
          setErrors(response.data.errors)
        } else {
          setErrors({
            email: [response.data.message]
          })
        }
      })
  }

  return (
    <form onSubmit={onSubmit} className='animated fadeInDown'>
      <h1 className='title'>Login into your account</h1>
      {errors && (
        <div className='alert'>
          {Object.keys(errors).map((key) => (
            <p key={key}>{errors[key][0]}</p>
          ))}
        </div>
      )}
      <input ref={emailRef} autoComplete='email' type='email' placeholder='Email' />
      <input ref={passwordRef} type='password' placeholder='Password' />
      <button className='btn btn-block'>Login</button>
      <p className='message'>
        Not Registered? <Link to='/signup'>Create an account</Link>{' '}
      </p>
    </form>
  )
}

export default Login
