import User from "../models/userModel.js";
import bcryptjs from 'bcryptjs';// password hash krne ke liye bcryptjs install krnge
import { errorHandler } from "../utils/error.js";
export const signup=async (req,res,next)=>{
  console.log(req.body);
  const {username,email,password}=req.body;
  const hashedPassword=bcryptjs.hashSync(password,10);// so password is encrpted using bcryptjs function.
  // now we have to save it in our database using our model , here User is our model.
  const newUser=new User({username,email,password:hashedPassword});// created new user
  try{
    await newUser.save();// saving it to our database
    res.status(201).json("User  created successfully and data has been saved to our db");
}
  catch(error){
   next(error);// here we call 'next' to use the middleware defined in index.js to handle the error and pass the error in it.

  }
  
}