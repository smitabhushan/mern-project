import React from 'react'
import {FaSearch} from 'react-icons/fa';
import { Link } from 'react-router-dom';
const Header = () => {
  return (
    <>
    
    <header className= ' bg-stone-700 shadow-md'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'> 
        <Link to='/'>
         <h1 className='font-bold text-sm sm:text-2xl  flex flex-wrap'>
            <span className='text-orange-700'>MagicRocks</span>
            <span className='text-white'>.com</span>
         </h1>
         </Link> 
         <form className='bg-white p-3 rounded-full flex items-center'>
            <input type='text' placeholder='Search...' className='bg-transparent text-black focus:outline-none w-24 sm:w-64'/>
             <FaSearch className='text-stone-800'/>
         </form>
         <ul className='flex gap-4'>
           <Link to='/home'><li className='text-white font-semibold hidden sm:inline hover:cursor-pointer'>Home</li></Link> 
            <Link to='/about'><li className='text-white font-semibold hidden sm:inline hover:cursor-pointer'>About</li></Link>
            <Link to='/sign-in'><li className='text-white font-semibold  hover:cursor-pointer'>
             {" "}   
            Sign in
            </li>
            </Link>
         </ul>
      </div> 
    </header>
    </>
  )
}

export default Header
