import React from 'react'
import { useSelector } from 'react-redux';
const Profile = () => {
  const {currentUser} =useSelector((state)=>state.user)
  return (
    <div  className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
    <form className='flex flex-col gap-4'>
      <img  className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2' src={currentUser.avatar} alt='profile'/>
      <input type='text' placeholder='username' id='username'className='border p-3 rounded-lg'/>
      
      <input type='email' placeholder='Email' id='email' className='border p-3 rounded-lg'/>
      <input type='password' placeholder='password'  id='password' className='border p-3 rounded-lg'/>
      <button className='bg-green-500 rounded-lg p-3 hover:opacity-95 disabled:opacity-80'>UPDATE</button>
    </form>
    <div className='flex justify-between mt-5'>
      <span className='text-red-500 cursor pointer'>Delete account</span>
      <span className='text-red-500 cursor pointer'>Sign out</span>
    </div>
    </div>
  )
}

export default Profile
