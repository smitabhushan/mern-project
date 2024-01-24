import express from'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from "./routes/userRoute.js";
import authRouter from './routes/auth.route.js'
dotenv.config();// we are using enviromental variable 
mongoose.connect(process.env.MONGO).then(()=>{
console.log("connected to mongodb");

}).catch((err)=>{
   console.log(err);
})

const server=express();
server.use(express.json());// this is going to allow json as input to our server in post req

server.listen(3000,()=>{
    console.log('server is running on port 3000');
});
server.use('/api/user',userRouter);// defining userRouter api route inside index.js
 server.use('/api/auth' ,authRouter);

 //creating middleware to handle error of api routes so that we cannot have to write try and catch each and everytime separately to handle error in api route.
 server.use((err,req,res,next)=>{ //next parameter is used to go to next middleware
  const statusCode=err.statusCode || 500;
  const message=err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success:false,
    statusCode,
    message,
  });
 });
 