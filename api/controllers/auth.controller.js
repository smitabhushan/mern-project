import User from "../models/userModel.js";
import bcryptjs from 'bcryptjs';// password hash krne ke liye bcryptjs install krnge
export const signup=async (req,res)=>{
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
   res.status(500).json(error.message);
  }
  
}