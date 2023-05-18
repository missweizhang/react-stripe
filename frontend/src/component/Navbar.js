import { useContext, useState } from "react";
import { Button, Modal, Navbar } from "react-bootstrap";
import { CartContext } from "../CartContext";
import CartProduct from "./CartProduct";

const NavbarComponent = () => {
  const cart = useContext(CartContext);
  const [show, setShow] = useState(false);

  const productsCount = cart.items.reduce(
    (totalQuantity, cartItem) => totalQuantity + cartItem.quantity,
    0
  );

  const checkout = async () => {
    await fetch("http://localhost:4000/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items: cart.items }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        if (response.url) {
          // forwarding user to stripe payment link
          window.location.assign(response.url);
        }
      })
      .catch(console.error);
  };

  return (
    <>
      <Navbar expand="sm">
        <Navbar.Brand href="/">Ecommerce Store</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Button onClick={() => setShow(true)}>
            Cart ({productsCount} items)
          </Button>
        </Navbar.Collapse>
      </Navbar>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Shopping Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {productsCount > 0 ? (
            <>
              <p>Items in your cart:</p>
              {cart.items.map((cartItem) => (
                <CartProduct cartItem={cartItem} key={cartItem.id} />
              ))}

              <h1>Total: ${cart.getTotalCost().toFixed(2)}</h1>

              <Button variant="success" onClick={checkout}>
                Purchase items!
              </Button>
            </>
          ) : (
            <h1>There are no items in your cart!</h1>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default NavbarComponent;
