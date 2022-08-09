const mongoose = require('mongoose');

const FoodSchema= new mongoose.Schema({
    foodName:{
type:String,
required:true,
    },
    daysSinceIAte:{
        type:Number,
        //changing it back to true makes update function not work
        required:false,
    },
    calories:{
        type:Number,
        required:true
    }
});

const Food = mongoose.model('Food', FoodSchema)
module.exports= Food;