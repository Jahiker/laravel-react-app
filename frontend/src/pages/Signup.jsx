import { Link } from 'react-router-dom'

const Signup = () => {
  const onSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <form onSubmit={onSubmit} className='animated fadeInDown'>
      <h1 className='title'>Signup for free</h1>
      <input type='text' placeholder='Full Name' />
      <input type='email' placeholder='Email Address' />
      <input type='password' placeholder='Password' />
      <input type='password' placeholder='Password Confirmation' />
      <button className='btn btn-block'>Register</button>
      <p className='message'>Already Registered? <Link to='/login'>Sign in</Link> </p>
    </form>
  )
}

export default Signup
