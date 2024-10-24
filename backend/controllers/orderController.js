const Order = require("../models/orderModel");
const jwt = require("jsonwebtoken");

exports.placeOrder = async (req, res) => {
  try {
    const { user, products, total } = req.body.products;

    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ message: "No token, authorization denied." });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

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

    const order = new Order({ user, products, total, userId });
    await order.save();

    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
