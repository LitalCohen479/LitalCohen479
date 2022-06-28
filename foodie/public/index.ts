function uid(): string | false {
  try {
    return "id-" + Math.random().toString(16).slice(2);
  } catch (error) {
    console.error(error);
    return false;
  }
}



interface Item {
  id: string;
  name: string;
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
    image: "https://cdn.auth0.com/blog/whatabyte/burger-sm.png",
  },
  {
    id: "2",
    name: "Pizza",
    price: 75,
    description: "The Cheesy Pizza",
    image: "https://cdn.auth0.com/blog/whatabyte/pizza-sm.png",
  },
  {
    id: "3",
    name: "Tea",
    price: 25,
    description: "The Informative Tea",
    image: "https://cdn.auth0.com/blog/whatabyte/tea-sm.png",
  },
];

async function handleGetItems(ev:any) {
  ev.preventDefault()
  try {
    //@ts-ignore
    const { data } = await axios.get("/items/get-items");
    console.log("data", data);
    const { items, error } = data;
    console.log(data, items);
    if (error) throw new Error(error);
    renderProducts(items);
  } catch (error) {
    console.error(error);
  }
}

async function handleAddfood(ev: any) {
  console.log("trying to create a new item");
  try {
    ev.preventDefault();
    const name = ev.target.elements.name.value;
    let id = uid();
    let price = 56;
    let description = "Golda is good";
    let image = "stillanimage";
    console.log(name, "is the new item name");

    if (!name) throw new Error("Name is missing");
    //@ts-ignore
    const { data } = await axios.post("/items/add-item", {
      name,
      id,
      price,
      description,
      image,
    });
    console.log(data, "me2");
    let { items, error } = data;
    if (error) throw new Error(error);

    renderProducts(items);
  } catch (error) {
    console.error(error);
  }
}


async function handleDeleteItem(itemId: string) {
  try {
    if (!itemId) throw new Error("itemId is missing");
    //@ts-ignore
    const { data } = await axios.delete("/items/delete-item", {
      data: { itemId },
    });
    const { items, error } = data;
    if (error) throw new Error(error);
    renderProducts(items);
  } catch (error) {
    console.error(error);
  }
}




async function handleUpdateItem(ev: any) {
  try {
    const newName = ev.target.value;
    if (!newName) throw new Error("Name is missing");
    const id = ev.target.id;
    if (!id) throw new Error("Id is missing");

    //@ts-ignore
    const { data } = await axios.patch("/items/update-item", {
      id,
      newName,
    });

    const { items, error } = data;
    renderProducts(items);
    
    if (error) throw new Error(error);
   
  } catch (error) {
    console.error(error);
  }
}

function renderProducts(items: Array<Item>): void {
  try {
    console.log("hello render")
    let html = "";
    items.forEach((item) => {
      html += `<div class="productCard">
      <h1 class="item__name">${item.name}</h1>
      <h1 class="item__price">${item.price}</h1>
      <h1 class="item__description">${item.description}</h1><div class="edit__title">
      <input id='${item.id}' type='text' value='${item.name}' onblur='handleUpdateItem(event)'/>
      <button  class="btn__update__item" onclick='handleUpdateItem("${item.id}")'>Update Name</button>
       </div>
       <div class="edit__title">
      <input id='${item.id}' type='text' value='${item.price}' onblur='handleUpdateItem(event)'/>
      <button  class="btn__update__item" onclick='handleUpdateItem("${item.id}")'>Update Price</button>
       </div>
       <div class="edit__title">
      <input id='${item.id}' type='text' value='${item.description}' onblur='handleUpdateItem(event)'/>
      <button  class="btn__update__item" onclick='handleUpdateItem("${item.id}")'>Update Description</button>
       </div>
       <div class="edit__title">
       <input id='${item.id}' type='text' value='${item.image}' onblur='handleUpdateItem(event)'/>
       <button  class="btn__update__item" onclick='handleUpdateItem("${item.id}")'>Update Image</button>
        </div>
      <button  class="btn__delete__item" onclick='handleDeleteItem("${item.id}")'>Delete</button>
     <div  class="img__root"><img src=${item.image} alt="img"/></div>

      </div>`;
    });

    const root = document.querySelector("#root");
    if (!root) throw new Error("No root was captured from DOM");
    root.innerHTML = html;
  } catch (error) {
    console.error(error);
  }
}
