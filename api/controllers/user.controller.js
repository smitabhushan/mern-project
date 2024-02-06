import bcryptjs from 'bcryptjs'
import User from '../models/userModel.js';
import { errorHandler } from '../utils/error.js';
export const test=(req,res)=>{
    res.json({
      messagae:"Hello World"
    });
};
// we need to first verify whether the user is authenticated to our website if yes , then we will perform update functionality
export const updateUser=async(req,res,next)=>{
  if(req.user.id !== req.params.id) 
   return next(errorHandler(401 ,'you can only update your own account!'))
   try{
    if(req.body.password){//hash the new password before updating it in our database
       req.body.password=bcryptjs.hashSync(req.body.password,10)
    }
     const updatedUser=await User.findByIdAndUpdate(req.params.id,{
      // set method is going to check if the data is being changed is going to change otherwise its going to ignore the data
     $set:{
      username:req.body.username,
      email:req.body.email,
      password:req.body.password,
      avatar:req.body.avatar
     }
    } , {new:true}) // (new: true) is goin to return and save this updated user with the new information
    const {password,...rest}=updatedUser._doc
    res.status(200).json(rest);
  }
   catch(error){
    next(error)
   }
};
export const deleteUser=async(req,res,next)=>{
  if(req.user.id !== req.params.id) 
   return next(errorHandler(401 ,'you can only delete your own account!'));
  try{
     await User.findByIdAndDelete(req.params.id);
     res.clearCookie('access_token');
     res.status(200).json('User has been deleted');
  }
  catch(error){
    next(error);
  }
};