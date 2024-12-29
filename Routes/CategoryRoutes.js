const express = require("express");
const router = express.Router();
// const Product = require('../Models/ProductModel'); // Import your Product model
const { displayProductsByCategory } = require('../Controllers/CategoryController');

router.get("/", displayProductsByCategory);

module.exports = router;
