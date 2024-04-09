const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const { Order } = require("./model");

//initialise express server
const app = express();
app.use(cors());
const mongo_uri = process.env.MONGOURI;
const port = process.env.PORT;

//connect to mongodb atlas
mongoose
  .connect(mongo_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log(err));

//define routes
app.get("/", (req, res) => {
  res.send("Hello welcome to my express server with mongo atlas");
});
app.listen(port, () => {
  console.log(`server running on ${port}`);
});

app.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find();
    // console.log(orders);
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).json({ messege: error.messege });
  }
});

app.get("/ordersid", async (req, res) => {
  const { orderID } = req.query;
  console.log(orderID);
  if (!orderID) {
    return res.json({
      messege: "Please provide the order ID",
      statuscode: 404,
    });
  }
  try {
    const order = await Order.find({ order_id: orderID });
    if (order.length === 0) {
      return res.json({ message: "Order not found", statuscode: 404 }); // Fixed typo in "messege"
    }

    return res.json(order);
  } catch (error) {
    return res.status(500).json({ message: error.message }); // Changed "messege" to "message"
  }
});
