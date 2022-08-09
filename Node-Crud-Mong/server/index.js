const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app= express();
 



const FoodModel = require('./models/Food');
const { Connection } = require('mongoose');



app.use(express.json())
app.use(cors());

mongoose.connect('mongodb+srv://Lital:O7uzorYhU9dO9QnZ@cluster0.kuj1lnc.mongodb.net/food?retryWrites=true&w=majority'
, {useNewUrlParser:true,}
).then (() => {console.log('connected to DB');
    }).catch(err =>{
        console.log('At mongoose.connect:')
        console.error(err.message);
        });

app.post('/insert', async (req, res)=>{

    const foodName = req.body.foodName;
    const days = req.body.days;
    const calories = req.body.calories;
const food = new FoodModel({foodName:foodName, daysSinceIAte:days, calories:calories});
try {
    await food.save();
    res.send("inserted data");
} catch (error) {
    console.log(error)
}
});

app.get('/read', async (req, res)=>{
FoodModel.find({}, (err, result)=>{
    if(err){
        res.send(err)
    }
    res.send(result)
})

});

app.put('/update', async (req, res)=>{
console.log('put')
    const newFoodName = req.body.newFoodName;
    const id = req.body.id;
    if(!newFoodName) throw new Error ('no new food name')
try {
   await FoodModel.findById(id, (err, updatedFood)=>{
        updatedFood.foodName=newFoodName;
        console.log(newFoodName)
        updatedFood.save();
        res.send("update");


    });
} catch (error) {
    console.log(error)
}
});

app.delete('/delete/:id', async (req, res)=>{
    const id= req.params.id;
    await FoodModel.findByIdAndRemove(id).exec();
    res.send('deleted')
})


app.get('/calories:calories', async (req, res)=>{ 

const calories = req.params.calories;
console.log('callll', calories)
const funC = await function getTotalCalories(){

    const totalCalories = 1200;
    console.log('totalCalories',totalCalories)
    
    let remainCalories = totalCalories-calories;
    console.log('remainCalories',remainCalories, 'calories',calories)
    };


 res.send(calories)
});


 




app.listen(3003, ()=>{
    console.log('Server running on port 3003')
})