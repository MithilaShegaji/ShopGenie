const path = require('path');
const fs = require('fs');
const Product = require('../Models/ProductModel'); 

// Function to get paginated products from MongoDB
const displayProducts = async (req, res) => {
    const { page = 1 } = req.query; // Default to page 1 if not provided
    const PRODUCTS_PER_PAGE = 9;

    try {
        // Get the total number of products
        const totalProducts = await Product.countDocuments();

        // Calculate total pages
        const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);

        // Ensure page number is within valid range
        const currentPage = Math.max(1, Math.min(page, totalPages));

        // Fetch the paginated products from MongoDB
        const paginatedProducts = await Product.find()
            .skip((currentPage - 1) * PRODUCTS_PER_PAGE)
            .limit(PRODUCTS_PER_PAGE);

        // Render the resultPage.ejs view with all the necessary data
        res.render('resultPage', {
            products: paginatedProducts,
            currentPage: currentPage,  // Pass currentPage here
            totalPages: totalPages     // Pass totalPages here
        });
    } catch (err) {
        console.error('Error fetching products from database:', err);
        return res.status(500).send('Internal Server Error');
    }
};


module.exports = { displayProducts };
