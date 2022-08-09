import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import AppBar from './AppBar';
import AppCounter from './AppCounter';
import './App.css';


function App() {
  
const [foodName, setFoodName] = useState("");
const [days, setDays] = useState(0);
const [newFoodName, setNewFoodName] = useState("");
const [ foodList, setFoodList] = useState([]);
const [calories, setCalories] = useState("");


useEffect(()=>{
Axios.get('http://localhost:3003/read').then((response)=>{
setFoodList(response.data)
})
}, [])

const addToList=()=>{
  console.log(foodName, days)

  Axios.post('http://localhost:3003/insert', {foodName: foodName, days: days, calories:calories})
};

const updateFood = (id)=>{
  Axios.put('http://localhost:3003/update', {id: id, newFoodName: newFoodName, calories:calories})
}

const deleteFood = (id)=>{
  Axios.delete(`http://localhost:3003/delete/${id}`)
}


const total= foodList.map((val)=>val.calories).reduce((acc, value)=>acc + +value, 0)

console.log('total', total)


  return (
    <div className="App">
      <AppBar/>
      <AppCounter total = {total}/>
   
    <h1>Menu For Today</h1>
    
    <label>Food Name:</label>
<input type="text" onChange={(event)=>{
  setFoodName(event.target.value);
}}/>
<label>Days Since You Ate It:</label>
<input type="number" onChange={(event)=>{
  setDays(event.target.value);
}}/>
<label>Calories:</label>
<input type="number" onChange={(event)=>{
  setCalories(event.target.value);
}}/>
<button onClick={addToList}>Add To List</button>


<h1>Food List</h1>
{foodList.map((val, key)=>{
  return( <div key={key} className="food">
    <h1>{val.foodName}</h1> <h1>{val.daysSinceIAte}</h1> <h1>{val.calories}</h1>
    <input type="text" placeholder='New Food Name' onChange={(event)=>{
  setNewFoodName(event.target.value);
}}/>


    <button onClick={()=> updateFood(val._id)}>Update</button>
    <button onClick={()=> deleteFood(val._id)}>Delete</button>


    </div>
    );
})}



    </div>
  );
}

export default App;
