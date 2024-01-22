import express from'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from "./routes/userRoute.js";

dotenv.config();// we are using enviromental variable 
mongoose.connect(process.env.MONGO).then(()=>{
console.log("connected to mongodb");

}).catch((err)=>{
   console.log(err);
})

const server=express();

server.listen(3000,()=>{
    console.log('server is running on port 3000');
});

server.use('/api/user',userRouter); // defining userRouter api route inside index.js