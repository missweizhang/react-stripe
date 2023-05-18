import { useContext } from "react";
import { Button } from "react-bootstrap";
import { CartContext } from "../CartContext";
import { getProductData } from "../productsStore";

const CartProduct = ({ cartItem }) => {
  const cart = useContext(CartContext);
  const product = getProductData(cartItem.id);

  return (
    <>
      <h3>{product.title}</h3>
      <p>{cartItem.quantity} total</p>
      <p>$ {(cartItem.quantity * product.price).toFixed(2)}</p>
      <Button size="sm" onClick={() => cart.deleteFromCart(cartItem.id)}>
        Remove
      </Button>
      <hr></hr>
    </>
  );
};

export default CartProduct;
