const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  total: Number,
});

module.exports = mongoose.model("Order", OrderSchema);
