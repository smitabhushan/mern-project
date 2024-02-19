import React, { useState,useEffect } from 'react'
import {getDownloadURL,getStorage,ref, uploadBytesResumable} from 'firebase/storage';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { updateUserStart,updateUserSuccess,updateUserFailure, deleteUserFailure, deleteUserStart, deleteUserSuccess, signOutUserStart, signOutUserFailure, SignOutUserSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { app } from '../Firebase';
import { Link } from 'react-router-dom';

const Profile = () => {
  const fileRef=useRef(null); // create a reference

  const {currentUser,loading,error} =useSelector((state)=>state.user)
  
  const [file,setFile]=useState(null);
  const[filePerc,setFilePerc]=useState(0);
  const[formData,setFormData]=useState({});
  const[updateSuccess,setUpdateSuccess]=useState(false);
  const[showListingsError,setShowListingsError]=useState(false)
  const[userListings,setUserListings]=useState([]);
  const[fileUploadError,setFileUploadError]=useState(false);
   //console.log(formData);
  const dispatch=useDispatch();
  useEffect(()=>{
    if(file){
      handleFileUpload(file);
    }
  },[file]);

  const handleFileUpload=(file)=>{
    const storage=getStorage(app);
    const fileName= new Date().getTime() +file.name;
    const storageRef=ref(storage,fileName);
    // creating upload task
    const uploadTask=uploadBytesResumable(storageRef,file)
    
    uploadTask.on('state_changed' ,
    // state_changed , going to track the state change
     (snapshot)=>{
      //percentage of upload
      const progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
      //console.log('upload is' + progress + '%done')
      setFilePerc(Math.round(progress));
    },
    
    (error)=>{
     setFileUploadError(true);
    },
    // To get the file
    ()=>{
      getDownloadURL(uploadTask.snapshot.ref).then
      //get download url if upload is successful
      ((downloadURL)=>
        setFormData({...formData,avatar:downloadURL})
    );
    }
    );
  };
  
  const handleChange=(e)=>{
    setFormData({...formData ,[ e.target.id] :e.target.value});
  };
  const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
       dispatch(updateUserStart());
       const res=await fetch(`/api/user/update/${currentUser._id}`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify(formData),

       });
      const data=await res.json() ;
      // if fails
      if(data.success===false){
        dispatch(updateUserFailure(data.message));
        return;
      }
      // if pass
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    }
    catch(error){
       dispatch(updateUserFailure(error.message));
    }
  }
  const handleDeleteUser= async()=>{
    try{
     dispatch(deleteUserStart());
     const res=await fetch(`/api/user/delete/${currentUser._id}`,{
      method:'DELETE',

    });
    const data=await res.json();
    if(data.success===false){
      dispatch(deleteUserFailure(data.message));
      return;
    }
    dispatch(deleteUserSuccess(data));
  }
  
    catch(error){
      dispatch(deleteUserFailure(error.message));
      
  }
  }
  const handleSignOut=async()=>{
    try{
      dispatch(signOutUserStart());
      const res=await fetch('/api/auth/signout');
      const data= await res.json();
      if(data.success===false){
        dispatch(signOutUserFailure(data.message))
        return;
      }
      dispatch(SignOutUserSuccess(data));
    }
    catch(error){
     dispatch(signOutUserFailure(error.message));
    }
  }

  const handleShowListings=async()=>{
    try{
      setShowListingsError(false);
       const res=await fetch(`/api/user/listings/${currentUser._id}`);
       const data= await res.json();
       if(data.success===false){
        setShowListingsError(true);
        return;
       }
      setUserListings(data);
    }
    catch(error){
      setShowListingsError(true);
    }
  }
  const handleListingDelete=async(listingId)=>{
   try{ 
    const res= await fetch(`/api/listing/delete/${listingId}`,{
      method:'DELETE',
    });
    const data=await res.json();
    if(data.success===false){
      console.log(data.message);
      return;
    }
    setUserListings((prev)=>
    prev.filter((listing)=>listing._id!== listingId));
  }
  catch(error){
    console.log(error.message);
  }
}
  return (
    <div  className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-4'>Profile</h1>
    <form  onSubmit={handleSubmit}className='flex flex-col gap-4'>
      <input  onChange={(e)=>setFile(e.target.files[0])}type='file' ref={fileRef} hidden accept='image/*'/>
      <img onClick={()=>fileRef.current.click()} src={formData.avatar || currentUser.avatar}  alt='profile'  referrerpolicy="no-referrer" className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'  />
      
      <p className='text-sm self-center'>
      {fileUploadError? 
      ( <span className='text-slate-700'>Error Image upload</span> )
       :
       filePerc >0 && filePerc < 100  ? 
       ( 
       <span className='text-green-700'>{`Uploading ${filePerc}%`}</span> 
       )
       :
       filePerc ===100 ? 
       (
       <span className='text-green-700'>Image Successfully Uploaded!</span> 
       )
        : (
         " "
        )
      }
      </p>
      <input type='text' placeholder='username' defaultValue={currentUser.username} id='username'className='border p-3 rounded-lg focus:outline-none' onChange={handleChange}/>
      <input type='email' placeholder='Email' defaultValue={currentUser.email} id='email' className='border p-3 rounded-lg focus:outline-none' onChange={handleChange}/>
      <input type='password' placeholder='password'  id='password' className='border p-3 rounded-lg focus:outline-none' onChange={handleChange}/>
      <button  disabled={loading}className='bg-green-600 rounded-lg p-3 uppercase text-white hover:opacity-95 disabled:opacity-80'>
       {loading ? 'Loading...' : 'Update'}
        </button>
        <Link  className='bg-stone-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95' to={'/create-listing'}>
          Create Listing
        </Link>
    </form>
      <div className='flex justify-between mt-5'>
        <span  onClick={handleDeleteUser}className='text-red-700 cursor-pointer '>Delete account ?</span>
         <span onClick={handleSignOut} className='text-red-700 cursor-pointer'>Sign out</span>
      </div>
      <p className='text-red-700 mt-3'>{error ? error : ''}</p>
      <p className='text-green-600 mt-3'>{updateSuccess ? 'User is updated successfully!' : ''}</p>
     <button onClick={handleShowListings} className='text-green-700 w-full'>Show Listings</button>
     <p className='text-red-700 mt-5'>{showListingsError ? 'Error showing Listings' : ''}</p>
    {userListings && userListings.length > 0 && 
      <div className='flex flex-col gap-4'>
        <h1 className='text-center mt-7 text-2xl font-semibold'>Your Listings</h1>
     {userListings.map((listing)=>(
        <div key={listing._id} className=' border rounded-lg p-3 flex justify-between items-center gap-4'>
          <Link to={`/listing/${listing._id}`}>
            <img src={listing.imageUrls[0]} alt='listing cover' 
            className='h-16 w-16 object-contain '/>
            </Link>
            <Link className='flex-1' to={`/listing/${listing._id}`}>
              <p className='text-stone-700 font-semibold hover:underline truncate'>{listing.name}</p>
            </Link>
            <div className='flex flex-col items-center '>
              <button onClick={()=>handleListingDelete(listing._id)}className='text-red-700 uppercase'>
                Delete
              </button>
              <Link to={`/update-listing/${listing._id}`}>
              <button className='text-green-700 uppercase'>
                Edit
              </button>
              </Link>
            </div>
        </div>
        
      ))}
      </div>}
    </div>
  )
}

export default Profile
