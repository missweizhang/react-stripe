const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();
app.use(cors());
app.use(express.static("public"));
app.use(express.json());

const YOUR_DOMAIN = "http://localhost:3000";

app.post("/checkout", async (req, res) => {
  // req.body.items = [
  //   { id: 1, quantity: 3 },
  //   { id: 2, quantity: 1 },
  // ];
  // stripe wants
  // lineItems = [
  //   { price: 1, quantity: 3 },
  //   { price: 2, quantity: 1 },
  // ]

  console.log(req.body);
  const { items } = req.body;
  const lineItems = items.map((cartItem) => ({
    price: cartItem.id,
    quantity: cartItem.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: "payment",
    success_url: `${YOUR_DOMAIN}?success=true`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`,
  });

  res.send(
    JSON.stringify({
      url: session.url,
    })
  );
});

app.listen(4000, () => console.log("Listening on port 4000..."));
