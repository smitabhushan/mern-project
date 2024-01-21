import express from'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();// we are using enviromental variable 
mongoose.connect(process.env.MONGO).then(()=>{
console.log("connected to mongodb");

}).catch((err)=>{
   console.log(err);
})

const server=express();

server.listen(3000,()=>{
    console.log('server is running on port 3000');
})