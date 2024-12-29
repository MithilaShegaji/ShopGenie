const Product = require('../Models/ProductModel'); // Make sure to import your Product model

const displayProductsByCategory = async (req, res) => {
    const { categoryID, page = 1 } = req.query; // Read categoryID and page from the query string
    const PRODUCTS_PER_PAGE = 9;

    try {
        // Ensure categoryID is a valid number
        const parsedCategoryID = parseInt(categoryID);
        if (isNaN(parsedCategoryID)) {
            return res.status(400).json({ message: "Invalid category ID" }); // Bad request if categoryID is not valid
        }

        // Get the total number of products for this category
        const totalProducts = await Product.countDocuments({ categoryID: parsedCategoryID });

        // Calculate total pages
        const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);

        // Ensure page number is within valid range
        const currentPage = Math.max(1, Math.min(page, totalPages));

        // Fetch the paginated products from MongoDB for the given categoryID
        const paginatedProducts = await Product.find({ categoryID: parsedCategoryID })
            .skip((currentPage - 1) * PRODUCTS_PER_PAGE)
            .limit(PRODUCTS_PER_PAGE);

        // Render the resultPage.ejs view with all the necessary data
        res.render('resultPage', {
            products: paginatedProducts,
            currentPage: currentPage,  // Pass currentPage here
            totalPages: totalPages,    // Pass totalPages here
            categoryID: parsedCategoryID // Pass the categoryID if you want to use it in the view
        });
    } catch (err) {
        console.error('Error fetching products from database:', err);
        return res.status(500).send('Internal Server Error');
    }
};

module.exports = { displayProductsByCategory };
