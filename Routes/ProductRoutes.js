const express = require('express');
const router = express.Router();
const { displayProducts } = require('../Controllers/ProductController');

// Route to display paginated products
router.get('/resultPage', displayProducts);

module.exports = router;
