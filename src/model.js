const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  order_id: {
    type: Number,
    required: true,
  },
  customer_name: {
    type: String,
    required: true,
  },
  order_date: {
    type: Date,
    required: true,
  },
  order_time: {
    type: String,
    required: true,
  },
  order_items: {
    type: String,
    required: true,
  },
  order_status: {
    type: String,
    required: true,
  },
  estimated_delivery: {
    type: Date,
    required: true,
  },
  payment_type: {
    type: String,
    required: true,
  },
  coins_used: {
    type: String,
    required: true,
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = {
  Order,
};
