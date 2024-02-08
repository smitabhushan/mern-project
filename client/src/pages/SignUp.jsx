import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import OAuth from '../component/OAuth';
const SignUp = () => {
  const [formData,setFormData]=useState({});
  const[error,setError]=useState(null);
  const[loading,setLoading]=useState(false);
 const navigate= useNavigate() ;//initialsation

  const handleChange=(e)=>{
    setFormData(
      {
        ...formData , 
        [e.target.id]: e.target.value ,
      }
    )
  }
// submitting form to the server using POST req using Fetch API
   const handleSubmit= async(e)=>{
   e.preventDefault();
try{
   setLoading(true);
   const res=await fetch('/api/auth/signup' , 
    {
      // Adding method type
      method: 'POST' ,
      headers:{
        'Content-Type' : 'application/json'
      },
       // Adding body or contents to send
       body:JSON.stringify(formData),
    });
    const data= await res.json();
   // check for error in response.
     if(data.success===false){
        setLoading(false);
         setError(data.message);
          return;
   }
   // for success
   
   setLoading(false);
   setError(null);
   navigate('/sign-in');// if signup successfully move to sign in page.
  }
  catch(error){
     setLoading(false);
     setError(error.message);
  }
   // console.log(data);
  
  };
  
  return (
    <div className='p-10 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form  onSubmit={handleSubmit} className='flex flex-col gap-4 '>
        <input type='text' placeholder='Username' className='border p-3 rounded-lg focus:outline-none ' id='username' onChange={handleChange}/>
        <input type='email' placeholder='Enter Your Email' className='border p-3 rounded-lg focus:outline-none' id='email' onChange={handleChange}/>
        <input type='password' placeholder='Password' className='border p-3 rounded-lg focus:outline-none' id='password' onChange={handleChange}/>
        <button disabled={loading} className='bg-orange-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
         {loading ? 'Loading...' :'Sign up' } 
        </button>
        <OAuth/>
      </form>
      <div className='flex gap-2 mt-5'>
        <p> Already registered?</p>
        <Link to={'/sign-in'}>
          <span className='text-blue-700'>Sign in</span>
        </Link>
      </div>
      {error && <h1 className='text-green-600 mt-5 '>{error}</h1>}
    </div>
  )
}

export default SignUp
