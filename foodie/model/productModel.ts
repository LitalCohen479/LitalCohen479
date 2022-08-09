import mongoose from "mongoose";
import Joi from "joi";

const productSchema = new mongoose.Schema({
    title:{ type:String, require: true },
    price:{ type:Number, required:true },
    ownerId:{ type:String, required:false},
    count: {type:Number},
    description: { type:String},
    image:  { type:String}
});


const productModel = mongoose.model("productModel", productSchema);


export default productModel;


export const userValidation = Joi.object({
    email:Joi.string().email().required(),
    password:Joi.string().required()
})