const productsArray = [
  {
    id: "price_1N9ACbCBLcwaI3b76n8C7wnP",
    title: "Coffee",
    price: 4.99,
  },
  {
    id: "price_1N9ADOCBLcwaI3b7qbaknQiK",
    title: "Sunglasses",
    price: 9.99,
  },
  {
    id: "price_1N9ADwCBLcwaI3b7Weww5aMS",
    title: "Camera",
    price: 39.99,
  },
];

function getProductData(id) {
  let productData = productsArray.find((product) => product.id === id);

  if (!productData) {
    console.log("Product data does not exist for ID: " + id);
    return undefined;
  }

  return productData;
}

export { productsArray, getProductData };
