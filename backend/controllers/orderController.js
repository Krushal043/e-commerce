const Order = require("../models/orderModel");

exports.placeOrder = async (req, res) => {
  try {
    const { products, total } = req.body;
    const order = new Order({ products, total });
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
