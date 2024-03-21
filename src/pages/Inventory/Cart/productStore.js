const productsArray = [
    {id: 1, name: "Lightweight Steel Hammer With Rubber Grip", price: 750},
    {id: 1, name: "Lightweight Steel Hammer With Rubber Grip", price: 750},
    {id: 1, name: "Lightweight Steel Hammer With Rubber Grip", price: 750}
];

function getProductsData(id) {
    let productData = productsArray.find(product => product.id === id);
    if (productData === undefined) {
        return undefined;
    }

    return productData;
}

export default {productsArray, getProductsData};