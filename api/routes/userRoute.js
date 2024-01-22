// hum api routes alag ALAG file mein banaynge , bas api route ko define kr denge index.js ke andar
import express from 'express';
import { test } from '../controllers/user.controller.js';
const router=express.Router();


/*router.get('/',(req,res)=>{
    res.send("yes , it is me")
});*/
router.get('/test' , test)
export default router;

