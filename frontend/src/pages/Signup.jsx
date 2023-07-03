import { useRef, useContext, useState } from 'react'
import { Link } from 'react-router-dom'

import axiosClient from '../axios-client'
import { StateContext } from '../context/ContextProvider'

const Signup = () => {
  const nameRef = useRef(null)
  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  const passwordConfirmRef = useRef(null)

  const { setUser, setToken } = useContext(StateContext)
  const [errors, setErrors] = useState(null)

  const onSubmit = (e) => {
    e.preventDefault()

    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmRef.current.value
    }

    axiosClient
      .post('/signup', payload)
      .then(({ data }) => {
        setUser(data.user)
        setToken(data.token)
      })
      .catch((err) => {
        const { response } = err
        if (response && response.status === 422) {
          console.warn(response.data.errors)
          setErrors(response.data.errors)
        }
      })
  }

  return (
    <form onSubmit={onSubmit} className='animated fadeInDown'>
      <h1 className='title'>Signup for free</h1>
      {errors && (
        <div className='alert'>
          {Object.keys(errors).map((key) => (
            <p key={key}>{errors[key][0]}</p>
          ))}
        </div>
      )}
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
