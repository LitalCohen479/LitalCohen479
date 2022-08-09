import uid from "./helpers";

import userModel, { userValidation } from "../model/productModel";
import productModel from "../model/productModel"
import mongoose from "mongoose";

 interface Item {
  id: string;
  name: any;
  price: number;
  description: string;
  image: string;
}


let items: Array<Item> = [
   {
    id: "1",
    name: "Burger",
    price: 89,
    description: "The Tasty Burger",
    image: "https://cdn.auth0.com/blog/whatabyte/burger-sm.png"
  },
  {
    id: "2",
    name: "Pizza",
    price: 75,
    description: "The Cheesy Pizza",
    image: "https://cdn.auth0.com/blog/whatabyte/pizza-sm.png"
  },
   {
    id: "3",
    name: "Tea",
    price: 25,
    description: "The Informative Tea",
    image: "https://cdn.auth0.com/blog/whatabyte/tea-sm.png"
  }
];

export function getItem(req, res) {
  try {
    res.send({ items });
    console.log(items, 'items')
  } catch (error) {
    console.error(error);
    res.send({ error: error.message });
  }
}






export function addItem(req, res) {
  console.log("first2")
  try {
    const { name } = req.body;
    const {  price, description, image } = req.body;
    if (!name) throw new Error("Name of product is requires");
    
    const id = uid();
    if (!id) throw new Error("Id is missing");

    items.push({ name, id,  price, description, image });
    res.send({items})
    console.log("first")
  } catch (error) {
    console.error(error);
    res.send({ error: error.message });
  }

}
export function deleteItem(req, res){
  try {
    const {itemId} = req.body;
    if (!itemId) throw new Error("itemId is missing");
    items = items.filter(item=>item.id !== itemId);

    res.send({items});
  } catch (error) {
    console.error(error);
    res.send({ error: error.message });
  }
}


export function updateItem(req, res){
    try {
        const {id, newName} = req.body;
        if(!id) throw new Error('Id is missing');
        if(!newName) throw new Error('newName is missing');

        const index = items.findIndex(item=>item.id === id);

        if(index === -1) throw new Error (`Couldnt find product with id ${id} in products`)


        items[index].name = newName;

        res.send({items})

    } catch (error) {
        console.error(error);
        res.send({ error: error.message });
    }
}



export const addUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { error } = userValidation.validate({ email, password });
    if (error) throw error;
    const user = new userModel({ email, password });
    const userDB = await user.save();

    //check if email exists
    //  if dont exists add email and password
    console.log(userDB);
    //  const findUser = await userModel.findOne({email});
    if (userDB) {
      const cookie = userDB._id;
      console.log(cookie);
      res.cookie("user", cookie);
      res.send({ ok: true, user });
    }
  } catch (error) {
    res.send({ error });
  }
};

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const userDB = await userModel.findOne({ email, password });

    if (!userDB) throw new Error("User or password are inccorect");

    let count: number | undefined = userDB.count;
    if (!count) count = 0;
    count++;

  

    await userModel.updateOne({ email }, { count });
    console.log(count)
    res.send({count})

    //send cookie 
    
  } catch (error: any) {
    res.send({ error: error.message });
  }
}

export async function getCookie(req, res) {
  try {
    console.log(req.cookie);

    const { user } = req.cookie;
    console.log("user", user);

    const userDB = await userModel.findById({ user });
    console.log(userDB);

    res.send({ ok: true, userDB });
  } catch (error) {
    res.send({ error });
  }
}
export async function setHello1(req, res) {
  try {
    
    console.log(req.headers)

    // console.log(req.cookies);
    const { id } = req.cookies;
    console.log('id', id);

    if (id) {
      console.log(`Client with id ${id} returned`);
      //save some data on name2
    } else {
      res.cookie("id", Math.floor(Math.random() * 10000000));
      console.log("we have a new user");
    }

    res.send({ ok: true }); //Sets name = express
  } catch (error) {
    res.send({ error: error.message });
  }
}


export async function getMyProducts(req, res) {
  try {
    //get user id
console.log("getmyproducts")

    const { user } = req.cookies;

    if (!user) throw new Error("User is missing!!!!!");
    console.log('user', user);
    const userId  = user;
    
    const productsDB = await productModel.find({ ownerId: userId });
  console.log('userid', userId)
    res.send({ ok: true, products: productsDB });
  } catch (error) {
    res.send({ error: error.message });
  }
}


export async function addFoodCalorie(req, res){
  console.log('addFoodCalorie')
  const cart = new productModel({title:'ice cream!!!',
  price:19,
  ownerId:'222',
  count: 1,
  description: 'best ice cream in the world',
  image: 'https://cdn.auth0.com/blog/whatabyte/pizza-sm.png'});

  try {


    const { FoodName, FoodCalories } = req.body;

    if (!FoodName) throw new Error("FoodName is missing!!!!!");
    console.log('FoodName', FoodName);

    
    const newFoodDB = await new productModel({FoodName, FoodCalories});

    res.send({ ok: true, cart: newFoodDB });

    await cart.save()
    console.log("addFoodCalorie!")

console.log(cart)
  } catch (error) {
    console.log(error)
  }

}

export async function insertProducts(req, res){

  const foodName = req.body.foodName;
  const days = req.body.days;
const food = new productModel({foodName:foodName, daysSinceIAte:days});
try {
  await food.save();
  res.send("inserted data");
} catch (error) {
  console.log(error)
}
};
