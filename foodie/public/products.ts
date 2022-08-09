


function handleLoadProducts(){
    try {
        console.log('handleLoadProducts')
        handleGetMyProducts()
    } catch (error) {
        console.error(error)
    }
}


async function handleGetMyProducts(){
    try {
        
        console.log('handleGetMyProducts')
       //@ts-ignore 
       const {data} = await axios.get('/products/get-my-products');
       console.log('data', data)
    } catch (error) {
        console.error(error)
    }
}




