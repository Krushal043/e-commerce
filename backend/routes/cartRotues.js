const express = require("express");
const {
  addToCart,
  updateCartItem,
  removeFromCart,
} = require("../controllers/cartController");

const router = express.Router();

router.post("/add", addToCart);
router.put("/update", updateCartItem);
router.delete("/remove", removeFromCart);

module.exports = router;
