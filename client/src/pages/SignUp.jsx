import React from 'react'
import { Link } from 'react-router-dom'
const SignUp = () => {
  return (
    <div className='p-10 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form className='flex flex-col gap-4 '>
        <input type='text' placeholder='Username' className='border p-3 rounded-lg focus:outline-none ' id='username'/>
        <input type='email' placeholder='Enter Your Email' className='border p-3 rounded-lg focus:outline-none' id='email'/>
        <input type='password' placeholder='Password' className='border p-3 rounded-lg focus:outline-none' id='password'/>
        <button className='bg-orange-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>Sign up</button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p> Already registered?</p>
        <Link to='/sign-in'>
          <span className='text-orange-500 '>Sign in</span>
        </Link>
      </div>
    </div>
  )
}

export default SignUp
