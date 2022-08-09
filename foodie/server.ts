import express from 'express';
import cookieParser from 'cookie-parser';
import mongoose from "mongoose";
import dotenv from 'dotenv'
import productModel from './model/productModel'
const port: number | string = process.env.PORT || 3010;
require('dotenv').config()

const app = express();
app.use(cookieParser())
app.use(express.json());
app.use(express.static('public'))

const mongodb_uri = process.env.MONGODB_URI;
mongoose.connect(mongodb_uri).then (() => {console.log('connected to DB');
    }).catch(err =>{
        console.log('At mongoose.connect:')
        console.error(err.message);
        })


import uid,{randomNumber} from './control/helpers'
console.log(uid());

import itemsRouter from './routes/itemsRouter';
app.use('/items',itemsRouter);

import usersRoute from "./routes/userRoute";
app.use("/users", usersRoute)


import clientsRouter from './routes/clientsRouter';
app.use('/clients',clientsRouter);

import productRouter from './routes/productRouter';
app.use('/products', productRouter)

import insertRouter from './routes/insertRouter';
app.use('/insert', insertRouter)


const pizza=  new productModel({title: "Pizza", ownerId: "12345", price: 89})
pizza.save()
const Burger=  new productModel({title: "Burger", ownerId: "123456", price: 75})
Burger.save()

const Milky=  new productModel({title: "Milky", ownerId: "123458", price: 38})
Milky.save()

const Pasta=  new productModel({title: "Pasta", ownerId: "123450", price: 64})
Pasta.save()

const Kinder=  new productModel({title: "Kinder", ownerId: "123452", price: 24})
Kinder.save()





app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );