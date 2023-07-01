import { useRef, useContext } from 'react'
import { Link } from 'react-router-dom'

import axiosClient from '../axios-client'
import { StateContext } from '../context/ContextProvider'

const Signup = () => {
  const nameRef = useRef(null)
  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  const passwordConfirmRef = useRef(null)

  const { setUser, setToken } = useContext(StateContext)

  const onSubmit = (e) => {
    e.preventDefault()

    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmRef.current.value
    }

    console.log(payload)

    axiosClient
      .post('/signup', payload)
      .then((data) => {
        setUser(data.user)
        setToken(data.token)
      })
      .catch((err) => {
        const response = err.response
        if (response && response.status === 422) {
          console.log(response.data.error)
        }
      })
  }

  return (
    <form onSubmit={onSubmit} className='animated fadeInDown'>
      <h1 className='title'>Signup for free</h1>
      <input ref={nameRef} type='text' placeholder='Full Name' />
      <input ref={emailRef} type='email' placeholder='Email Address' />
      <input ref={passwordRef} type='password' placeholder='Password' />
      <input
        ref={passwordConfirmRef}
        type='password'
        placeholder='Password Confirmation'
      />
      <button className='btn btn-block'>Register</button>
      <p className='message'>
        Already Registered? <Link to='/login'>Sign in</Link>{' '}
      </p>
    </form>
  )
}

export default Signup
