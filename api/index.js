import express from'express'
const server=express();

server.listen(3000,()=>{
    console.log('server is running on port 3000');
})