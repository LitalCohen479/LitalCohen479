import express from "express";
import {getMyProducts, addFoodCalorie} from "../control/productsCtrl";
import jwt from 'jwt-simple';
const router = express.Router();

router
.get('/get-my-products', getMyProducts)
.post('/get-the-food', addFoodCalorie)
//middleware 

function isAdmin(req, res, next){
   
 const {user} = req.cookies;
 if(!user) throw new Error ("no cookie is found on path");

 const secret = process.env.JWT_SECRET;
 let decodedCookie= jwt.decode(user, secret)
 console.log(decodedCookie)

 const { role }= decodedCookie;

 if(role !== 'admin'){
    res.status(403).send({error:'Not authorized'})
} else{
    next()
}
}


export default router;