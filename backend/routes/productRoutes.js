const express = require("express");
const router = express.Router();
const {
  getProducts,
  createProduct,
} = require("../controllers/productController");

// Fetch paginated list of products
router.get("/", getProducts);

// Fetch a single product by ID
router.get("/:id", getProductById);
// router.post("/", createProduct);

module.exports = router;
