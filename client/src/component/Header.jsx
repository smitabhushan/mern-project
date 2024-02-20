import React, { useEffect, useState } from 'react'
import {FaSearch} from 'react-icons/fa';
import { Link ,useNavigate } from 'react-router-dom';
import {useSelector} from 'react-redux';
const Header = () => {
  const navigate=useNavigate();
  const[searchTerm,setSearchTerm]=useState('');
  const {currentUser}=useSelector(state=>state.user)
const handleSubmit=(e)=>{
  e.preventDefault();
  const urlParams=new URLSearchParams(window.location.search); //using  javascript constructor (URLSearchParams)
   urlParams.set('searchTerm' ,searchTerm);
   const searchQuery=urlParams.toString();
   navigate(`/search?${searchQuery}`);
}
useEffect(()=>{
  const urlParams=new URLSearchParams(location.search);
  const searchTermFromUrl=urlParams.get('searchTerm');
   if(searchTermFromUrl){
    setSearchTerm(searchTermFromUrl);
   }
},[location.search])

  return (
    <>
    <header className= ' bg-stone-700 shadow-md'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'> 
        <Link to='/'>
         <h1 className='font-bold text-sm sm:text-2xl  flex flex-wrap hover:opacity-85'>
            <span className='text-orange-700 '>MagicRocks</span>
            <span className='text-white '>.com</span>
         </h1>
         </Link> 
         <form onSubmit={handleSubmit} className='bg-white p-3 rounded-full flex items-center'>
            <input type='text' placeholder='Search...' className='bg-transparent text-black focus:outline-none w-24 sm:w-64'
              value={searchTerm}
              onChange={(e)=>setSearchTerm(e.target.value)}
            />
            <button>
            <FaSearch className='text-stone-800'/>
            </button>
            
         </form>
         <ul className='flex gap-4'>
           <Link to='/home'><li className='text-white  hidden sm:inline hover:cursor-pointer'>Home</li></Link> 
            <Link to='/about'><li className='text-white  hidden sm:inline hover:cursor-pointer'>About</li></Link>
            
            <Link to='/profile'>
             {currentUser ? (
             <img className='rounded-full h-7 w-7 object-cover' src={currentUser.avatar} alt='profile' referrerpolicy="no-referrer" />
             )  :(
              <li className='text-white  hover:cursor-pointer'> Sign in</li>
             )}
             </Link>
             {/*<Link to='/profile'>
             {currentUser ? (
            <img className='rounded-full h-7 w-7 object-cover' src={currentUser.avatar || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} alt='profile' />
           ) : (
           <li className='text-white hover:cursor-pointer'>Sign in</li>
  )}
</Link>*/}
         </ul>
      </div> 
    </header>
    </>
  )
}

export default Header
