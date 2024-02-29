const stripe = require("stripe")(
  "sk_test_51OojlaSAmc47exDGmnU08bJnNU8L8QK2nbjalL8itMXhfnzeitULSMENRzkJZxZAQCVxL1YWhXJHNIKlfOaXID3300hT4XoLI2"
);

const express = require("express");
var cors = require("cors");
const app = express();
app.use(cors());
app.use(express.static("public"));
const YOUR_DOMAIN = "http://localhost:5173";

app.use(express.json());
app.listen(3000, () => console.log("Running on port 3000"));

app.post("/api/checkout", async (req, res) => {
  const items = req.body.items; // [{ id, quantity }]

  try {
    const lineItemsPromises = items.map(async (product) => {
      const prices = await stripe.prices.list({ product: product.id });
      return {
        price: prices.data[0].id, // Assuming you're fetching the first price associated with the product
        quantity: product.quantity,
      };
    });

    const lineItems = await Promise.all(lineItemsPromises);
    console.log(lineItems);
    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: "payment",
      success_url: `${YOUR_DOMAIN}/success`,
      cancel_url: `${YOUR_DOMAIN}/cancel`,
    });

    res.send(
      JSON.stringify({
        url: session.url,
      })
    );
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).send("Error creating checkout session");
  }
});
