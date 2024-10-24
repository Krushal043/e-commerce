const Order = require("../models/orderModel");

exports.placeOrder = async (req, res) => {
  try {
    const { user, products, total } = req.body;

    if (
      !user ||
      !user.name ||
      !user.email ||
      !user.address ||
      !products ||
      products.length === 0 ||
      !total
    ) {
      return res
        .status(400)
        .json({ message: "User details, products, and total are required." });
    }

    const order = new Order({ user, products, total });
    await order.save();

    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
