import uid from "./helpers";



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
