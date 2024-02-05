// hum api routes alag ALAG file mein banaynge , bas api route ko define kr denge index.js ke andar
import express from 'express';
import { test, updateUser } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
const router=express.Router();


/*router.get('/',(req,res)=>{
    res.send("yes , it is me")
});*/
router.get('/test' , test)
//api route for update
router.post('/update/:id' ,verifyToken, updateUser);
export default router;

