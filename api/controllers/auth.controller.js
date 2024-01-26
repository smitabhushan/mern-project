import User from "../models/userModel.js";
import bcryptjs from 'bcryptjs';// password hash krne ke liye bcryptjs install krnge
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';

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
  
};

export const signin=async(req,res,next)=>{
  const{email,password}=req.body;
  try{
    const validUser=await User.findOne({email});
    if(!validUser){
      return next(errorHandler(404,'User Not Found'));
    }
    const validPassword=bcryptjs.compareSync(password,validUser.password);
    if(!validPassword){
      return next(errorHandler(401,'Wrong Credential!'));
    }
  // using JWT to create web token for authentication process
  const token= jwt.sign({id:validUser._id }, process.env.JWT_SECRET) // created the token
   const {password:pass , ...rest }=validUser._doc; // destructing the password as pass and all other data in rest
  // now we want to save this token as our Cookie.
   res.cookie('User_token',token ,{httpOnly:true})
   .status(200)
   .json({rest}) // now we have a cookie inside our browser

  }
  catch(error){
    next(error);
  }
}