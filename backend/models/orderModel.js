const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    user: {
      name: String,
      email: String,
      address: String,
    },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    total: { type: Number, required: true },
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
